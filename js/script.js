/* script.js — Smart Campus Navigation
   Will manage-Login, URL params, inline data lookup, DOM update*/


/* INLINE DATA — Turari campus*/
var CAMPUS_DATA = {
  "turari": {
    "campus_name": "ITM Turari Campus",
    "buildings": {
      "jcb-block": {
        "name": "JC Bose Block",
        "description": "The JC Bose block mainly hosts classes for electrical students and is well equipped with proper labs and equipments. It also has the ERP cell and VC office.",
        "image": "images/turari-jcb.jpg",
        "floor": "4 Floors",
        "capacity": "2000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Details about ground floor." },
          { "label": "First Floor", "detail": "Details about first floor." },
          { "label": "Second Floor", "detail": "Details about second floor." },
          { "label": "Third Floor", "detail": "Details about third floor." }
        ]
      },
      "pcb-block": {
        "name": "PCB Block",
        "description": "The PCB Block is the academic block for students pursuing pure science subjects like forensics, pharmacy etc.",
        "image": "images/turari-hostel.jpg",
        "floor": "4 Floors",
        "capacity": "2000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Details about ground floor." },
          { "label": "First Floor", "detail": "Details about first floor." },
          { "label": "Second Floor", "detail": "Details about second floor." },
          { "label": "Third Floor", "detail": "Details about third floor." }
        ]
      },
      "canteen": {
        "name": "Canteen",
        "description": "The campus canteen serves fresh, hygienic, and affordable meals throughout the day. It has multiple food counters and a spacious seating area.",
        "image": "images/turari-canteen.jpg",
        "floor": "Ground Floor",
        "capacity": "300 Seats",
        "timing": "7:00 AM \u2013 9:00 PM",
        "sections": [
          { "label": "Main Kitchen", "detail": "Breakfast, lunch & dinner thali \u2014 \u20b930 to \u20b960" },
          { "label": "Snacks Counter", "detail": "Samosa, bread omelette, Maggi, sandwiches" },
          { "label": "Juice Bar", "detail": "Fresh fruit juices, cold drinks, tea & coffee" },
          { "label": "Stationary", "detail": "Notebooks, pens, printing & photocopy service" }
        ]
      },
      "leonardo-block": {
        "name": "Leonardo da Vinci Block",
        "description": "The Leonardo da Vinci Block is dedicated to management courses along with being the main admin block. It also houses the central library.",
        "image": "images/turari-leonardo.jpg",
        "floor": "4 Floors",
        "capacity": "2000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Details about ground floor." },
          { "label": "First Floor", "detail": "Details about first floor." },
          { "label": "Second Floor", "detail": "Details about second floor." },
          { "label": "Third Floor", "detail": "Details about third floor." }
        ]
      },
      "gandhi-block": {
        "name": "Mahatma Gandhi Block",
        "description": "The Mahatma Gandhi Block is the centre for technological subjects like CS, IT etc.",
        "image": "images/turari-gandhi.jpg",
        "floor": "4 Floors",
        "capacity": "2000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Details about ground floor." },
          { "label": "First Floor", "detail": "Details about first floor." },
          { "label": "Second Floor", "detail": "Details about second floor." },
          { "label": "Third Floor", "detail": "Details about third floor." }
        ]
      },
      "kirloskar-block": {
        "name": "Kirloskar Block",
        "description": "The Kirloskar Block is the engineering hub, equipped with heavy machinery labs, workshop areas, and technical training facilities.",
        "image": "images/turari-kirloskar.jpg",
        "floor": "4 Floors",
        "capacity": "2000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Details about ground floor." },
          { "label": "First Floor", "detail": "Details about first floor." },
          { "label": "Second Floor", "detail": "Details about second floor." },
          { "label": "Third Floor", "detail": "Details about third floor." }
        ]
      },
      "sports-department": {
        "name": "Sports Department",
        "description": "The Sports Department manages all athletic and recreational activities on campus. It includes outdoor courts, a sports room, and a dedicated fitness zone for students.",
        "image": "images/turari-sports.jpg",
        "floor": "Ground Level",
        "capacity": "500 Students",
        "timing": "6:00 AM \u2013 8:00 PM",
        "sections": [
          { "label": "Cricket Ground", "detail": "Full-size cricket pitch with practice nets" },
          { "label": "Basketball Court", "detail": "Two courts, open for students after 4 PM" },
          { "label": "Volleyball Court", "detail": "Available for inter-department tournaments" },
          { "label": "Sports Room", "detail": "Chess, table tennis, carrom, indoor games equipment" }
        ]
      }
    }
  }
};


/* UTILITY: Get URL query parameter by name
   Usage: getParam("campus") => "turari"*/
function getParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}


/*LOGIN PAGE — index.html
   Checks username = "admin", password = "1234"*/
function initLoginPage() {
  var form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();
    var errorBox = document.getElementById("login-error");

    if (username === "admin" && password === "1234") {
      window.location.href = "campus.html";
    } else {
      errorBox.style.display = "block";
      errorBox.textContent = "Invalid username or password. Please try again.";
    }
  });

  ["username", "password"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      document.getElementById("login-error").style.display = "none";
    });
  });
}


/* MAP PAGES*/
function initMapPage() {
  var buttons = document.querySelectorAll(".building-btn");
  if (buttons.length === 0) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var campus = btn.getAttribute("data-campus");
      var building = btn.getAttribute("data-building");
      window.location.href = "details.html?campus=" + campus + "&building=" + building;
    });
  });
}


/*DETAILS PAGE*/
function initDetailsPage() {
  var container = document.getElementById("details-container");
  if (!container) return;

  var campus = getParam("campus");
  var building = getParam("building");

  if (!campus || !building) {
    container.innerHTML = '<p class="error-text">Missing campus or building information in URL.</p>';
    return;
  }

  var campusData = CAMPUS_DATA[campus];
  if (!campusData) {
    container.innerHTML = '<p class="error-text">Campus "' + campus + '" not found.</p>';
    return;
  }

  var buildingData = campusData.buildings[building];
  if (!buildingData) {
    container.innerHTML = '<p class="error-text">Building "' + building + '" not found on this campus.</p>';
    return;
  }

  renderDetails(container, buildingData, campusData.campus_name);
}


/* Builds and inserts the details HTML into the page */
function renderDetails(container, b, campusName) {
  var imageHTML = '<div class="details-img-placeholder">[ Building Image: ' + b.name + ' ]</div>';

  var sectionsHTML = '';
  if (b.sections && b.sections.length > 0) {
    sectionsHTML += '<h3 style="margin-bottom:10px; color:#1a3c5e; font-size:1rem;">Inside This Building</h3>';
    sectionsHTML += '<ul class="sections-list">';
    for (var i = 0; i < b.sections.length; i++) {
      sectionsHTML +=
        '<li class="section-item">' +
        '<span class="section-label">' + b.sections[i].label + '</span>' +
        '<span class="section-detail">' + b.sections[i].detail + '</span>' +
        '</li>';
    }
    sectionsHTML += '</ul>';
  }

  container.innerHTML =
    '<div class="details-card">' +
    imageHTML +
    '<div class="details-body">' +
    '<h2>' + b.name + '</h2>' +
    '<p class="description">' + b.description + '</p>' +
    '<table class="details-info-table">' +
    '<tr><td>Campus</td><td>' + campusName + '</td></tr>' +
    '<tr><td>Floor</td><td>' + b.floor + '</td></tr>' +
    '<tr><td>Capacity</td><td>' + b.capacity + '</td></tr>' +
    '<tr><td>Timings</td><td>' + b.timing + '</td></tr>' +
    '</table>' +
    sectionsHTML +
    '<button class="btn" style="margin-top:22px;" onclick="history.back()">&#8592; Go Back</button>' +
    '</div>' +
    '</div>';
}


/*INIT — Run the right function based on current page*/
document.addEventListener("DOMContentLoaded", function () {
  initLoginPage();
  initMapPage();
  initDetailsPage();
});
