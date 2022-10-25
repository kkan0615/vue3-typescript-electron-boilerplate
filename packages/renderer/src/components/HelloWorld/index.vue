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
        <button
          @click="onClickHelloBtn"
        >
          Hello world logging
        </button>
      </div>
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
<script
  lang="ts"
>
export default {
  name: 'HelloWorld'
}
</script>
<script setup lang="ts">
import packageJson from '../../../../../package.json'
import { ref } from 'vue'
import { useIpcRenderer } from '@vueuse/electron'
import { useElectron } from '@/utils/useElectron'

const version = packageJson.version

/* is update available */
const isUpdateAvailable = ref(false)
/* checking updating... */
const isUpdateLoading = ref(false)

const electron = useElectron()

/**
 * Events update is available
 */
electron.on('update-available', () => {
  isUpdateAvailable.value = true
})

electron.on('update-not-available', () => {
  isUpdateAvailable.value = false
})

const onClickCheckUpdateBtn = async () => {
  isUpdateLoading.value = true
  await electron.invoke('check-update')
  isUpdateLoading.value = false
}

const onClickUpdateBtn = () => {
  electron.send('update-program')
}

const onClickHelloBtn = () => {
  electron.send('hello-world')
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
