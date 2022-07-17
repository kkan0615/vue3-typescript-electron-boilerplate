<template>
  <div>
    {{ updateAvailable }}
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
import Test from '@/components/Test.vue'
import { ipcRenderer } from '@/utils/electron'
import { ref } from 'vue'

const updateAvailable = ref(false)

ipcRenderer.on('update-available', () => {
  updateAvailable.value = true
})

const onClickUpdateBtn = () => {
  ipcRenderer.send('update-program')
}
</script>
<style>

</style>
