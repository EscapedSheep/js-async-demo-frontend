(function(){
  function guessComplexity (message) {
    if (message.includes('not easy')) { return 2; }
    if (message.includes('easy')) { return 1; }
    if (message.includes('complex')) { return 3; }
    if (message.includes('difficult')) { return 4; }
    if (message.includes('hardcore')) { return 5; }
    if (message.includes('hell')) { return 6; }
    return 0;
  }

  function willReturnError (message) {
    return message.includes('error');
  }

  function createPayload(message) {
    return { text: message, complexity: guessComplexity(message), error: willReturnError(message) };
  }

  function extractResponseMessage (xhr) {
    if (xhr.responseText) {
      try {
        return JSON.parse(xhr.responseText).text;
      } catch (e) {
        return xhr.statusText;
      }
    }
    return xhr.statusText;
  }

  function sendMessageAndWait (message, success, failure) {
    postRequestSync(
      'http://localhost:3000/api/message', 
      createPayload(message),
      xhr => success(extractResponseMessage(xhr)),
      xhr => failure(extractResponseMessage(xhr))
    );
  }
  
  function sendMessageAsync (message, success, failure) {
    postRequestAsync(
      'http://localhost:3000/api/message', 
      createPayload(message),
      xhr => success(extractResponseMessage(xhr)),
      xhr => failure(extractResponseMessage(xhr))
    );
  }

  const chat = {
    init: function() {
      this.cacheDOM();
      this.bindEvents();
    },
    cacheDOM: function() {
      this.$chatHistory = $('.chat-history');
      this.$sendAndWait = $('#send-and-wait');
      this.$sendAsync = $('#send-async');
      this.$clearHistory = $('#clear-history');
      this.$textarea = $('#message-to-send');
      this.$chatHistoryList = this.$chatHistory.find('ul');
    },
    bindEvents: function() {
      this.$sendAndWait.on('click', function () { this.sendMessage({isSync: true }); }.bind(this));
      this.$sendAsync.on('click', function () { this.sendMessage({isSync: false }); }.bind(this));
      this.$clearHistory.on('click', function () { this.$chatHistoryList.empty(); }.bind(this));
    },
    sendMessage: function (options) {
      const message = this.$textarea.val()
      if (message.trim() === '') { return; }
      this.renderMessage(message, { isResponse: false });
      this.$textarea.val('');
      this.scrollToBottom();

      const sendFunc = options.isSync ? sendMessageAndWait : sendMessageAsync;
      sendFunc(
        message, 
        messageResponse => { this.renderMessage(messageResponse, { isResponse: true, isError: false }); },
        messageResponse => { this.renderMessage(messageResponse, { isResponse: true, isError: true }); });
    },
    renderMessage: function (message, options) {
      const templateId = options.isResponse ? (options.isError ? "#error-response-template" : "#message-response-template") : "#message-template";
      const template = Handlebars.compile($(templateId).html());
      const context = { 
        response: message,
        time: this.getCurrentTime()
      };
      this.$chatHistoryList.append(template(context));
      this.scrollToBottom();
    },
    scrollToBottom: function() {
       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
      return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function(arr) {
      return arr[Math.floor(Math.random()*arr.length)];
    }
  };

  chat.init();
})();
