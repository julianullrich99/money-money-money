import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('data', () => {
  const running = ref(false)
  const startTime = ref(new Date().getTime())
  const hourlyRate = ref(75)
  const recentRates = ref<number[]>([])
  const history = ref<{ rate: number; duration: number; amount: number }[]>([])

  // eslint-disable-next-line no-prototype-builtins
  if (history.value.length > 0 && !history.value[0].hasOwnProperty('rate'))
    history.value.splice(0)

  watch(hourlyRate, (curr, old) => {
    if (curr !== old && !recentRates.value.includes(curr))
      recentRates.value.push(curr)
  })

  function start() {
    startTime.value = new Date().getTime()
    running.value = true
  }

  function stop() {
    running.value = false

    const time = (new Date()).getTime() - startTime.value
    history.value.push({
      amount: hourlyRate.value * (time / (60 * 60 * 1000)),
      duration: time,
      rate: hourlyRate.value,
    })
  }

  return { running, startTime, hourlyRate, start, stop, history, recentRates }
}, {
  persist: true,
})
