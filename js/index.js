
ScrollReveal().reveal('.item', { reset: true, distance: '40px' });

// function onScroll() {
//     var infoF = document.getElementById("infoFrame");
//     infoF.innerHTML = "ScrollX:" + document.documentElement.scrollLeft + "<br/>"
//      + "ScrollY:" + document.documentElement.scrollTop;
//   }

//   window.onscroll = onScroll;

//============================================================

const check = document.getElementById("nav-input");

function checkbox0() {
    window.scrollTo(0, 700);
    check.checked = false;
}

function checkbox1() {
    window.scrollTo(0, 1300);
    check.checked = false;
}

function checkbox2() {
    window.scrollTo(0, 2010);
    check.checked = false;
}