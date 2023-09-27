<template>
  <body class="flex h-screen flex-col">
    <div class="flex flex-col bg-gray-100 mx-60" style="height: 90%">
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 py-4">
        <h1 class="text-center text-2xl font-bold text-white">Live Chat</h1>
        <h2 class="text-right text-xl font-bold text-white mr-3">
          Balance: {{ (5 - oldUsage).toFixed(2) }}
        </h2>
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
            <p>{{ message.cost }}</p>
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
      <div
        class="ml-5 flex items-center self-start rounded-xl rounded-tl bg-gray-300 py-2 px-3"
        v-if="loadingType"
      >
        <p>Typing............</p>
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
        <button
          class="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          @click="getBalance()"
        >
          Test
        </button>
      </div>
    </div>
    <div
      id="defaultModal"
      data-modal-target="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-100"
      :class="classOfModal"
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
              v-model="info"
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
              <div role="status" v-if="loading">
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <p v-else>Submit</p>
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
import { ref, onBeforeMount } from "vue";
export default {
  name: "ChatPage",
  setup() {
    const messages = ref([]);
    const messageContent = ref("");
    const currentQuestion = ref("");
    const info = ref("");
    const loading = ref(false);
    const currentUnsolveQuestionId = ref("");
    const classOfModal = ref("hidden");
    const loadingType = ref(false);
    const balance = ref(0);
    const oldUsage = ref(0);
    var sessionKey = "";
    var bearerToken =
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJjaGlueWVlLnRhbkB5eWNhZHZpc29ycy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGM3MWMzOWRjYzVmYzRlYjk2NzY2ODgiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjk0NjYwMTgzLCJleHAiOjE2OTU4Njk3ODMsImF6cCI6IkRSaXZzbm0yTXU0MlQzS09wcWR0d0IzTll2aUhZendEIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.QqcY0SgS3Yb_FgXQY83PMAM7wjA-qYsjfdkZwcYTtQmMv1KTBMUBuWbfH13n_Ua3hgTEd09eRw0Xwx-6mRZbopEpq0siWsQTasQHkXV0oFattGs70oIvKpCs5Qq_myS9O4N8b_sJ7L53ADwpi00f23ZT6tJHf2Dcd6COfQxa9x7zAgEV_P7MZEBROhxjy5bX-92WkPqqdwCZWlnOZNgGWuediGLpJ4Ksv7u-9N7aEqjYKtEbmz_rTXzT_Rr4V1riO8Wu95kDQ3f0ubbaO-mP4fVM1PMPsIGr2r5yLWe5HpaeYtLT32jEgZuus2xrFEsI8Mrckeyfx1QqDIybDVhPMA";
    const sendMessage = () => {
      if (messageContent.value == "") return;
      createMessage("user", messageContent.value);
      currentQuestion.value = messageContent.value;
      getResponse(messageContent.value);
      messageContent.value = "";
      loadingType.value = true;
    };

    const openModal = async () => {
      classOfModal.value = "block";
      const currentId = await createUnsolveQuestion();
      console.log(currentId);
    };

    const closeModal = () => {
      classOfModal.value = "hidden";
    };

    const createMessage = async (role, message, cost) => {
      await pushIntoArray(role, message, cost);

      scrollPage();
    };

    const pushIntoArray = async (role, message, cost) => {
      messages.value.push({
        role: role,
        content: message,
        cost: cost,
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
          loadingType.value = false;
          return response.json();
        })
        .then((response) => {
          return response;
        });

      var newUsage = await getBalance();
      console.log("newUsage", newUsage);
      console.log("oldUsage", oldUsage.value);
      var cost = newUsage - oldUsage.value;
      await createMessage("assistant", response, cost);
      await createQuestion();
      scrollPage();
      oldUsage.value = newUsage;
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
      loading.value = true;
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

      setTimeout(() => {
        loading.value = false;
        info.value = "";
        closeModal();
      }, 3000);
    };

    const getBalance = async () => {
      var url =
        "https://api.openai.com/dashboard/billing/usage?start_date=2023-07-31&end_date=2023-09-09";
      var method = "get";
      var bearerSession = "Bearer " + sessionKey;
      const { total_usage } = await fetch(url, {
        method: method,
        headers: {
          "content-type": "application/json",
          authorization: bearerSession,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // oldUsage.value = response.total_usage / 100;
          // return oldUsage.value;
          return response;
        });

      return total_usage / 100;
    };

    const getSessionKey = async () => {
      var url = "https://api.openai.com/dashboard/onboarding/login";
      var method = "post";
      await fetch(url, {
        method: method,
        headers: {
          "content-type": "application/json",
          authorization: bearerToken,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          sessionKey = response.user.session.sensitive_id;
        });

      oldUsage.value = await getBalance();
      console.log(sessionKey);
      console.log(oldUsage.value);
    };

    onBeforeMount(() => {
      getSessionKey();
    });

    return {
      messages,
      sendMessage,
      createInformation,
      openModal,
      closeModal,
      getBalance,
      getSessionKey,
      classOfModal,
      messageContent,
      loadingType,
      info,
      loading,
      balance,
      oldUsage,
    };
  },
};
</script>
  
  