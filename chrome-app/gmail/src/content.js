import 'babel-polyfill';
import appId from './inboxsdk-app-id';

InboxSDK.load('1.0', appId).then(sdk => {

  sdk.Compose.registerComposeViewHandler(function (composeView) {

    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "My Template Button!",
      iconUrl: 'https://cdn3.iconfinder.com/data/icons/social-media-stitches/32/social_media_online_email-512.png',
      onClick: function (e) {
        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
          var iframe = document.createElement('iframe');
          iframe.onload = function () {
            iframe.contentWindow.postMessage("greeting", "*");
          };
          function modalMessageHandler(event) {
            if (event.origin.match(/^chrome-extension:\/\//)) {
              if (event.data === 'close') {
                modal.close();
              } else {
                e.composeView.setBodyHTML(event.data);
              }
            }
          }
          window.addEventListener('message', modalMessageHandler, false);

          iframe.src = chrome.runtime.getURL('iframe.html');
          iframe.style.width = "400px";
          iframe.style.height = "440px";
          iframe.style.overflow = 'hidden';
          iframe.scrolling="no"
          iframe.frameBorder = "0"
          // iframe.style.cssText = "height:200px;left:93.725px;position:absolute;top:192px;visibility:visible;width:262px;z-index:11;" 

          var modal = sdk.Widgets.showModalView({
            el: iframe
          });

          modal.on('destroy', function () {
            window.removeEventListener('message', modalMessageHandler, false);
          });
        }
      },
    });

  });
});
