function _(cName) {
  return document.getElementsByClassName(cName);
}
const pre = document.getElementsByTagName('pre'),
  headings = _('post-text')[0].querySelectorAll('h2, h3, h4'),
  menuTitle = _('post-title-menu')[0] ? _('post-title-menu')[0] : null,
  noteUl = _('noteUl'),
  noteActive = _('noteActive')[0],
  postHBanner = _('post-h-banner')[0];
let h2Flag = false,
  timer;

if (headings.length && menuTitle) {
  // 生成文章目录
  for (let i = 0; i < headings.length; i++) {
    let hTitleText,
      hTitleTextNode,
      offsetTop,
      postScroll,
      hTitleLi = document.createElement('li'),
      hTitleHref = document.createElement('a');
    hTitleText = headings[i].innerText;
    hTitleTextNode = document.createTextNode(hTitleText);
    postScroll = document.body.scrollTop + document.documentElement.scrollTop;
    offsetTop = headings[i].offsetTop - postScroll;
    if (headings[i].tagName == 'H2') {
      hTitleHref.setAttribute('class', `m-hTitle h2Title h-${i}`);
    } else if (headings[i].tagName == 'H3') {
      hTitleHref.setAttribute('class', `m-hTitle h3Title h-${i}`);
    } else if (headings[i].tagName == 'H4') {
      hTitleHref.setAttribute('class', `m-hTitle h4Title h-${i}`);
    }

    hTitleHref.appendChild(hTitleTextNode);
    hTitleLi.appendChild(hTitleHref);
    menuTitle.appendChild(hTitleLi);

    // 目录点击
    _(`h-${i}`)[0].addEventListener('click', function () {
      postScroll = document.body.scrollTop + document.documentElement.scrollTop;
      offsetTop = headings[i].offsetTop - postScroll;
      if (offsetTop != 68) {
        if (offsetTop > 68) {
          window.scrollBy({
            top: offsetTop - 68,
            behavior: "smooth"
          });
        } else if (offsetTop < 68) {
          window.scrollBy({
            top: offsetTop - 68,
            behavior: "smooth"
          });
        }
      }
    });
  }

  // 目录文章滚动跟随
  window.addEventListener('scroll', debounce(function () {
    let postScroll = document.body.scrollTop + document.documentElement.scrollTop;
    for (let i = 0; i < headings.length; i++) {
      let headingsOffsetTop = headings[i].offsetTop - postScroll,
        headingsOffsetTop2;
      if (headingsOffsetTop <= 285 && i < headings.length - 1) {
        headingsOffsetTop2 = headings[i + 1].offsetTop - postScroll;
        if (headingsOffsetTop2 <= 285) {
          _(`h-${i}`)[0].style = '';
        } else {
          _(`h-${i}`)[0].style = 'color: #18a0db; background-color: rgb(235, 237, 239)';
        }
      } else if (headingsOffsetTop <= 285 && i == headings.length - 1) {
        _(`h-${i}`)[0].style = 'color: #18a0db; background-color: rgb(235, 237, 239)';
      } else {
        _(`h-${i}`)[0].style = '';
      }
    }
  }, 100));

  // 目录固定
  const ptmf = _('post-title-menu-flag')[0];
  let toTop = document.getElementById('toTop'),
    scrolled = ptmf.offsetTop - 78,
    postScroll = document.body.scrollTop + document.documentElement.scrollTop,
    offsetTop = ptmf.offsetTop - postScroll,
    flag = true;
  if (offsetTop <= 68) {
    ptmf.setAttribute('style', 'position: fixed; box-sizing: border-box; top: 68px; width: 320px; margin-bottom: 0;');
    toTop.style.right = '15px';
  }
  window.addEventListener('scroll', function () {
    postScroll = document.body.scrollTop + document.documentElement.scrollTop;
    if (postScroll < scrolled) {
      flag = true;
    }
    if (flag) {
      if (postScroll >= scrolled) {
        ptmf.setAttribute('style', 'position: fixed; box-sizing: border-box; top: 68px; width: 300px; margin-bottom: 0;');
        toTop.style.right = '15px';
        flag = false;
      } else {
        ptmf.setAttribute('style', 'position: initial; top: initial;');
        toTop.style.right = '-50px';
      }
      toTop.addEventListener('click', function () {
        window.scrollBy({
          top: -postScroll,
          behavior: "smooth"
        });
      });
    }
  });
} else if (!headings.length && menuTitle) {
  let pNoTitle = document.createElement('p'),
    noTitle;
  pNoTitle.style.fontWeight = "bold";
  pNoTitle.style.cursor = "default";
  noTitle = document.createTextNode('无标题');
  pNoTitle.appendChild(noTitle);
  menuTitle.appendChild(pNoTitle);
}

// if (pre.length) {
//   for (let i = 0; i < pre.length; i++) {
//     let preHeight = pre[i].currentStyle ? pre[i].currentStyle.height : window.getComputedStyle(pre[i], null).height;
//     if (preHeight.match(/\d+/g)[0] > 700) {
//       pre[i].style.height = '700px';
//     }
//   }
// }

// 防抖处理
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  }
}

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
          noteUl[j].offsetWidth = noteUl[j].offsetWidth;//触发重绘
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