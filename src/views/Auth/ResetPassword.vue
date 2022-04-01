<template>
  <div class="grid justify-items-center">
    <div
      class="
        mt-5
        p-4
        max-w-md
        w-full
        bg-white
        rounded-lg
        border border-gray-200
        shadow-md
        sm:p-6
        lg:p-8
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      <form
        @submit.prevent="handleResetPassword()"
        class="space-y-6"
        action="#"
      >
        <FlashMessage :error="alert.error" :message="alert.message" />
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Reset Your Password
        </h3>

        <div>
          <label
            for="email"
            class="
              block
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
            "
            >Email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="
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
            placeholder="name@company.com"
            v-model="payload.email"
          />
        </div>

        <div>
          <label
            for="email"
            class="
              block
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
            "
            >Password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            class="
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
            placeholder="password"
            v-model="payload.password"
          />
        </div>

        <div>
          <label
            for="password_confirmation"
            class="
              block
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
            "
            >Password Confirm</label
          >
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            class="
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
            placeholder="Password Confirm"
            v-model="payload.password_confirmation"
          />
        </div>

        <button
          type="submit"
          class="
            w-full
            text-white
            bg-green-600
            hover:bg-green-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            transition
            duration-300
          "
          :class="{ 'opacity-25': attr.disabled }"
          :disabled="attr.disabled"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import AuthService from "../../services/AuthService";
import FlashMessage from "../../components/reusable/FlashMessage.vue";

export default {
  components: {
    FlashMessage,
  },
  setup() {
    const route = useRoute();
    const payload = reactive({
      email: null,
      password: null,
      password_confirmation: null,
      token: route.query.token,
    });
    const alert = reactive({
      message: null,
      error: null,
    });
    const attr = reactive({
      disabled: false,
    });

    function handleResetPassword() {
      attr.disabled = true;
      AuthService.resetPassword(payload)
        .then(() => {
          attr.disabled = false;
          alert.message = "Password Reset";
          setInterval(() => {
            alert.message = null;
          }, 4000);
          payload.email = null;
          payload.password = null;
          payload.password_confirmation = null;
        })
        .catch((err) => {
          attr.disabled = false;
          alert.error = err.data.message;
          setInterval(() => {
            alert.error = null;
          }, 4000);
        });
    }

    return { alert, payload, attr, handleResetPassword };
  },
};
</script>

<style>
</style>