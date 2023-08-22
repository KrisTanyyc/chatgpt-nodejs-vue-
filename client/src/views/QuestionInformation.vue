<template>
    <section class="intro pt-3">
      <div class="bg-image h-100" style="background-color: #f5f7fa">
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="card">
                  <div class="card-body p-0">
                    <div
                      class="table-responsive table-scroll"
                      data-mdb-perfect-scrollbar="true"
                      style="position: relative; height: 500px"
                    >
                      <table class="table table-striped mb-0">
                        <thead style="background-color: #002d72">
                          <tr>
                            <th scope="col">Information</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="information in informations" :key="information.id">
                            <td>{{ information.content }}</td>
                            <td>
                              <a :href="'/information/' + information.id" class="btn btn-primary">View</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const informations = ref("");

const getInformation = async () => {
  var url = "http://localhost:8000/question/" + props.questionId + "/informations",
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