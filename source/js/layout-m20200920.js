// let layer = document.getElementById("layer");
const header = document.getElementById("he"),
  headerHeight = parseInt(he.style.height),
  hcata = document.getElementById("hcata"),
  btnShow = document.getElementById("show"),
  btnClose = document.getElementById("close"),
  pcate = document.getElementsByClassName('category-list-item'),
  headerMenu = document.getElementsByClassName('headerMenu')[0].getElementsByTagName('a');

// 获取浏览器视口高度
let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  isShow = false;

window.addEventListener('scroll', function () {
  windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
});
hcata.style.height = (windowHeight - 80) + "px";

// 阻止默认事件
header.addEventListener('touchmove', function (e) {
  e.stopPropagation();
  if (e.target == header) {
    // 让不可以滚动的区域不要滚动
    e.preventDefault();
  }
}, false);
hcata.addEventListener('touchmove', function (e) {
  e.stopPropagation();
  if (e.target == hcata) {
    // 让不可以滚动的区域不要滚动
    e.preventDefault();
  }
}, false);

// 移动版头部按钮
function clk() {
  if (isShow) {
    btnClose.style.display = "none";
    btnShow.style.display = "inline-block";
    // btnShow.className = "animate__flipInX";
    // layer.className = "cata animate__fadeOut";
    header.style.height = 55 + "px";
    isShow = false;
    // setTimeout(function () {
    //   isShow = false;
    // }, 600);
  } else {
    btnShow.style.display = "none";
    btnClose.style.display = "inline-block";
    // btnClose.className = "animate__flipInX";
    // layer.style.display = "block";
    // layer.className = "cata animate__fadeIn"
    // 计算展开后的header高度
    header.style.height = (windowHeight) + "px";
    console.log(windowHeight);
    isShow = true;
    // setTimeout(function () {
    //   isShow = true;
    // }, 600);
  }
}

let iList = document.getElementsByClassName('p-list-item');
let wrapbd = document.getElementsByClassName('wrap-bd')[0];
for (let i = 0; i < iList.length; i++) {
  (function (n) {
    iList[n].addEventListener('touchstart', function (e) {
      e.stopPropagation();
      iList[n].style.transform = 'scale3d(.97, .97, .97)';
    });
    iList[n].addEventListener('touchend', function (e) {
      iList[n].style.transform = 'initial';
    });
    iList[n].addEventListener('touchmove', function (e) {
      setTimeout(function () {
        iList[n].style.transform = 'initial';
      }, 200);
    });
  })(i);
}


if (pcate.length) {
  for (let i = 0; i < pcate.length; i++) {
    (function (n) {
      pcate[n].addEventListener('touchstart', function (e) {
        e.stopPropagation();
        pcate[n].setAttribute('style', 'transform: scale3d(.97, .97, .97)');
      });
      pcate[n].addEventListener('touchend', function (e) {
        // setTimeout(function () {
        //   pcate[i].setAttribute('style', 'transform: initial');
        // }, 200);
        pcate[n].setAttribute('style', 'transform: initial');
      });
      pcate[n].addEventListener('touchmove', function (e) {
        setTimeout(function () {
          pcate[n].setAttribute('style', 'transform: initial');
        }, 200);
      });
    })(i);
  }
}

if (headerMenu.length) {
  for (let i = 0; i < headerMenu.length; i++) {
    (function (n) {
      headerMenu[n].addEventListener('touchstart', function (e) {
        e.stopPropagation();
        headerMenu[n].setAttribute('style', 'transform: scale3d(.97, .97, .97)');
      });
      headerMenu[n].addEventListener('touchend', function (e) {
        // setTimeout(function () {
        //   headerMenu[i].setAttribute('style', 'transform: initial');
        // }, 200);
        headerMenu[n].setAttribute('style', 'transform: initial');
      });
      headerMenu[n].addEventListener('touchmove', function (e) {
        setTimeout(function () {
          headerMenu[n].setAttribute('style', 'transform: initial');
        }, 200);
      });
    })(i);
  }
}