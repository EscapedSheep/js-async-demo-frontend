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
async function postRequestAsync (uri, payload, success, failure) {
  try {
    const response = await post(uri, payload);
    success(response);
  } catch (e) {
    failure(e);
  }
}

async function post(uri, payload) {
  const options = { 
    method: 'POST',
    body: JSON.stringify(payload), 
    headers: { 'content-type': 'application/json' } 
  };

  const response = await fetch(uri, options);
  if (response.status >= 200 && response.status <= 299) {
    return { responseText: await response.text(), statusText: response.statusText };
  } else {
    const responseText = await response.text();
    const error = new Error(responseText);
    error.responseText = responseText;
    error.statusText = response.statusText;
    throw error;
  }
}