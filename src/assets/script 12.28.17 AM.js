document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('.hamburger-menu');
    var navLinks = document.querySelector('.nav-links');

    toggleBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from reaching the document
        // Toggle the 'active' class on the mobile menu
        navLinks.classList.toggle('active');
    });

    // Close the menu if a link is clicked or anywhere on the document
    document.addEventListener('click', function () {
        navLinks.classList.remove('active');
    });

    // Prevent the menu from closing if a click happens inside the menu
    navLinks.addEventListener('click', function (event) {
        event.stopPropagation();
    });

     // Pressing Enter key in the input triggers the search
  document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      openSearchWindow();
    }
  });
});

function openSearchWindow() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
      bgsections = document.querySelectorAll("section.mainbgsection");
      var target = "searchresults";
      renderSection (target, bgsections);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementsByTagName('a');
    link.addEventListener('click', function(event){
      bgsections = document.querySelectorAll("section.mainbgsection");
      var target = event.target.getAttribute("href").substring(1);;
      renderSection (target, bgsections);
    });
  });

  function renderSection (target, sections){
  
    sections.forEach(function(section) {
      if (section.id === target && section.id !== "home") {

        section.style.display = "block";
        document.getElementById("home").style.display = "none";
      } else if  (section.id === target && section.id !== "home") {
          section.style.display = "block";
      }  else if  (section.id === target && section.id == "home") {
        section.style.display = "block";
    }  
 
      else {
        section.style.display = "none";
      }
    });
  }
  
  // Function to change the section and update the history
  function changeSection(sectionId) {
      // Do something to change the section content
  
      // Update the history stack
      historyStack.push(window.location.hash.substring(1));
  
      // Update the history state
      history.pushState({ section: sectionId }, '', '#' + sectionId);
  
      // Render the page
      renderPage();
  }
  
  // Function to go back when the user clicks the back button
  function goBack() {
      // Pop the last section from the history stack
      var previousSection = historyStack.pop();
  
      // Check if there's a previous section
      if (previousSection) {
          // Do something to change the section content based on the previousSection value
  
          // Update the history state
          history.pushState({ section: previousSection }, '', '#' + previousSection);
  
          // Render the page
          renderPage();
      }
  }
  
  // Function to render the page based on the current URL
  function renderPage() {
      // Get the current section from the URL hash
      var currentSection = window.location.hash.substring(1);
  
      // Show the current section
      renderSection (currentSection, bgsections);
  }

  // Hide sections except the home section by default
  var bgsections = [], sections = document.querySelectorAll("section.mainbgsection:not(#home)");

  sections.forEach(function(section) {
    section.style.display = "none";
  });

  bgsections = document.querySelectorAll("section.mainbgsection");
 // Show the clicked section and hide other sections
  var navLinks = document.querySelectorAll("a");
  navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
    
      if (event.target.getAttribute("href")){
        var target = event.target.getAttribute("href").substring(1);
        var targetSection = document.getElementById(target);
      } 


      if (targetSection) {
        renderSection (target, bgsections);
      }
    });
  });


  window.addEventListener('popstate', function(event) {
    // Render the page based on the current URL
    renderPage();
});

// Initialize history stack
var historyStack = [];

// Use pushState to add an initial state to the history
history.pushState({ section: 'home' }, '', '#home');

// Initial render
//renderPage();


 