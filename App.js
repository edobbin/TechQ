import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export class App {
    constructor() {
        this.auth = getAuth();
        this.db = getFirestore();
    }

    async register(username, firstname, lastname, email, password, accountType) {
        if (password !== confirm_password) {
            // Handle the password confirmation logic
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            // Store additional user details in Firestore
            await setDoc(doc(this.db, "users", user.uid), {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                accountType: accountType.value // Assuming this is an input element of radio buttons
            });
            // Handle successful registration
        } catch (error) {
            // Handle errors, such as email already in use
        }
    }
}