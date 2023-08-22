<template>
  <section>
    Question {{ props.questionId }}
  </section>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

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



onMounted(() => {
  getContent();
});
</script>