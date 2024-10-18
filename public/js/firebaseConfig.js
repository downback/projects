const firebaseConfig = {
  apiKey: "AIzaSyASs2_RZS4lkX-jXSYwp0NutIEjzKWGt8c",
  authDomain: "coloso-test-sticker.firebaseapp.com",
  projectId: "coloso-test-sticker",
  storageBucket: "coloso-test-sticker.appspot.com",
  messagingSenderId: "133337699499",
  appId: "1:133337699499:web:bcf65a0b1bdee7ff1253ee",
  measurementId: "G-FZ8R5EMRPV",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const storage = firebaseApp.storage()
