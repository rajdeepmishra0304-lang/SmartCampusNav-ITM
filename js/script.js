/* ============================================================
   script.js — Smart Campus Navigation
   Handles: Login, URL params, inline data lookup, DOM update
   ============================================================ */


/* ============================================================
   INLINE DATA — Turari campus only
   (No fetch needed — works from file:// without a server)
   ============================================================ */
var CAMPUS_DATA = {
  "turari": {
    "campus_name": "ITM Turari Campus",
    "buildings": {
      "academic-block": {
        "name": "Academic Block",
        "description": "The Academic Block is the main teaching hub of ITM Turari. It houses all classrooms, computer labs, and department offices for undergraduate engineering programs.",
        "image": "images/turari-academic.jpg",
        "floor": "4 Floors",
        "capacity": "2000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "CSE & IT Department offices, Computer Lab 1 & 2" },
          { "label": "First Floor",  "detail": "Mechanical & Civil Engineering classrooms, Drawing Hall" },
          { "label": "Second Floor", "detail": "Electronics & Electrical labs, Seminar Hall (200 seats)" },
          { "label": "Third Floor",  "detail": "Faculty cabins, Principal Office, Conference Room" }
        ]
      },
      "hostel": {
        "name": "PCB Block",
        "description": "The Turari campus hostel provides comfortable residential facilities for outstation students with separate blocks for boys and girls.",
        "image": "images/turari-hostel.jpg",
        "floor": "3 Floors",
        "capacity": "500 Students",
        "timing": "Open 24 Hours",
        "sections": [
          { "label": "Boys Block A", "detail": "120 rooms, double occupancy, AC & Non-AC options" },
          { "label": "Boys Block B", "detail": "80 rooms, Wi-Fi enabled, 24/7 security" },
          { "label": "Girls Block",  "detail": "100 rooms, separate warden, CCTV surveillance" },
          { "label": "Common Area",  "detail": "TV lounge, indoor games, RO water facility" }
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
          { "label": "Main Kitchen",    "detail": "Breakfast, lunch & dinner thali \u2014 \u20b930 to \u20b960" },
          { "label": "Snacks Counter",  "detail": "Samosa, bread omelette, Maggi, sandwiches" },
          { "label": "Juice Bar",       "detail": "Fresh fruit juices, cold drinks, tea & coffee" },
          { "label": "Stationary",      "detail": "Notebooks, pens, printing & photocopy service" }
        ]
      },
      "leonardo-block": {
        "name": "Leonardo da Vinci Block",
        "description": "The Leonardo da Vinci Block is dedicated to innovation and applied sciences. It houses advanced research labs, project rooms, and interdisciplinary studios for creative engineering.",
        "image": "images/turari-leonardo.jpg",
        "floor": "3 Floors",
        "capacity": "800 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Innovation Lab, Robotics Lab, 3D Printing Studio" },
          { "label": "First Floor",  "detail": "Project Development Rooms, Group Study Areas" },
          { "label": "Second Floor", "detail": "Research Lab, Faculty Offices, Conference Room" }
        ]
      },
      "gandhi-block": {
        "name": "Mahatma Gandhi Block",
        "description": "The Mahatma Gandhi Block is the centre for humanities, management, and social sciences. It features large lecture halls, seminar rooms, and a media room.",
        "image": "images/turari-gandhi.jpg",
        "floor": "3 Floors",
        "capacity": "1000 Students",
        "timing": "8:00 AM \u2013 6:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "MBA Classrooms, Case Study Room, Placement Cell" },
          { "label": "First Floor",  "detail": "BBA Classrooms, Commerce Labs, Seminar Hall" },
          { "label": "Second Floor", "detail": "Media Room, Language Lab, HOD Office" }
        ]
      },
      "kirloskar-block": {
        "name": "Kirloskar Block",
        "description": "The Kirloskar Block is the engineering and manufacturing hub, equipped with heavy machinery labs, workshop areas, and technical training facilities.",
        "image": "images/turari-kirloskar.jpg",
        "floor": "2 Floors",
        "capacity": "600 Students",
        "timing": "8:00 AM \u2013 5:00 PM",
        "sections": [
          { "label": "Ground Floor", "detail": "Mechanical Workshop, Welding Lab, Fitting Shop" },
          { "label": "First Floor",  "detail": "Electrical Lab, Power Electronics Lab, Control Systems Room" }
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
          { "label": "Cricket Ground",    "detail": "Full-size cricket pitch with practice nets" },
          { "label": "Basketball Court",  "detail": "Two courts, open for students after 4 PM" },
          { "label": "Volleyball Court",  "detail": "Available for inter-department tournaments" },
          { "label": "Sports Room",       "detail": "Chess, table tennis, carrom, indoor games equipment" }
        ]
      }
    }
  }
};


/* ============================================================
   UTILITY: Get URL query parameter by name
   Usage: getParam("campus") => "turari"
   ============================================================ */
function getParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}


/* ============================================================
   LOGIN PAGE — index.html
   Checks username = "admin", password = "1234"
   ============================================================ */
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


/* ============================================================
   MAP PAGES — turari-map.html / sithouli-map.html
   ============================================================ */
function initMapPage() {
  var buttons = document.querySelectorAll(".building-btn");
  if (buttons.length === 0) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var campus   = btn.getAttribute("data-campus");
      var building = btn.getAttribute("data-building");
      window.location.href = "details.html?campus=" + campus + "&building=" + building;
    });
  });
}


/* ============================================================
   DETAILS PAGE — details.html
   Reads URL params → looks up inline CAMPUS_DATA → renders
   ============================================================ */
function initDetailsPage() {
  var container = document.getElementById("details-container");
  if (!container) return;

  var campus   = getParam("campus");
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
          '<tr><td>Campus</td><td>'   + campusName + '</td></tr>' +
          '<tr><td>Floor</td><td>'    + b.floor    + '</td></tr>' +
          '<tr><td>Capacity</td><td>' + b.capacity + '</td></tr>' +
          '<tr><td>Timings</td><td>'  + b.timing   + '</td></tr>' +
        '</table>' +
        sectionsHTML +
        '<button class="btn" style="margin-top:22px;" onclick="history.back()">&#8592; Go Back</button>' +
      '</div>' +
    '</div>';
}


/* ============================================================
   INIT — Run the right function based on current page
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  initLoginPage();
  initMapPage();
  initDetailsPage();
});
