<script setup lang="ts">
import { useCurrencyStore } from '../stores/currency';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch } from 'vue';
import Currency from '../components/Currency.vue';

const currentData = ref<any[]>([]);
const direction = ref<string>('none');
const store = useCurrencyStore();
const { data, usOnly, normal, ascSorted, descSorted, shuffled } = storeToRefs(store);

const sortAsc = () => {
  direction.value = 'asc';
  currentData.value = ascSorted.value;
}

const sortDesc = () => {
  direction.value = 'desc';
  currentData.value = descSorted.value;
}

const doShuffle = () => {
  direction.value = 'shuffle';
  currentData.value = shuffled.value;
}

onBeforeMount(() => {
  store.getInfo();
})

watch(
    () => data.value,
    (newValue) => {
      currentData.value = newValue;
    });

watch(
    () => usOnly.value,
    (_) => {
      switch(direction.value) {
        case 'none':
          currentData.value = normal.value;
          break;
        case 'asc':
          sortAsc();
          break;
        case 'desc':
          sortDesc();
          break;
        case 'shuffle':
          doShuffle();
          break;
        default:
          console.log(`something wrong with the direction: ${direction.value}`);
      }
    }
)
</script>

<template>
  <div class="text-gray-800 dark:text-white">
    <div class="flex items-center justify-center">
      <button class="button" @click="sortAsc">
        Sort Ascending
      </button>
      <button class="button" @click="sortDesc">
        Sort Descending
      </button>
      <button class="button" @click="doShuffle">
        Shuffle
      </button>
      <input
          id="usonly"
          type="checkbox"
          class="checkbox"
          :checked="usOnly"
          @click="usOnly = !usOnly" />
      <label for="usonly">US Only</label>
    </div>

    <div class="grid grid-cols-3 gap-1">
      <div
          v-for="item in currentData"
          :key="item.id"
          class="flex flex-col items-start justify-center m-4"
      >
        <Currency :icon="item.icon" :name="item.name" :code="item.code" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply font-bold py-2 px-4 m-4 rounded-md text-white bg-gray-600;
}
.checkbox {
  @apply h-4 w-4 border-2 border-gray-300 rounded
}
</style>
