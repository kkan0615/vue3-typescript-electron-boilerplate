<template>
  <div>
    <hellow-world />
    <button
      v-if="updateAvailable"
      @click="onClickUpdateBtn"
    >
      update
    </button>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from '@/utils/electron'
import { ref } from 'vue'
import HellowWorld from '@/components/HellowWorld.vue'

const version = process.env.npm_package_version

const updateAvailable = ref(false)


ipcRenderer.on('update-available', () => {
  updateAvailable.value = true
})

const onClickUpdateBtn = () => {
  ipcRenderer.send('update-program')
}
</script>

