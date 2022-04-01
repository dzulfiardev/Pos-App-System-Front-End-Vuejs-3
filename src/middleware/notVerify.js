export default function notVerify({ next, store }) {
  if (!store.getters["auth/verifyUser"]) next();
  else next({ name: "dashboard" });
}
