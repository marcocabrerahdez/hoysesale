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
  averageContainer.innerHTML = `<div class="percentageCircles">
  <div class="svg-item">
  <svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
    <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle>
    <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle>
    <circle class="donut-segment" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5" stroke-dasharray="20 80" stroke-dashoffset="25"></circle>
    <g class="donut-text">

      <text y="50%" transform="translate(0, 2)">
        <tspan x="50%" text-anchor="middle" class="donut-percent">${papagayoCount}</tspan>   
      </text>
    </g>
  </svg>
</div> <div class="svg-item">
<svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
  <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle>
  <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle>
  <circle class="donut-segment" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5" stroke-dasharray="20 80" stroke-dashoffset="25"></circle>
  <g class="donut-text">

    <text y="50%" transform="translate(0, 2)">
      <tspan x="50%" text-anchor="middle" class="donut-percent">${marinhaCount}</tspan>   
    </text>
  </g>
</svg>
</div> <div class="svg-item">
<svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
  <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle>
  <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle>
  <circle class="donut-segment" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5" stroke-dasharray="20 80" stroke-dashoffset="25"></circle>
  <g class="donut-text">

    <text y="50%" transform="translate(0, 2)">
      <tspan x="50%" text-anchor="middle" class="donut-percent">${terrazasCount}</tspan>   
    </text>
  </g>
</svg>
</div></div>
<div class=percentageTitle>
    <div class="myTitle">
        <p>
            <h1>Marinha</h1>
        </p>
    </div>
    <div class="myTitle">
        <p>
            <h1>Papagayo</h1>
        </p>
    </div>
    <div class="myTitle">
        <p>
            <h1>Terrazas</h1>
        </p>
    </div>
</div>`;
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
