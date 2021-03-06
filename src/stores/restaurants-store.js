import { readable } from "svelte/store";
import userStore from "./user-store";
import { db } from "../firebase";

const initialState = {
  isLoading: false,
  items: []
};

const store = readable(initialState, set => {
  let unsubscribe = null;
  

  userStore.subscribe(user => {
    if (user) {
      set({
        isLoading: true,
        items: [],
      });

      unsubscribe = db.collection("restaurants").where("authorId", "==", user.uid).onSnapshot({
        next: (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            ...doc.data()
            , id: doc.id
          }));

          set({
            isLoading: false,
            items
          });
        }
      });
    } else {
      set(initialState);
    }
  });

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  }
});

export default store;