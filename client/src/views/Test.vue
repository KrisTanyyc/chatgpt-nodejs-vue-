<template>
  <div id="datatable"></div>
</template>




<script setup>
import { ref, onBeforeMount } from "vue";
import { Datatable, initTE } from "tw-elements";

const questions = ref("");

// const columns = [
//   { label: "Question", field: "question" },
//   { label: "Action", field: "action" },
// ];

const getQuestion = async () => {
  // const asyncTable = new Datatable(document.getElementById("datatable"), {
  //   columns,
  // });

  var url = "http://localhost:8000/listQuestions",
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

    console.log(response);
  
    // asyncTable.update({
    //   rows: response.map((user) => ({
    //     question: user.content,
    //     action: 123
    // }))
    // })
    
  questions.value = response;
  console.log(questions.value);
};

// onMounted(async () => {

// });

onBeforeMount(() => {
  initTE({ Datatable });
  getQuestion();
});
</script>
