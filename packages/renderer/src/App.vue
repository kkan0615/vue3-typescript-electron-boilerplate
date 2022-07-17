<template>
  <div>
    {{ packageJson.version }}
    <h1>
      {{ msg }}
    </h1>
    <button
      v-if="updateAvailable"
      @click="onClickUpdateBtn"
    >
      update
    </button>
    <test />
  </div>
</template>
<script setup lang="ts">
import packageJson from '../../../package.json'
import Test from '@/components/Test.vue'
import { ipcRenderer } from '@/utils/electron'
import { ref } from 'vue'

const msg = ref('Test msg will be here')
const updateAvailable = ref(false)

ipcRenderer.on('test-msg', (event, args: string) => {
  msg.value = args
})

ipcRenderer.on('update-available', () => {
  updateAvailable.value = true
})

const onClickUpdateBtn = () => {
  ipcRenderer.send('update-program')
}
</script>
<style>

</style>
