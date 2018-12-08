function main() {
    var iframe = document.createElement('iframe');
  
    iframe.onload = function() {
      iframe.contentWindow.postMessage("handshake", 'http://localhost:8080/');
    };
  
    window.addEventListener('message', function(event) {
      if (event.origin === 'http://localhost:8080/') {
        window.parent.postMessage(event.data, parentOrigin);
      }
    }, false);
  
    iframe.src = '';
    iframe.style.width = "660px";
    iframe.style.height = "440px";
  
    document.body.appendChild(iframe);
  }
  
  var parentOrigin;
  
  window.addEventListener('message', function parentMessage(event) {
    if (event.data === 'greeting' && event.origin.match(/^https:\/\/\w+\.google\.com$/)) {
      window.removeEventListener('message', greetingHandler, false);
      parentOrigin = event.origin;
      main();
    }
  }, false);