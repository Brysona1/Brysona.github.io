var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      dropdown.style.display = "caret";
    } else {
      content.style.display = "block";
      dropdown.style.display = "caret-up"
    }
  });
}