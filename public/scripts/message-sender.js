function postRequestSync (uri, payload, success, failure) {
  success({ responseText: "{\"text\": \"How are you!\"}" });
}

function postRequestAsync (uri, payload, success, failure) {
  success({ responseText: "{\"text\": \"How are you - From Async Version!\"}" });
}