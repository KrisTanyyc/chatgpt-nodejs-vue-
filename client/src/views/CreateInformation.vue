<template>
  <div class="bg-image mt-3" style="background-color: #f5f7fa; height: 100%">
    <div class="d-flex justify-content-center">
      <textarea v-model="info" class="mt-3 mb-3" rows="5" cols="40"></textarea>
    </div>
    <div class="d-flex justify-content-center">
      <button
        :disabled="disabled"
        @click="createInformation()"
        class="mb-3 btn btn-primary"
        style="margin-left: 20%"
      >
        Submit
      </button>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const info = ref("");
const disabled = ref(false);
const route = useRoute();
const jobid = route.query.jobid;
let postData;

const createInformation = async () => {
  disabled.value = true;
  console.log(!jobid);
  var url = "http://localhost:8000/createInformations",
    method = "post";

  if (!jobid) {
    postData = {
      content: info.value,
      questionId: 22,
    };
  } else {
    postData = {
      content: info.value,
      questionId: jobid,
    };
  }

  console.log(postData);
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
</script>
  