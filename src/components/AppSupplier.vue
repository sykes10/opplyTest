<template>
  <article class="rounded border shadow cursor-pointer inline-block">
    <div
      class="py-1 w-full bg-purple-700 rounded-t border-none top-0 left-0 text-white text-left pl-4"
    >
      CODE: {{ props.supplier.code }}
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg">Supplier of {{ props.supplier.type }}</h3>

      <p>
        {{ props.supplier.description }}
      </p>
    </div>
  </article>
</template>
<script lang="ts" setup>
import type { Supplier } from '@/types/entities';
import type { PropType } from 'vue';

const props = defineProps({
  supplier: {
    type: Object as PropType<Supplier>,
    required: true,
  },
});
</script>
