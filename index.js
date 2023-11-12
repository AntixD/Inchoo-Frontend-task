function toggleAccordion(id) {
  var element = document.getElementById(id);
  var icon = document.querySelector(".shopping__estimate-toggle-icon img");
  var innerText = document.querySelector(".shopping__inner_text");

  if (element.style.display === "none" || !element.style.display) {
    element.style.display = "block";
    icon.src = "./assets/Shape (7).png";
    innerText.classList.add("shopping__inner_text--active");
  } else {
    element.style.display = "none";
    icon.src = "./assets/Shape (6).png";
    innerText.classList.remove("shopping__inner_text--active");
  }
}
// JavaScript to handle clicking on the search icon
document.addEventListener("DOMContentLoaded", function () {
  var searchIcon = document.querySelector(".cart__inputImg");
  var searchInput = document.querySelector(".cart__input");
  var searchContainer = document.querySelector(".cart__inputContainer");

  searchIcon.addEventListener("click", function () {
    if (window.innerWidth < 1025) {
      searchInput.focus();
      searchContainer.style.width = "100px";
      searchInput.style.border = "1px solid black";
    }
  });

  searchInput.addEventListener("blur", function () {
    if (window.innerWidth < 1025 && !this.value) {
      searchContainer.style.width = "48px";
      this.style.opacity = "1";
      this.style.border = "none";
    }
  });

  // Add a listener for window resizing
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1025) {
      searchInput.style.border = "1px solid black";
    } else if (!searchInput.value) {
      searchContainer.style.width = "48px";
      searchInput.style.opacity = "0";
      searchInput.style.border = "none";
    }
  });
});

function updateCartButton() {
  var cartButton = document.querySelector(".cart__button");
  var cartCounter = cartButton.querySelector(".cart__counter");
  var myCartText = cartButton.querySelectorAll("span")[1]; // Assuming "MY CART" is the second span
  var shapeImg = cartButton.querySelector("img:last-of-type");

  if (window.innerWidth >= 1025) {
    // Hide elements for wider screens
    if (cartCounter) cartCounter.style.display = "inline-block";
    if (myCartText) myCartText.style.display = "inline-block";
    if (shapeImg) shapeImg.style.display = "inline-block";
  } else {
    if (cartCounter) cartCounter.style.display = "none";
    if (myCartText) myCartText.style.display = "none";
    if (shapeImg) shapeImg.style.display = "none";
  }
}

// Run the function on initial load
updateCartButton();

// Add the event listener for resizing the window
window.addEventListener("resize", updateCartButton);

function fetchCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("country");
      countrySelect.innerHTML = '<option value="">Select a country...</option>';
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      data.forEach((country) => {
        countrySelect.add(new Option(country.name.common, country.cca2));
      });
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });
}

function fetchStates(countryCode) {
  const stateSelect = document.getElementById("state");
  stateSelect.innerHTML =
    '<option value="">Select a state/province...</option>';
  stateSelect.disabled = true;
  console.log(`States for country ${countryCode} would be fetched here.`);
}
fetchCountries();

document.getElementById("country").addEventListener("change", function () {
  fetchStates(this.value);
});
