<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="
            flex
            items-end
            sm:items-center
            justify-center
            min-h-full
            p-4
            text-center
            sm:p-0
          "
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="
                relative
                bg-white
                rounded-lg
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                sm:my-8
              "
              :class="modal.widthClass"
            >
              <form
                @submit.prevent="$emit('submit')"
                enctype="multipart/form-data"
              >
                <!-- Modal Header -->
                <div class="bg-white pt-5 pb-5">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-xl leading-6 font-medium text-gray-900"
                    >
                      {{ modal.title }}
                    </DialogTitle>
                  </div>
                </div>
                <hr />
                <!-- End Modal Header -->

                <!-- Modal Body -->
                <div class="py-3 px-4 sm:px-9">
                  <!-- Looping Element -->
                  <div
                    class="
                      flex flex-col
                      sm:flex-row
                      gap-0
                      sm:gap-5
                      mt-0
                      sm:mt-3
                    "
                    v-for="(row, i) in modal.inputs"
                    :key="i"
                  >
                    <div
                      class="flex flex-col w-full mt-2 sm:mt-0"
                      v-for="(input, index) in row"
                      :key="index"
                    >
                      <label class="font-medium" v-if="input.label">{{
                        input.label
                      }}</label>

                      <!-- Input Text -->
                      <input
                        type="text"
                        class="input_style_2 text-base py-2 mt-1"
                        :name="input.name"
                        :placeholder="input.placeholder"
                        v-if="input.type === 'text'"
                        v-model="input.value"
                      />

                      <!-- Input Select -->
                      <select
                        :name="input.name"
                        id=""
                        class="input_style_2 text-base py-2 mt-1"
                        v-if="input.type === 'select'"
                        v-model="input.value"
                      >
                        <option
                          v-for="(option, index2) in input.options"
                          :key="index2"
                          :value="option.value"
                        >
                          {{ option.text }}
                        </option>
                      </select>

                      <!-- Input Autocomplete -->
                      <Select2
                        v-model="input.value"
                        :options="input.options"
                        :settings="{
                          settingOption: input.value,
                          width: '100%',
                          selectionCssClass:
                            'input_style_2 text-base py-2 mt-1',
                        }"
                        @change="myChangeEvent($event)"
                        @select="mySelectEvent($event)"
                        style="width: 100% !important"
                        v-if="input.type === 'select2-autocomplete'"
                      />

                      <AutoCompleteSelect
                        :input="input"
                        v-if="input.type === 'select-autocomplete'"
                      />

                      <!-- End Input Autocomplete -->

                      <InputFile
                        :input="input"
                        @method="$emit('imageFileInput')"
                        v-if="input.type === 'file' && input.mime === 'image'"
                      />

                      <small class="text-red-500" v-if="input.errorMsg">{{
                        input.errorMsg
                      }}</small>
                    </div>
                  </div>
                  <!-- End Looping Element -->
                </div>
                <!-- End Modal Body -->

                <!-- Modal Footer & Button Wrapper -->
                <hr />
                <div
                  class="
                    bg-gray-50
                    px-4
                    py-3
                    sm:px-6 sm:flex sm:flex-row-reverse
                  "
                >
                  <button
                    type="submit"
                    class="
                      w-full
                      inline-flex
                      justify-center
                      rounded-md
                      border border-transparent
                      shadow-sm
                      px-4
                      py-2
                      bg-green-500
                      text-base
                      font-medium
                      text-white
                      hover:bg-green-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-green-300
                      transition
                      duration-200
                      sm:ml-3 sm:w-auto sm:text-sm
                    "
                  >
                    {{ modal.btnSubmitTitle }}
                  </button>
                  <button
                    type="button"
                    class="
                      mt-3
                      w-full
                      inline-flex
                      justify-center
                      rounded-md
                      border border-gray-300
                      shadow-sm
                      px-4
                      py-2
                      bg-white
                      text-base
                      font-medium
                      text-gray-700
                      hover:bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                      sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                    "
                    @click="$emit('close')"
                    ref="cancelButtonRef"
                  >
                    {{ modal.btnCancelTitle }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import Select2 from "vue3-select2-component";
import AutoCompleteSelect from "@/components/reusable/ComboboxAutocomplete.vue";
import InputFile from "@/components/reusable/InputFile.vue";

export default {
  props: {
    open: Boolean,
    modal: Object,
  },
  emits: ["close", "submit", "imageFileInput"],
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    AutoCompleteSelect,
    Select2,
    InputFile,
  },
  setup() {
    function myChangeEvent(val) {
      console.log(val);
    }
    function mySelectEvent({ value, text }) {
      console.log({ value, text });
    }

    return { myChangeEvent, mySelectEvent };
  },
};
</script>