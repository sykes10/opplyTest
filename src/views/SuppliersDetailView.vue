<script setup lang="ts">
import { useOpplyAPI } from '@/composables/useOpplyAPI';
import type { Supplier } from '@/types/entities';
import { onMounted, ref } from 'vue';
import AppSupplier from '@/components/AppSupplier.vue';
import { useRoute } from 'vue-router';
import { parseSupplier } from '@/lib/supplier';
const $route = useRoute();

const { getSuppliersById } = useOpplyAPI();
const supplier = ref<Supplier | null>(null);

onMounted(async () => {
  const { data } = await getSuppliersById(Number($route.params.id) || 0);
  if (data.value) {
    supplier.value = parseSupplier(data.value);
  }
});
</script>

<template>
  <section class="flex justify-center py-10">
    <AppSupplier v-if="supplier" :supplier="supplier"></AppSupplier>
  </section>
</template>
