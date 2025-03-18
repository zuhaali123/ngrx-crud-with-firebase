import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';  // Import Firebase config

// Initialize Firebase app
const firebaseApp = initializeApp(environment.firebase);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
