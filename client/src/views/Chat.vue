<template>
  <section id="chatBody" style="background-color: white">
    <div class="container py-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" id="chat1" style="border-radius: 15px">
            <div
              class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style="
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
              "
            >
              <i class="fas fa-angle-left"></i>
              <p class="mb-0 fw-bold">Live chat</p>
              <i class="fas fa-times"></i>
            </div>
            <div
              class="card-body"
              v-for="message in messages"
              :key="message.id"
            >
              <div
                class="d-flex flex-row justify-content-start mb-4"
                v-if="message.role === 'assistant'"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style="width: 45px; height: 100%"
                />
                <div
                  class="p-3 ms-3"
                  style="
                    border-radius: 15px;
                    background-color: rgba(57, 192, 237, 0.2);
                  "
                >
                  <p class="small mb-0">{{ message.content }}</p>
                </div>
              </div>

              <div
                class="d-flex flex-row justify-content-start mb-4"
                v-if="message.role === 'assistant'"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style="width: 45px; height: 100%"
                />
                <div
                  class="p-3 ms-3"
                  style="
                    border-radius: 15px;
                    background-color: rgba(57, 192, 237, 0.2);
                  "
                >
                  <p class="small mb-0">
                    Are you satisfied with this answer?
                    <span><button>✔</button></span>
                    <span
                      ><button @click="openModal()" class="text-danger">
                        ✖
                      </button></span
                    >
                  </p>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-end mb-4" v-else>
                <div
                  class="p-3 me-3 border"
                  style="border-radius: 15px; background-color: #fbfbfb"
                >
                  <p class="small mb-0">{{ message.content }}</p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style="width: 45px; height: 100%"
                />
              </div>
            </div>
            <div class="form-outline p-3">
              <input
                v-model="messageContent"
                class="bg-white mt-3 border border-dark text-dark"
              />
              <button
                @click="sendMessage()"
                type="button"
                class="mt-2 btn btn-info btn-rounded float-end"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
            <button
              @click="closeModal()"
              type="button"
              class="close"
              data-dismiss="modal"
            >
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >Message:</label
                >
                <textarea
                  v-model="info"
                  rows="5"
                  class="form-control"
                  id="message-text"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="closeModal()"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="createInformation()"
              type="button"
              class="btn btn-primary"
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
import { ref } from "vue";
import * as bootstrap from "bootstrap";
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
      const chatBodyElement = document.getElementById("app");
      if (chatBodyElement) {
        window.scroll(0, 10000000000);
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

    const openModal = async () => {
      const modalElement = document.getElementById("exampleModal");
      const modal = new bootstrap.Modal(modalElement);
      const currentId = await createUnsolveQuestion();
      console.log(currentId);
      modal.show();
    };

    const closeModal = () => {
      const modalElement = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      info.value = '';
      modal.hide();
    };

    const createInformation = async () => {
      var url = "http://localhost:8000/createInformations",
        method = "post";
        const postData = {
        content: info.value,
        questionId: currentUnsolveQuestionId.value
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
      info.value = '';
      closeModal();
    };

    return {
      messages,
      sendMessage,
      messageContent,
      loading,
      openModal,
      closeModal,
      createInformation,
      info,
    };
  },
};
</script>
  
  