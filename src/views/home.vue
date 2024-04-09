<template>
  <div class="home">
    <h1>Hixtrip FE Online Quiz</h1>
    <h2>Users:</h2>
    <p class="read-the-docs" id="user">
    </p>
    <h2>Orgs:</h2>
    <p class="read-the-docs" id="org">
    </p>
  </div>
</template>

<script setup lang="ts">
import orgApi from '../api/org'
import userApi from '../api/user'
userApi.query({}).then((users) => {
  document.getElementById('user')!.innerHTML = JSON.stringify(users)
})

orgApi.query('1').then((users) => {
  document.getElementById('org')!.innerHTML = JSON.stringify(users)
})
</script>
<style scoped>
.home {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>