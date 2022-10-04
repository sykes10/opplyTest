<script setup lang="ts">
import { useOpplyAPI } from '@/composables/useOpplyAPI';
import type { Quote } from '@/types/entities';
import { onMounted, ref } from 'vue';
const { getQuotes } = useOpplyAPI();
const quotes = ref<Quote[]>([]);

onMounted(async () => {
  const { data } = await getQuotes();
  quotes.value = data.value?.results || [];
});
</script>

<template>
  <h2 class="text-4xl font-bold text-center my-10">List of Quotes</h2>
  <section class="max-w-3xl mx-auto">
    <table class="w-full text-sm text-left border">
      <thead class="text-xs uppercase bg-purple-700 text-white">
        <tr>
          <th class="py-3 px-6">Quote</th>
          <th class="py-3 px-6">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="quote in quotes"
          :key="quote.id"
          class="bg-white border-b text-gray-700"
        >
          <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {{ quote.title }}
          </td>
          <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {{ quote.amount }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
