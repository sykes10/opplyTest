<script setup lang="ts">
import { useOpplyAPI } from '@/composables/useOpplyAPI';
import type { Supplier } from '@/types/entities';
import { onMounted, ref } from 'vue';

const { getSuppliers } = useOpplyAPI();
const suppliers = ref<Supplier[]>([]);

onMounted(async () => {
  const { data, error } = await getSuppliers();
  suppliers.value = data.value?.results || [];
});
</script>

<template>
  <main></main>
</template>
