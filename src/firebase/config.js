import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgWgUmCW1eT7r82UVviv1UfJRwhXCBtpE",
  authDomain: "drag-and-drop-image-gall-d8a44.firebaseapp.com",
  projectId: "drag-and-drop-image-gall-d8a44",
  storageBucket: "drag-and-drop-image-gall-d8a44.appspot.com",
  messagingSenderId: "707214329237",
  appId: "1:707214329237:web:9a005153db54485590e29c",
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);