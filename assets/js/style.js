$(document).ready(function () {
    $("#flip").click(function () {
        $("#panel").slideToggle("slow");
    });
});

var modal = document.getElementById("keyModal");
var keyBtn = document.getElementById("keyBtn");
var span = document.getElementsByClassName("close")[0];

keyBtn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}