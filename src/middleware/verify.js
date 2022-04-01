export default function verify({ next, store }) {
  if (store.getters["auth/verifyUser"]) next();
  else next({ name: "VerirfyEmail" });
}
