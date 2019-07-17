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

var allVotes = [];
var papagayoCount = 0;
var marinhaCount = 0;
var terrazasCount = 0;

database.ref(chatChannel).on("child_added", snapshot => {
  var data = snapshot.val();
  allVotes.push(data);
});

function calculateAverage() {
  allVotes.forEach(voto => {
    if (voto.lugar == "papagayo") {
      papagayoCount = papagayoCount + 1;
    }
    if (voto.lugar == "marinha") {
      marinhaCount = marinhaCount + 1;
    }
    if (voto.lugar == "terrazas") {
      terrazasCount = terrazasCount + 1;
    }
  });

  console.log("papagayo:", papagayoCount);
  console.log("marinha:", marinhaCount);
  console.log("terrazas:", terrazasCount);
}

function showAverage() {
  // buscamos elemento html
  var averageContainer = document.querySelector(".averageContainer");
  // lo mostramos
  averageContainer.style.display = "block";
  // lo rellenamos con HTML!!!
  averageContainer.innerHTML = `<div class="pappito"> </span>Votos -> papagayo: ${papagayoCount} , marinha: ${marinhaCount}, terrazas: ${terrazasCount}</div>`;
}

function addPapagayoVote() {
  var message = {
    lugar: "papagayo"
  };
  database.ref(chatChannel).push(message);
  popUpAndHide();
}

function addMarinhaVote() {
  var message = {
    lugar: "marinha"
  };
  database.ref(chatChannel).push(message);
  popUpAndHide();
}

function addTerrazasVote() {
  var message = {
    lugar: "terrazas"
  };
  database.ref(chatChannel).push(message);
  popUpAndHide();
}

function popUpAndHide() {
  alert("Gracias por votar!");
  // seleccionamos imagenes del html
  var imageButtonsArray = document.querySelectorAll(".section");
  // escondemos imagenes
  imageButtonsArray.forEach(image => (image.style.display = "none"));
  // calculamos votos
  calculateAverage();
  // mostramos votos
  showAverage();
}
