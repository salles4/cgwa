
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"

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
const db = getDatabase(app);

export { db, ref, get };