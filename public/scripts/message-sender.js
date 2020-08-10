/**
 * Send a POST request with payload synchronously.
 * 
 * @param {String} uri The URI to request.
 * @param {any} payload The payload of the request, which contains "text", which is the text message; "complexity", which indicates the delay and "error", which indicates if the response should be an error.
 * @param {(XMLHttpRequest) => void} success The success callback.
 * @param {(XMLHttpRequest) => void} failure The failure callback.
 */
function postRequestSync (uri, payload, success, failure) {
  post(uri, payload, success, failure, false);
}

/**
 * Send a POST request with payload asynchronously.
 * 
 * @param {String} uri The URI to request.
 * @param {any} payload The payload of the request, which contains "text", which is the text message; "complexity", which indicates the delay and "error", which indicates if the response should be an error.
 * @param {(XMLHttpRequest) => void} success The success callback.
 * @param {(XMLHttpRequest) => void} failure The failure callback.
 */
function postRequestAsync (uri, payload, success, failure) {
  post(uri, payload, success, failure, true);
}

function post(uri, payload, success, failure, isAsync) {
  // 1 create request
  // 1.1 create XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  // 1.2 set url, http method and sync/async configuration
  xhr.open('POST', uri, isAsync);
  // 1.3 set request header
  xhr.setRequestHeader('content-type', 'application/json');

  // 2. register success & failure callbacks to request object.
  // 2.1 register on `onload` callback.
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
      success({ responseText: xhr.responseText, statusText: xhr.statusText });
    } else {
      failure({ responseText: xhr.responseText, statusText: xhr.statusText });
    }
  }

  // 3 send request with payload
  xhr.send(JSON.stringify(payload));
}