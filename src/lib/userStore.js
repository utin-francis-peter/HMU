import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { create } from "zustand";
import { db } from "./firebaseConfig";

const useUserStore = create((set) => ({
  // states
  currentUser: null,
  loading: true,

  // actions
  fetchUserInfo: async (uid) => {
    // check for undefined uid => a sign no user is signed in
    if (!uid) return set({ currentUser: null, loading: false });

    try {
      // use the received uid to fetch the user's document
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        set({ currentUser: userSnapshot.data(), loading: false });
      } else {
        // throw a new error indicating user with such id doesn't exist
        toast.error("User not found!");
        set({ currentUser: null, loading: false });
      }
    } catch (error) {
      console.log("Error fetching user info: ", error.message);
      toast.error("We encountered an error fetching your data");
      return set({ currentUser: null, loading: false });
    }
  },
}));

export default useUserStore;
