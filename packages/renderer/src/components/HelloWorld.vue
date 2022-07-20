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
      <!-- Checking loading for update -->
      <div
        v-if="isUpdateLoading"
      >
        Update loading...
      </div>
      <div
        v-else
      >
        <div>
          Version: {{ version }}
          <button
            @click="onClickCheckUpdateBtn"
          >
            check update
          </button>
        </div>
        <div
          v-if="isUpdateAvailable"
        >
          update is ready
          <button
            @click="onClickUpdateBtn"
          >
            update
          </button>
        </div>
        <div
          v-else
        >
          It's latest version
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import packageJson from '../../../../package.json'
import { ipcRenderer } from '@/utils/electron'
import { onBeforeMount, ref } from 'vue'

const version = packageJson.version

/* is update available */
const isUpdateAvailable = ref(false)
/* checking updating... */
const isUpdateLoading = ref(false)

/**
 * Events update is available
 */
ipcRenderer.on('update-available', () => {
  isUpdateAvailable.value = true
})

ipcRenderer.on('update-not-available', () => {
  isUpdateAvailable.value = false
})

onBeforeMount(async () => {
  isUpdateAvailable.value = await ipcRenderer.invoke('check-update')

})

const onClickCheckUpdateBtn = async () => {
  isUpdateLoading.value = true
  isUpdateAvailable.value = await ipcRenderer.invoke('check-update')
  isUpdateLoading.value = false
}

const onClickUpdateBtn = () => {
  ipcRenderer.send('update-program')
}
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
