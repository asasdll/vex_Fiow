$(document).ready(function () {
    $("#flip").click(function () {
        $("#panel").slideToggle("slow");
    });
});

var keyModal = document.getElementById("keyModal");
var keyBtn = document.getElementById("keyBtn");
var span = document.getElementsByClassName("close")[0];

keyBtn.onclick = function () {
    keyModal.style.display = "block";
}

span.onclick = function () {
    keyModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == keyModal) {
        keyModal.style.display = "none";
    }
}

// var timeModal = document.getElementById("timeModal");
// var timeBtn = document.getElementById("timeBtn");
// var span1 = document.getElementsByClassName("close")[1];

// timeBtn.onclick = function () {
//     console.log('idn');
//     timeModal.style.display = "block";
// }

// span1.onclick = function () {
//     timeModal.style.display = "none";
// }

// window.onclick = function (event) {
//     if (event.target == timeModal) {
//         timeModal.style.display = "none";
//     }
// }