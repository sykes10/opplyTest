<script setup lang="ts">
import { useOpplyAPI } from '@/composables/useOpplyAPI';
import { parseSuppliers } from '@/lib/supplier';
import type { Supplier } from '@/types/entities';
import { onMounted, ref } from 'vue';
const { getSuppliers } = useOpplyAPI();
const suppliers = ref<Supplier[]>([]);

onMounted(async () => {
  const { data } = await getSuppliers();
  suppliers.value = parseSuppliers(data.value?.results || []);
});
</script>

<template>
  <h2 class="text-4xl font-bold text-center my-10">List of Suppliers</h2>
  <section class="max-w-3xl mx-auto">
    <table class="w-full text-sm text-left border">
      <thead class="text-xs uppercase bg-purple-700 text-white">
        <tr>
          <th class="py-3 px-6">Supplier type</th>
          <th class="py-3 px-6">Code</th>
          <th class="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="supplier in suppliers"
          :key="supplier.id"
          class="bg-white border-b text-gray-700"
        >
          <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {{ supplier.type }}
          </td>
          <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {{ supplier.code }}
          </td>
          <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            <RouterLink
              :to="`/supplier/${supplier.id}`"
              class="hover:underline underline-offset-4 decoration-2"
            >
              Go to details
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
