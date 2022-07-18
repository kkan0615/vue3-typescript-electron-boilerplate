<template>
  <div
    class="hello-world-container"
  >
    <div
      style="text-align: center;"
    >
      <div>
        <img
          src="@/assets/logo.png"
          alt="logo"
        >
      </div>
      <h1>
        Vue3 + Vite3.0 + Typescript + Electron
      </h1>
      <div>
        Version: {{ version }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const version = process.env.npm_package_version

</script>
<style lang="scss">
// @TODO: Change to tailwind
.hello-world-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
