import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', () => {
  const data = ref<any[]>([]);
  const usOnly = ref<boolean>(false);

  const filtered = (current: any[]) => {
    if (usOnly.value) {
      return current.filter((a) => a.isSupportedInUS);
    } else {
      return [...current];
    }
  }

  const normal = computed(() => {
    return filtered(data.value);
  })

  const ascSorted = computed(() => {
    return filtered(data.value.sort((a, b) => a.name.localeCompare(b.name)));
  });

  const descSorted = computed(() => {
    return filtered(data.value.sort((a, b) => b.name.localeCompare(a.name)));
  })

  function shuffleArray(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const shuffled = computed(() => {
    return filtered(shuffleArray(data.value));
  })

  const getInfo = () => {
    axios.get('https://api.moonpay.com/v3/currencies')
      .then((response) => {
        data.value = response.data;
      })
  }

  return { data, usOnly, normal, ascSorted, descSorted, shuffled, getInfo }
})
