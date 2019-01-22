# 03. Middleware & Modules
<img src="https://media.giphy.com/media/8vtv7AmxLzjLXp19Ds/giphy.gif" width="600">

In this lesson we are going to learn how to build our very own JavaScript modules in Node, how to use middleware in our Express app(s) and finally how to authenticate a request using the authorization header.

## Assignments

1.
    Write your very first Node.js module that exposes a function that when run, accepts a string as a single argument and outputs `Hello, <string>!`. As an example, if your module file name is `hello.js`, this is how I should be able to use it:
    ```javascript
    const hello = require('/path/to/hello.js')

    hello('Max') // Outputs: Hello, Max!
    hello('Jonas') // Outputs: Hello, Jonas!
    ```

2.
    Build out your module to export two functions instead of one, and those should be `hello` and `goodbye` which both do pretty much the same thing. They both take only 1 argument, a `String`, and outputs a message with that argument. Finally, try using them by including the functions *directly* using the curly brackets `{}` in your require. For example, if your module file name is `methods.js`, this is how I should be able to use it:
    ```javascript
    const { hello, goodbye } = require('/path/to/methods.js')

    hello('Max') // Outputs: Hello, Max!
    goodbye('Jonas') // Outputs: Goodbye, Jonas!
    ```

    > Hint: export an object, not just a function.

3.
    Set up a basic Express server



## Extra

## Resources

- [Modules](https://nodejs.org/api/modules.html) - Node.js
- [Module Exports](https://stackify.com/node-js-module-exports/) - Stackify
- [Using middleware](https://expressjs.com/en/guide/using-middleware.html) - Express
- [body-parser](https://github.com/expressjs/body-parser) - body-parser repository
- [Basic authantication](https://en.wikipedia.org/wiki/Basic_access_authentication) - Wikipedia
- [Base64](https://en.wikipedia.org/wiki/Base64) - Wikipedia
- [Base64 in Node.js](https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/) - Stack Abuse