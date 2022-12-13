
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


// getItemメソッドでlocalStorageからデータを取得
let n = localStorage.getItem('count');

//データの値を判定
if (n === null) {
	//データが何もない場合「1」を代入
    n = 1;
} else {
	//データがある場合「1」をプラス
    n++;
}

//setItemメソッドでlocalStorageにデータを保存
localStorage.setItem('count', n);

//コンソールで値を表示
console.log(n);