<template>
  <label class="text-sm">{{ label }}</label>
  <input
    :type="type"
    :name="name"
    :id="id"
    class="
      mt-1
      bg-gray-50
      border border-gray-300
      text-gray-900 text-sm
      rounded-lg
      focus:outline-none
      focus:ring-green-500
      focus:border-green-500
      focus:ring-1
      block
      w-full
      p-2.5
      dark:bg-gray-600
      dark:border-gray-500
      dark:placeholder-gray-400
      dark:text-white
      transition
      duration-300
    "
    :placeholder="placeholder"
    :value="value"
    :v-model="model"
    @input="updateValue"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    type: String,
    name: String,
    id: String,
    placeholder: String,
    value: String,
    model: Object,
  },
  methods: {
    updateValue(event) {
      // console.log(event.target.value);
      // this.$props.model = event.target.value;
      // this.model = event.target.value;
      return this.$emit("input", event.target.value);
    },
  },
};
</script>

<style>
</style>