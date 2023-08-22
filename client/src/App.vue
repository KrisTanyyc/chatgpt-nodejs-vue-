<template>
  <div id="app">
    <div class="mt-3">
      <router-link class="mx-2 text-dark" to="/">Chat</router-link>
      <router-link class="mx-2 text-dark" to="/questions">Question</router-link>
      <router-link class="mx-2 text-dark" to="/unsolvequestions">Unsolve Question</router-link>
      <router-link class="mx-2 text-dark" to="/informations">Information</router-link>
    </div>
    <router-view />
  </div>
</template>

