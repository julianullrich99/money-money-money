import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('data', () => {
  const running = ref(false)
  const startTime = ref(new Date().getTime())
  const hourlyRate = ref(75)
  const history = ref<number[]>([])

  function start() {
    startTime.value = new Date().getTime()
    running.value = true
  }

  function stop() {
    running.value = false

    const time = (new Date()).getTime() - startTime.value
    history.value.push(hourlyRate.value * (time / (60 * 60 * 1000)))
  }

  return { running, startTime, hourlyRate, start, stop, history }
}, {
  persist: true,
})
