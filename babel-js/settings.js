"use strict";

var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=uZRSzVe9ulL9BEMO9EaG0pGFLxHHHulT";
var section = document.querySelector("#section");
var categoryList = ["europa"]; // array contains fetched categories from NewYorkTimes API

var selectedCategory = []; // array contains selected/toggled categories

if (localStorage.getItem('selectedCategory')) {
  selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
}

axios.get(url).then(function (response) {
  var article = response.data.results; // create NewYorkTimes categoryArray
  // loops through categoryArray and check if a category allready exists
  // if not, the category is pushed to categoryArray

  article.forEach(function (article) {
    if (!categoryList.includes(article.section)) {
      categoryList.push(article.section);
    }
  }); // create a category card element and toggle button for each category in categoryArray

  categoryList.forEach(function (cat) {
    if (cat === 'well' || cat === 'sports' || cat === 'business' || cat === 'arts') {
      var wrapper = document.createElement("div");
      wrapper.classList.add("CategoryList", "display-f", "align-items-c");
      section.appendChild(wrapper);
      var heading = document.createElement("h2");
      heading.classList.add('CategoryList__heading');
      heading.textContent = cat;
      wrapper.appendChild(heading);
      var toggleButton = document.createElement("button");
      toggleButton.classList.add("ToggleButton");
      wrapper.appendChild(toggleButton);
      var toggleButtonCircle = document.createElement("div");
      toggleButtonCircle.classList.add("ToggleButton__circle");
      toggleButton.appendChild(toggleButtonCircle);
    }
  });
}); // toggle button switch on/off and save section name to localStorage

section.addEventListener("click", function (e) {
  var toggleButtonSwitch = e.target;
  var toggleButton = toggleButtonSwitch.closest('.ToggleButton');
  var toggleButtonSectionName = toggleButton.closest('.CategoryList').textContent; // if target contains className x then toggle/add on className y - if not toggled remove className y

  if (toggleButtonSwitch.classList.contains("ToggleButton__circle")) {
    toggleButtonSwitch.classList.toggle("ToggleButton__circle_active");
    toggleButton.classList.toggle("ToggleButton_active");
    var sectionName = toggleButtonSectionName;
    console.log(selectedCategory = selectedCategory.filter(function (obj) {
      return obj !== sectionName;
    }));
    selectedCategory = selectedCategory.filter(function (obj) {
      return obj !== sectionName;
    });
    selectedCategory.push(sectionName); // selectedCategory = selectedCategory.filter((obj) => sectionName !== obj);

    localStorage.setItem("selectedCategories", JSON.stringify(selectedCategory)); // if category name not allready exist in Array then add it - else remove category name from Array
    // selectedCategory = selectedCategory.filter((obj) => catObject.category !== obj.category);

    console.log('selectedCategory: ', selectedCategory);
  }

  ;
});