<template>
    <section>
      Information {{ props.informationId }}
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
  
    information.value = response;
    console.log(information.value);
  };
  
  
  
  onMounted(() => {
    getContent();
  });
  </script>