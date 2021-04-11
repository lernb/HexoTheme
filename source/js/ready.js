function $(readyObj) {
  ///兼容FF,Google
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false);
      readyObj();
    }, false)
  }
  //兼容IE
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == "complete") {
        document.detachEvent("onreadystatechange", arguments.callee);
        readyObj();
      }
    })
  }
  else if (document.lastChild == document.body) {
    readyObj();
  }
}

function test() {
  console.log('a');
}
$(function () {
  test();
})