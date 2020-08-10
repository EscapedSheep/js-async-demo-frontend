## How to use it

This repository is the frontend part of the JavaScript asynchronous demo. In order to run it correctly, you must start both backend server and frontend. To start frontend website, please run the following command:

```bash
$ npm install
$ npm start
```

You can replace `npm` to `cnpm` if you find it difficult to download packages from default npm respository.

You can then open the browser and access `http://localhost:4444`.

## Sample Branches

* master: Empty implementation. You can practice on this branch.
* xml-http-demo: Sending request using `XMLHttpRequest`.
* promise-demo: Wrapping `XMLHttpRequest` with `Promise`.
* promise-with-fetch-demo: Sending request using `fetch` API.
* async-await-demo: Sending request using `fetch` and `Promise`.