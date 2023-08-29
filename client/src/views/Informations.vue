<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-2">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3 text-black">Informations</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="information in informations" :key="information.id">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
        {{ information.content }}
          </th>
          <td class="px-6 py-4 text-right">
            <a
              :href="'/information/' + information.id"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</a
            >
            <button class="btn text-red-600 ms-3" @click="deleteInformation(information.id)">Delete</button>
          </td>
        </tr>        
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const informations = ref("");

const getInformation = async () => {
  var url = "http://localhost:8000/listInformations",
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

  informations.value = response;
  console.log(informations.value);
};

const deleteInformation = async (id) => {
  var url = 'http://localhost:8000/deleteInformation/' + id, method = 'delete';
  const { status } = await fetch(url, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  }).then((response) => {
    return response;
  }).catch((err) => console.log(err));

  if (status === "success") {
    window.location.reload();
  }
}

onMounted(() => {
  getInformation();
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