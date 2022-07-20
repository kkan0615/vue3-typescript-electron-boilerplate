<template>
  <div>
    <hello-world />
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
import { onMounted, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

const updateAvailable = ref(false)


ipcRenderer.on('update-available', () => {
  updateAvailable.value = true
})

onMounted(async () => {
  const isUpdateAvailable = await ipcRenderer.invoke('check-update')

  console.log(isUpdateAvailable)
})

const onClickUpdateBtn = () => {
  ipcRenderer.send('update-program')
}
</script>

