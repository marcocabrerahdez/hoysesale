// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDopAnGrv5GKQ_X0TXEJoKW9E7lBlpeLNI",
  authDomain: "hoy-se-sale-b9e60.firebaseapp.com",
  databaseURL: "https://hoy-se-sale-b9e60.firebaseio.com",
  projectId: "hoy-se-sale-b9e60",
  storageBucket: "",
  messagingSenderId: "87303936308",
  appId: "1:87303936308:web:01818ef45fb0dbb0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var chatChannel = "hoy-se-sale-b9e60-channel-1";
var database = firebase.database();

console.log(database);
console.log(database.ref(chatChannel));

// database.ref(chatChannel).on("child_added", snapshot => {
//   var data = snapshot.val();
// });

function addMessage() {
  var message = {
    name: "marco",
    lugar: "papagayo"
  };
  database.ref(chatChannel).push(message);
}
