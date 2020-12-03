/**personalizar botão go to top */
var btnGoTop = document.getElementById("go-to-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnGoTop.style.display = "flex";
    } else {
        btnGoTop.style.display = "none";
    }
  }



document.getElementById("go-to-top").addEventListener("click", toTop);
function toTop(){
    window.scrollTo(5000,0);
}