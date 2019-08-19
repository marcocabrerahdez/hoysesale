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
var totalCount;

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

  totalCount = papagayoCount + marinhaCount + terrazasCount;
  console.log("totalCount", totalCount);

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
  averageContainer.innerHTML = `<div class="resultsContainer">
  <div class="resultsContent">
      <div class="results">
          <p>
              <span>Resultados de la Votación</span>
          </p>
      </div>
  </div>
</div>

<div class="percentageCircles">
  <div class="graph-container">
    <svg id="my-svg-papagayo" width="250px" height="250px">
    </svg>
    <span class="percent-text">${Math.round((papagayoCount/totalCount)*100)} %</span>
  </div>
  <div class="graph-container">
    <svg id="my-svg-marinha" width="250px" height="250px">
    </svg>
    <span class="percent-text">${Math.round((marinhaCount/totalCount)*100)} %</span>
  </div>
  <div class="graph-container">
  <svg id="my-svg-terrazas" width="250px" height="250px">
    </svg>
    <span class="percent-text">${Math.round((terrazasCount/totalCount)*100)} %</span>
  </div>
</div>
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

function updateGraph(perc, circle, perimeter, color) {
  // Reset attributes
  circle.attr({
    fill: 'none',
    stroke: color,
    strokeWidth: '0.5cm',
    strokeDasharray: '0 ' + perimeter,
    strokeDashoffset: perimeter * .25
  });
  
  // Animate
  Snap.animate(0, perc, (val) => {
    circle.attr({
      strokeDasharray: perimeter * val + ' ' + perimeter * (1 - val)
    });
  }, 1500, mina.easeinout)
}

function getSnap(element, count, total) {
  var snap = Snap(element);
  var w = element.width.baseVal.value, h = element.height.baseVal.value, cx = w/2, cy = h/2;

  var radius = 100;
  var perimeter = 2 * Math.PI * radius;
  var percent = (count/total);
  var color = '#a9855d';

  var circle = snap.circle(cx, cy, radius);

  updateGraph(percent, circle, perimeter, color);
}

function renderGraphs() {
    var mySvgPapagayo = document.querySelector('#my-svg-papagayo');
    var mySvgMarinha = document.querySelector('#my-svg-marinha');
    var mySvgTerrazas = document.querySelector('#my-svg-terrazas');

    getSnap(mySvgPapagayo, papagayoCount, totalCount);
    getSnap(mySvgMarinha, marinhaCount, totalCount);
    getSnap(mySvgTerrazas, terrazasCount, totalCount);
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
  renderGraphs();
}

