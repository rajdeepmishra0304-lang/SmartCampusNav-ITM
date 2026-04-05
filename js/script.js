/* ============================================================
   script.js — Smart Campus Navigation
   Handles: Login, URL params, JSON fetch, DOM update
   ============================================================ */


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
  if (!form) return; // not on login page

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();
    var errorBox = document.getElementById("login-error");

    if (username === "admin" && password === "1234") {
      // Correct → go to campus selection
      window.location.href = "campus.html";
    } else {
      // Incorrect → show error
      errorBox.style.display = "block";
      errorBox.textContent = "Invalid username or password. Please try again.";
    }
  });

  // Hide error when user starts typing again
  ["username", "password"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      document.getElementById("login-error").style.display = "none";
    });
  });
}


/* ============================================================
   MAP PAGES — turari-map.html / sithouli-map.html
   Redirects to details.html with campus + building in URL
   ============================================================ */
function initMapPage() {
  var buttons = document.querySelectorAll(".building-btn");
  if (buttons.length === 0) return; // not on a map page

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
   Reads URL params → fetches campus.json → renders details
   ============================================================ */
function initDetailsPage() {
  var container = document.getElementById("details-container");
  if (!container) return; // not on details page

  var campus   = getParam("campus");
  var building = getParam("building");

  // Show loading state
  container.innerHTML = '<p class="loading-text">Loading building details...</p>';

  if (!campus || !building) {
    container.innerHTML = '<p class="error-text">Missing campus or building information in URL.</p>';
    return;
  }

  // Fetch the JSON data file
  fetch("data/campus.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load campus data.");
      }
      return response.json();
    })
    .then(function (data) {
      // Validate campus key
      if (!data[campus]) {
        container.innerHTML = '<p class="error-text">Campus "' + campus + '" not found.</p>';
        return;
      }

      // Validate building key
      var buildingData = data[campus].buildings[building];
      if (!buildingData) {
        container.innerHTML = '<p class="error-text">Building "' + building + '" not found on this campus.</p>';
        return;
      }

      // Render the building details card
      renderDetails(container, buildingData, data[campus].campus_name);
    })
    .catch(function (err) {
      container.innerHTML = '<p class="error-text">Error: ' + err.message + '</p>';
    });
}

/* Builds and inserts the details HTML into the page */
function renderDetails(container, b, campusName) {
  // Image section — placeholder if image not present
  var imageHTML = '<div class="details-img-placeholder">[ Building Image: ' + b.name + ' ]</div>';

  // Build sections list (canteen shops / floor breakdown etc.)
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
