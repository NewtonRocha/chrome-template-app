function main() {
    var iframe = document.createElement('iframe');
  
    iframe.onload = function() {
      iframe.contentWindow.postMessage("greeting", '*');
    };
  
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://chrometemplateapp.herokuapp.com') {
        window.parent.postMessage(event.data, parentOrigin);
      }
    }, false);
  
    iframe.src = 'https://chrometemplateapp.herokuapp.com/';
    iframe.style.width = "400px";
    iframe.style.height = "440px";
    iframe.style.overflow = 'hidden';
    iframe.scrolling="no"
    iframe.frameBorder="0"
  
    document.body.appendChild(iframe);
  }
  
  var parentOrigin;
  
  window.addEventListener('message', function parentMessage(event) {
    if (event.data === 'greeting' && event.origin.match(/^https:\/\/\w+\.google\.com$/)) {
      window.removeEventListener('message', parentMessage, false);
      parentOrigin = event.origin;
      main();
    }
  }, false);