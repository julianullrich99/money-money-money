<script setup lang="ts">
import { IconBackspace, IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
import { useStore } from './stores/counter'

const store = useStore()
const currTime = ref(0)

const calculateMoneys = computed(() => {
  if (!store.running)
    return store.history?.at(-1) ?? 0
  const time = currTime.value - store.startTime
  return store.hourlyRate * (time / (60 * 60 * 1000))
})

setInterval(() => {
  currTime.value = (new Date()).getTime()
}, 100)

const timeString = computed({
  get: () => {
    const date = new Date(store.startTime)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  },
  set: (v) => {
    const input = v.split(':').map(e => +e)
    const date = new Date()
    date.setHours(input[0], input[1])
    store.startTime = date.getTime()
  },

})
</script>

<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center gap-4 flex-col">
    <div class="text-2xl">
      <span>Stundensatz:</span>
      <input v-model="store.hourlyRate" type="number" placeholder="Geld pro Stunde" class="text-end w-16">
      <span>€</span>
    </div>
    <div class="text-2xl">
      <span>Start:</span>
      <!-- <input type="text" class="ml-2 text-2xl text-start w-20" :value="getTimeStringFromTimeStamp" @change="setStartTime"> -->
      <input v-model.lazy="timeString" type="text" class="ml-2 text-2xl text-start w-20">
    </div>
    <div v-if="!store.running" class="select-none cursor-pointer items-center text-2xl h-10 flex" @click="store.start()">
      Start
      <IconPlayerPlayFilled class="h-full w-10" />
    </div>
    <div v-else class="select-none cursor-pointer items-center text-2xl h-10 flex" @click="store.stop()">
      Stop
      <IconPlayerStopFilled class="h-full w-10" />
    </div>
    <div class="text-6xl">
      Reichtum: {{ calculateMoneys.toFixed(2) }}€
    </div>
    <div
      class="relative h-64 text-2xl overflow-hidden after:absolute after:bg-gradient-to-t after:from-white after:to-transparent after:h-2/3 after:w-full after:bottom-0 w-36"
    >
      <ul class="w-full">
        <li v-for="(e, i) in [...store.history].reverse()" :key="i" class="w-full flex justify-between items-center">
          <span>

            {{ e.toFixed(2) }} €
          </span>
          <IconBackspace class="h-6 w-6 text-gray-400" @click="store.history.splice(store.history.length - i - 1, 1)" />
        </li>
      </ul>
    </div>
  </div>
</template>