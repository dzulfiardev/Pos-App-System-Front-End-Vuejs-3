<template>
  <div class="py-5 px-10">
    <img
      class="rounded-lg object-cover"
      :src="src"
      style="width: 550px; height: 350px; margin: auto"
    />
    <input
      class="
        block
        w-full
        text-sm text-gray-900
        bg-gray-50
        rounded-lg
        border border-gray-300
        cursor-pointer
        dark:text-gray-400
        focus:outline-none
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        mt-3
      "
      id="file_input"
      type="file"
      @change="updateImage($event)"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  input: Object,
});

const emits = defineEmits(["method"]);

let src = ref("");
const store = useStore();

onMounted(() => {
  src.value = props.input.imgSrc
    ? props.input.imgSrc
    : "https://via.placeholder.com/550x350.png";
});

function updateImage(event) {
  const file = event.target.files[0];
  if (file) {
    src.value = URL.createObjectURL(file);
    // store.dispatch("products/bindfile", file);
    store.commit("products/storeFile", file);
    emits("method");
  }
}
</script>

<style>
</style>