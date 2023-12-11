import firebase from "firebase/compat/app"
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFMl43Qigu4qJeT4xElQB6u-x79By6fAU",
    authDomain: "passcode-a5240.firebaseapp.com",
    projectId: "passcode-a5240",
    storageBucket: "passcode-a5240.appspot.com",
    messagingSenderId: "774202992766",
    appId: "1:774202992766:web:c44b6fb667d24413e1d02f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;