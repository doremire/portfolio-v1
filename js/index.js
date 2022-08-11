
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
    window.scrollTo(0, 600);
    check.checked = false;
}

function checkbox1() {
    window.scrollTo(0, 1200);
    check.checked = false;
}

function checkbox2() {
    window.scrollTo(0, 1840);
    check.checked = false;
}