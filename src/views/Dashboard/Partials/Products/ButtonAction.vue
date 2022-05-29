<template>
  <div class="flex lg:flex gap-2 mt-2">
    <button
      @click.prevent="alertClick"
      class="text-blue-500 hover:text-blue-800 transition"
    >
      <EyeIcon class="h-5 w-5" />
    </button>
    <button class="text-blue-500 hover:text-blue-800 transition">
      <PencilIcon class="h-5 w-5" />
    </button>
    <button class="text-blue-500 hover:text-blue-800 transition">
      <TrashIcon class="h-5 w-5" />
    </button>
  </div>
</template>

<script>
import PencilIcon from "@/components/icons/PencilIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";

export default {
  name: "button-action",
  components: {
    PencilIcon,
    EyeIcon,
    TrashIcon,
  },
  setup(props) {
    const cellValue = props.params.valueFormatted
      ? props.params.valueFormatted
      : props.params.data.id;

    function alertClick() {
      alert("Hello " + cellValue);
    }

    return {
      alertClick,
    };
  },
};
</script>

<style>
</style>