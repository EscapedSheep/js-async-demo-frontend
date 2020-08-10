/**
 * Send a POST request with payload synchronously.
 * 
 * @param {String} uri The URI to request.
 * @param {any} payload The payload of the request, which contains "text", which is the text message; "complexity", which indicates the delay and "error", which indicates if the response should be an error.
 * @param {(XMLHttpRequest) => void} success The success callback.
 * @param {(XMLHttpRequest) => void} failure The failure callback.
 */
function postRequestSync (uri, payload, success, failure) {
  success({ responseText: JSON.stringify(payload) });
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
  success({ responseText: JSON.stringify(payload) });
}