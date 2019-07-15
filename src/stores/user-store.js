import { readable } from "svelte/store";
import { auth } from "../firebase";

const userStore = readable(null, set => {
  if (auth.currentUser) {
    set(auth.currentUser);
  }
  
  auth.onAuthStateChanged( user => set(user) );
});

export default userStore;