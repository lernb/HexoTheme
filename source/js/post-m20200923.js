function _(cName) {
  return document.getElementsByClassName(cName);
}
const pre = document.getElementsByTagName('pre'),
  h2 = _('post')[0].getElementsByTagName('h2'),
  // h3 = _('post')[0].getElementsByTagName('h3'),
  headhead = document.getElementsByClassName('headhead')[0],
  table = document.getElementsByTagName('table'),
  noteBar = _('note-bar')[0],
  noteWrap = _('note-wrap')[0],
  noteUl = _('noteUl'),
  noteActive = _('noteActive')[0],
  noteBarBtn = _('note-bar-btn')[0],
  menuBtnCon = _('menu-btn-content')[0];
let downFlag = null, upFlag = null;

// for (let i = 0; i < pre.length; i++) {
//   let preHeight = pre[i].currentStyle ? pre[i].currentStyle.height : window.getComputedStyle(pre[i], null).height;
//   if (preHeight.match(/\d+/g)[0] > 550) {
//     pre[i].style.height = '550px';
//   }
// }

// for (let i = 0; i < h2.length; i++) {
//   let h2Pa = document.createElement('div');
//   h2Pa.setAttribute('class', 't-h');
//   h2Pa.setAttribute('style', 'margin: 35px 0 20px; border-bottom: 1px solid #eaeaea;');
//   h2[i].parentNode.insertBefore(h2Pa, h2[i].nextElementSibling);
//   h2Pa.appendChild(h2[i]);
// }

for (let i = 0; i < table.length; i++) {
  let tableWrap = document.createElement('div');
  tableWrap.setAttribute('class', 'table-wrap');
  table[i].parentNode.insertBefore(tableWrap, table[i]);
  tableWrap.appendChild(table[i]);
}

function getPageScroll() {
  let xScroll, yScroll;
  if (self.pageYOffset) {
    yScroll = self.pageYOffset;
    xScroll = self.pageXOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
    yScroll = document.documentElement.scrollTop;
    xScroll = document.documentElement.scrollLeft;
  } else if (document.body) {// all other Explorers
    yScroll = document.body.scrollTop;
    xScroll = document.body.scrollLeft;
  }
  arrayPageScroll = yScroll;
  return arrayPageScroll;
};

let scrollAction = { x: 'undefined', y: 'undefined' }, scrollDirection;
function scrollFunc() {
  if (typeof scrollAction.x == 'undefined') {
    scrollAction.x = window.pageXOffset;
    scrollAction.y = window.pageYOffset;
  }
  let diffX = scrollAction.x - window.pageXOffset,
    diffY = scrollAction.y - window.pageYOffset;
  if (diffX < 0) {
    // Scroll right
    scrollDirection = 'right';
  } else if (diffX > 0) {
    // Scroll left
    scrollDirection = 'left';
  } else if (diffY < 0) {
    // Scroll down
    scrollDirection = 'down';
  } else if (diffY > 0) {
    // Scroll up
    scrollDirection = 'up';
  } else {
    // First scroll event
  }
  scrollAction.x = window.pageXOffset;
  scrollAction.y = window.pageYOffset;
}

window.addEventListener('scroll', function () {
  scrollFunc(0);
  if (scrollDirection == 'down') {
    //页面向下滚动
    // console.log("页面向下滚动");
    // console.log(headhead);
    upFlag = null;
    if (downFlag == null) {
      downFlag = document.body.scrollTop + document.documentElement.scrollTop;
    }
    let pageScroll = document.body.scrollTop + document.documentElement.scrollTop,
      far = pageScroll - downFlag;
    if (far >= 100 && pageScroll >= 100) {
      headhead.setAttribute('style', 'position: fixed; top: -84px;');
      if (noteBar) {
        noteBar.style.paddingTop = '25px';
      }
    }
  }
  else if (scrollDirection == 'up') {
    //页面向上滚动
    // console.log("页面向上滚动");
    downFlag = null;
    if (upFlag == null) {
      upFlag = document.body.scrollTop + document.documentElement.scrollTop;
    }
    let pageScroll = document.body.scrollTop + document.documentElement.scrollTop,
      far = pageScroll - upFlag;
    if (far <= -100) {
      headhead.setAttribute('style', 'position: fixed; top: 0;');
      if (noteBar) {
        noteBar.style.paddingTop = '65px';
      }
    }
  }
});

if (noteUl.length) {
  for (let j = 0; j < noteUl.length; j++) {
    if (noteUl[j].firstElementChild) {
      let height = window.getComputedStyle(noteUl[j]).height,
        offsetHeight = noteUl[j].offsetHeight,
        targetHeight;
      noteUl[j].firstElementChild.onclick = function () {
        if (noteUl[j].offsetHeight > offsetHeight) {
          noteUl[j].style.height = height;
          noteUl[j].firstElementChild.className = 'h3T';
        } else {
          for (let i = 0; i < noteUl.length; i++) {
            noteUl[i].style.height = height;
            if (noteUl[i].firstElementChild) {
              noteUl[i].firstElementChild.className = 'h3T';
            }
          }
          noteUl[j].firstElementChild.className = 'h3T h3Tf';
          noteUl[j].style.height = 'auto';
          targetHeight = window.getComputedStyle(noteUl[j]).height;
          noteUl[j].style.height = height;
          noteUl[j].offsetWidth = noteUl[j].offsetWidth;
          noteUl[j].style.height = targetHeight;
        }
      }
    }
  }
  noteActive.parentNode.parentNode.style.height = 'auto';
  noteActive.parentNode.parentNode.firstElementChild.style.color = '#18a0db';
  noteActive.parentNode.parentNode.firstElementChild.className = 'h3T h3Tf';
  let targetHeight = window.getComputedStyle(noteActive.parentNode.parentNode).height;
  noteActive.parentNode.parentNode.style.height = targetHeight;
}

if (noteBar) {
  let windowHeight,
    isShow = true,
    showed,
    dclick;
  noteBar.addEventListener('click', function (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  });
  noteBarBtn.addEventListener('click', function (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
    windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (isShow) {
      showed = true;
      dclick = true;
      noteBar.setAttribute('style', `transform: scale3d(1, 1, 1); height: ${windowHeight}px;`);
      menuBtnCon.style.transform = 'rotateZ(0deg)';
      noteBarBtn.style.left = '60%';
      window.addEventListener('scroll', function () {
        if (showed) {
          windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          noteBar.style.height = windowHeight + 'px';
        }
      });
      isShow = false;
      noteWrap.addEventListener('click', function () {
        if (dclick) {
          showed = false;
          noteBar.setAttribute('style', `transform: scale3d(0, 0, 0); height: ${windowHeight}px;`);
          menuBtnCon.style.transform = 'rotateZ(-45deg)';
          noteBarBtn.style.left = '20px';
          isShow = true;
          dclick = false;
        }
      });
    } else {
      showed = false;
      dclick = false;
      noteBar.setAttribute('style', `transform: scale3d(0, 0, 0); height: ${windowHeight}px;`);
      menuBtnCon.style.transform = 'rotateZ(-45deg)';
      noteBarBtn.style.left = '20px';
      isShow = true;
    }
  });
}