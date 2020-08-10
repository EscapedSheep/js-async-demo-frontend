function postRequestSync () {
  // do nothing.
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
  post(uri, payload)
    .then(success)
    .catch(failure);
}

function post(uri, payload) {
  return new Promise((resolve, reject) => {
    // 1 create request
    // 1.1 create XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // 1.2 set url, http method and sync/async configuration
    xhr.open('POST', uri, true);
    // 1.3 set request header
    xhr.setRequestHeader('content-type', 'application/json');

    // 2. register success & failure callbacks to request object.
    // 2.1 register on `onload` callback.
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status <= 299) {
        resolve({ responseText: xhr.responseText, statusText: xhr.statusText });
      } else {
        const error = new Error(xhr.responseText);
        error.responseText = xhr.responseText;
        error.statusText = xhr.statusText;
        reject(error);
      }
    }

    // 3 send request with payload
    xhr.send(JSON.stringify(payload));
  });
}