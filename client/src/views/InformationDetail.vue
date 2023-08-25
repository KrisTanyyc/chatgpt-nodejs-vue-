<template>
  <section>
    <div
      class="d-flex justify-content-center"
      style="width: 100%; height: 400px"
    >
      <textarea
        rows="5"
        cols="100"
        :disabled="disabled"
        v-model="information"
      ></textarea>
    </div>
    <div class="d-flex justify-content-end me-5 pt-3">
      <button class="btn btn-primary" @click="editEnable()">Edit</button>
      <button
        class="btn btn-primary ms-3"
        :disabled="disabled"
        @click="updateInformation()"
      >
        Submit
      </button>
    </div>
  </section>
</template>
  
  <script setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  informationId: {
    type: Number,
    required: true,
  },
});

const disabled = ref(true);
const information = ref("");

const getContent = async () => {
  var url = "http://localhost:8000/information/" + props.informationId,
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

  information.value = response[0].content;
  console.log(information.value);
};

const updateInformation = async () => {
  var url = "http://localhost:8000/updateInformation/" + props.informationId,
    method = "post";
  const postData = {
    content: information.value,
  };
  const { status } = await fetch(url, {
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

  if (status == "success") {
    window.location.href = "/informations";
  }
};

const editEnable = () => {
  disabled.value = !disabled.value;
};

onMounted(() => {
  getContent();
});
</script>