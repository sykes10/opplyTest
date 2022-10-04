<template>
  <button
    class="bg-purple-700 text-white font-medium"
    :class="inputStyle"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot v-if="!props.isLoading"></slot>
    <template v-else>...loading...</template>
  </button>
</template>
<script lang="ts" setup>
import { useFormElementCommonStyles } from '@/composables/useFormElementCommonStyles';
const inputStyle = useFormElementCommonStyles();
const props = defineProps<{ isLoading?: boolean }>();
</script>
