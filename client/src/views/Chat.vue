<template>
  <body>
    <div class="flex h-screen flex-col bg-gray-100 mx-5">
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 py-4">
        <h1 class="text-center text-2xl font-bold text-white">
          Live Chat
        </h1>
      </div>
      <div class="flex-grow overflow-y-auto" id="chat-app">
        <div
          class="flex flex-col space-y-2 p-4"
          v-for="message in messages"
          :key="message.id"
        >
          <!-- Individual chat message -->
          <div
            class="flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3"
            v-if="message.role === 'assistant'"
          >
            <p>{{ message.content }}</p>
          </div>
          <div
            class="flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3"
            v-if="message.role === 'assistant'"
          >
            <p>Are you satisfied with this answer?</p>
            <span><button>✔</button></span>
            <span
              ><button
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                class="btn text-red-600"
                type="button"
                @click="openModal"
              >
                ✖
              </button></span
            >
          </div>
          <div
            class="flex items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white"
            v-else
          >
            <p>{{ message.content }}</p>
          </div>
        </div>
      </div>
      <div class="flex items-center p-4">
        <input
          type="text"
          placeholder="Type your message..."
          class="w-full rounded-lg border border-gray-300 px-4 py-2"
          v-model="messageContent"
        />
        <button
          class="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          @click="sendMessage()"
        >
          Send
        </button>
      </div>
    </div>
    <div
      id="defaultModal"
      data-modal-target="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Information
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              @click="closeModal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <textarea
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              rows="5"
              cols="70"
            ></textarea>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              data-modal-hide="defaultModal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="createInformation"
              >
              Submit
            </button>
            <button
              @click="closeModal"
              data-modal-hide="defaultModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>


<script>
import { ref } from "vue";
import { Modal } from "flowbite";
export default {
  name: "ChatPage",
  setup() {
    const messages = ref([]);
    const messageContent = ref("");
    const loading = ref(false);
    const currentQuestion = ref("");
    const info = ref("");
    const currentUnsolveQuestionId = ref("");


    const sendMessage = () => {
      if (messageContent.value == "") return;
      createMessage("user", messageContent.value);
      currentQuestion.value = messageContent.value;
      getResponse(messageContent.value);
      messageContent.value = "";
      loading.value = true;
    };

    const options = {
      backdrop: 'static',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          console.log('modal is hidden');
          options.backdropClasses = ''
      },
      onShow: () => {
          console.log('modal is shown');
      },
      onToggle: () => {
          console.log('modal has been toggled');
      }
    }

    const openModal = async () => {
      const $targetEl = document.getElementById('defaultModal');
      const modal = new Modal($targetEl, options);
      const currentId = await createUnsolveQuestion();
      console.log(currentId);
      modal.show()
    };

    const closeModal = () => {
      const $targetEl = document.getElementById('defaultModal');
      const backdropElement = document.querySelector('.bg-gray-900');
      backdropElement.classList.remove('fixed');
      const modal = new Modal($targetEl, options);
      modal.hide()
    };

    const createMessage = async (role, message) => {
      await pushIntoArray(role, message);

      scrollPage();
    };

    const pushIntoArray = async (role, message) => {
      messages.value.push({
        role: role,
        content: message,
      });
    };

    const scrollPage = () => {
      const chatBodyElement = document.getElementById("chat-app");
      if (chatBodyElement) {
        const scrollHeight = chatBodyElement.scrollHeight;
        chatBodyElement.scrollTo(0, scrollHeight);
      }
    };

    async function getResponse(messages) {
      var url = "http://localhost:8000/v1/chatgpt",
        method = "post";
      const postData = {
        messages: messages,
      };
      const { response } = await fetch(url, {
        method: method,
        body: JSON.stringify(postData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          loading.value = false;
          return response.json();
        })
        .then((response) => {
          return response;
        });

      await createMessage("assistant", response);
      await createQuestion();
      scrollPage();
    }

    const createQuestion = async () => {
      var url = "http://localhost:8000/createQuestion",
        method = "post";
      const postData = {
        content: currentQuestion.value,
      };

      const { response } = await fetch(url, {
        method: method,
        body: JSON.stringify(postData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        });

      console.log(response);
    };

    const createUnsolveQuestion = async () => {
      var url = "http://localhost:8000/createUnsolveQuestion",
        method = "post";
      const postData = {
        content: currentQuestion.value,
      };

      const { response } = await fetch(url, {
        method: method,
        body: JSON.stringify(postData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        });

      currentUnsolveQuestionId.value = response.id;
      return response;
    };

    const createInformation = async () => {
      var url = "http://localhost:8000/createInformations",
        method = "post";
      const postData = {
        content: info.value,
        questionId: currentUnsolveQuestionId.value,
      };
      const { response } = await fetch(url, {
        method: method,
        body: JSON.stringify(postData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        });
      console.log(response);
      info.value = "";
      closeModal();
    };

    

    
    return {
      messages,
      sendMessage,
      createInformation,
      openModal,
      closeModal,
      messageContent,
      loading,
      info,
    };
  },
};
</script>
  
  