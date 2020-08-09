function sendMessageAndWait (message, success, failure) {
  success('Response of ' + message);
}

function sendMessageAsync (message, success, failure) {
  failure('Response of ' + message);
}