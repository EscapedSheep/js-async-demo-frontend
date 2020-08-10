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
  const options = { 
    method: 'POST',
    body: JSON.stringify(payload), 
    headers: { 'content-type': 'application/json' } 
  };
  return fetch(uri, options)
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        // Note: response.text() returns a Promise.
        return response.text()
          .then(responseText => ({responseText, statusText: response.statusText}));
      } else {
        return response.text()
          .then(responseText => {
            // Note: if you want to reject. Just throw the error in the callback function.
            const error = new Error(responseText);
            error.responseText = responseText;
            error.statusText = response.statusText;
            throw error;
          });
      }
    });
}