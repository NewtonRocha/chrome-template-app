import 'babel-polyfill';
import appId from './inboxsdk-app-id';

InboxSDK.load('1.0', appId).then(sdk => {

  sdk.Compose.registerComposeViewHandler(function (composeView) {

    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "My Template Button!",
      iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
      onClick: function (e) {
        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
          var iframe = document.createElement('iframe');
          iframe.onload = function() {
            iframe.contentWindow.postMessage("greeting", "*");
          };
          function modalMessageHandler(event) {
            if (event.origin.match(/^chrome-extension:\/\//)) {
              if (event.data === 'close') {
                modal.close();
              } else {
                e.composeView.insertTextIntoBodyAtCursor(event.data);
              }
            }
          }
          window.addEventListener('message', modalMessageHandler, false);

          iframe.src = chrome.runtime.getURL('iframe.html');
          
          document.body.appendChild(iframe);
        }
      },
    });

  });
});
