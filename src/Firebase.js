import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApLDv1ekr_tegGyjOUdPhTgU6LOZgACss",
  authDomain: "cgwa-df8c2.firebaseapp.com",
  databaseURL: "https://cgwa-df8c2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cgwa-df8c2",
  storageBucket: "cgwa-df8c2.appspot.com",
  messagingSenderId: "693691475739",
  appId: "1:693691475739:web:02eeb7ce888a63846b55be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default database