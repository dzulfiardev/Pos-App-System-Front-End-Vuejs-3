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
                <div class="flex flex-col sm:flex-row gap-5 my-2">
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Code</label>
                    <input
                      type="text"
                      name="code"
                      class="input_style_1 text-base py-2"
                      placeholder="Code"
                    />
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Barcode</label>
                    <input
                      type="text"
                      name="barcode"
                      class="input_style_1 text-base py-2"
                      placeholder="Barcode"
                    />
                    <!-- <small class="text-red-700">This is error message</small> -->
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-5 my-2">
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Category</label>
                    <select type="text" class="input_style_1 text-base py-2">
                      <option value="">Category 1</option>
                      <option value="">Category 2</option>
                      <option value="">Category 3</option>
                      <option value="">Category 4</option>
                    </select>
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Brand</label>
                    <select type="text" class="input_style_1 text-base py-2">
                      <option value="">Brand 1</option>
                      <option value="">Brand 2</option>
                      <option value="">Brand 3</option>
                      <option value="">Brand 4</option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-5 my-2">
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Supplier</label>
                    <select type="text" class="input_style_1 text-base py-2">
                      <option value="">Supplier 1</option>
                      <option value="">Supplier 2</option>
                      <option value="">Supplier 3</option>
                      <option value="">Supplier 4</option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-5 my-2">
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Purchase Price</label>
                    <input
                      type="text"
                      class="input_style_1 text-base py-2"
                      placeholder="$0.00"
                    />
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="font-medium">Selling Price</label>
                    <input
                      type="text"
                      class="input_style_1 text-base py-2"
                      placeholder="$0.00"
                    />
                    <!-- <small class="text-red-700">This is error message</small> -->
                  </div>
                </div>
              </div>
              <!-- End Modal Body -->

              <!-- Modal Footer & Button Wrapper -->
              <hr />
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
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
                    hover:bg-greem-800
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-green-300
                    transition
                    duration-200
                    sm:ml-3 sm:w-auto sm:text-sm
                  "
                  @click="$emit('addModal')"
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
                  @click="$emit('addModal')"
                  ref="cancelButtonRef"
                >
                  {{ modal.btnCancelTitle }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
// import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default {
  props: {
    open: Boolean,
    modal: Object,
  },
  emits: ["addModal"],
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    ExclamationIcon,
    TransitionRoot,
  },
  // setup() {
  //   const open = ref(true);

  //   return { open };
  // },
};
</script>