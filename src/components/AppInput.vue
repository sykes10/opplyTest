<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold text-sm" :for="props.label" v-if="props.label">{{
      props.label
    }}</label>
    <input
      :class="inputStyle"
      v-bind="$attrs"
      :name="props.label"
      @input="onInput"
      :value="props.modelValue"
    />
  </div>
</template>
<script lang="ts" setup>
import { useFormElementCommonStyles } from "@/composables/useFormElementCommonStyles";

const props = defineProps<{ modelValue: string; label: string }>();
const inputStyle = useFormElementCommonStyles();
const emit = defineEmits(["update:modelValue"]);

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>
