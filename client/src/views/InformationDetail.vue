<template>
  <section>
    <div
      class="d-flex justify-content-center mx-5"
    >
      <label
        for="message"
        class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
        >Information</label
      >
      <textarea
        id="message"
        rows="10"
        cols="100"
        class="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
        :disabled="disabled"
        v-model="information"
      ></textarea>
      <div class="mt-5 ml-auto">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="editEnable()">Edit</button>  
        <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-5"
        :disabled="disabled"
        @click="updateInformation()"
      >
        Submit
      </button>
      </div>
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