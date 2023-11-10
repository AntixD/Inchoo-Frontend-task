function toggleAccordion(id) {
  var element = document.getElementById(id);
  var icon = document.querySelector(".shopping__estimate-toggle-icon");

  if (element.style.display === "none") {
    element.style.display = "block";
    icon.textContent = "−";
  } else {
    element.style.display = "none";
    icon.textContent = "+";
  }
}

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
