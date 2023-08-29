<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-2">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3 text-black">Questions</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="question in questions"
          :key="question.id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ question.content }}
          </th>
          <td class="px-6 py-4 text-right">
            <a
              :href="'/unsolvequestion/' + question.id"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline px-3"
              >View</a
            >
            <a :href="'/unsolvequestion/' + question.id + '/informations' ">
              Solution
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";

const questions = ref("");

const getQuestion = async () => {
  var url = "http://localhost:8000/listUnsolveQuestions",
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

  questions.value = response;
  console.log(questions.value);
};

onMounted(() => {
  getQuestion();
});
</script>
  
  <style>
.intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

thead th {
  color: #fff;
}

.card {
  border-radius: 0.5rem;
}

.table-scroll {
  border-radius: 0.5rem;
}

.table-scroll table thead th {
  font-size: 1.25rem;
}
thead {
  top: 0;
  position: sticky;
}
</style>
  
  