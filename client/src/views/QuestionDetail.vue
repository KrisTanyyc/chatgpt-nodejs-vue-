<template>
  <section>
    <button type="button" class="btn btn-primary" @click="openModal('@mdo')">
      Open modal for @mdo
    </button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
            <button
            @click="closeModal()"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >Recipient:</label
                >
                <input type="text" class="form-control" id="recipient-name" />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >Message:</label
                >
                <textarea class="form-control" id="message-text"></textarea>
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
            <button type="button" class="btn btn-primary">Send message</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import * as bootstrap from "bootstrap";
const props = defineProps({
  questionId: {
    type: Number,
    required: true,
  },
});

const question = ref("");

const getContent = async () => {
  var url = "http://localhost:8000/getQuestion/" + props.questionId,
    method = "get";
  const { response } = await fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));

  question.value = response;
  console.log(question.value);
};

const openModal = (recipient) => {
  const modalElement = document.getElementById('exampleModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Set the recipient name in the modal
      const recipientInput = modalElement.querySelector('#recipient-name');
      recipientInput.value = recipient;
};

const closeModal = () => {
  const modalElement = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}


onMounted(() => {
  getContent();
});
</script>