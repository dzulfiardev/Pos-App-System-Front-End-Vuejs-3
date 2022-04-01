export function test({ store }) {
  const authUser = store.getters["auth/authUser"];
  console.log(authUser);
}
