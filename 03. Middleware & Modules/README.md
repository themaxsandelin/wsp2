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
    Set up a [basic Express server](https://github.com/themaxsandelin/wsp2/blob/master/03.%20Middleware%20%26%20Modules/examples/express.js), install and require the [body-parser](https://github.com/expressjs/body-parser) middleware module and set your server to use both the `.urlencoded({ extended: true })` and `.json()`. That way your server can handle both `form` and `JSON` requests no problem. To verify that everything is working, set up a simple `POST` route and output the request body to the console. Ex:
    ```javascript
    app.post('/form', (req, res) => {
      console.log(req.body)
    })
    ```
    Then use [Postman](https://getpostman.com) to send a `POST` request with JSON formatted body content to the new route you just created and verify that the console outputs the contents as expected.
    Finally do the same thing with an HTML Form. Create a simple HTML form that uses POST as the method and your server's route as the action with some simple fields inside and a submit button. And then once you submit the form, verify that the form data is shown in your console. HTML form example:
    ```HTML
    <form action="http://localhost:1337/form" method="POST">
        <input type="text" name="name" placeholder="Your name...">
        <input type="email" name="email" placeholder="Your email...">
        <input type="submit" value="Send it!">
    </form>
    ```

4.
    Build your very own middleware for your server that simply outputs whatever request is made to your server to the console with some basic information. The output should include the request source's [IP Address](https://stackoverflow.com/a/10849772), the [request method](https://stackoverflow.com/a/11176846) (GET, POST etc.) and the [request route](https://stackoverflow.com/a/12527220). The expected output in your console when someone is sending requests to your server should look something like this:
    ```bash
    GET /form 192.168.241.101
    POST /form 192.168.241.200
    POST /somthn 192.168.0.19
    ```
    > The routes and IP addresses are made up. Whatever output you get from the correct method of retrieving the path and IP address will be correct.

5.
    Write a new middlware for your server that checks for the `authorization` header in the request. If the header is not set, the server should respond with the appropriate [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) followed by the error text `Unauthorized`. If the value exists, it should be using the `Bearer` method followed by a key you have made up. You can hard code the key in your code, as long as you check that the value for the `authorization` header is what you expect. For example, if your code is `SuperZecretCode1337`, then the value of the `authorization` header should be `Bearer SuperZecretCode1337`.

    If the value is correct, then the request should proceed as expected. If the value is incorrect, you should return the same result as you do when the `authorization` header is completely missing.

## Extra

6.
    Upgrade your authorization middleware to only support [Basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication), meaning a username and password, [Base64 encoded](https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/) and set as the value for the `authorization` header. For now you can hard code the correct username and password in your code, as long as the check works when someone sends a request.

7.
    Create 3 GET random routes that all return some form of JSON data (can be anything). These will be your super secret routes that require authentication. Then move these routes into their own `.js` file as a module and use the `Router()` from Express.js both when defining the routes and exporting the module. Then move your authorization middleware from using it on your whole server, to just these specific routes. Then finally, add the routes to your server.

    Server example code:
    ```javascript
    const express = require('express')
    const app = express()
    app.use(require('./secret-routes.js'))
    app.listen(1337, () => {
      console.log('Server up and running!')
    })

    app.get('/', (req, res) => {
      res.send('Hello, world!')
    })
    ```

    Secret route example code (secret-routes.js):
    ```javascript
    const router = require('express').Router()
    router.use(require('./auth-middleware.js'))

    router.get('/secret', (req, res) => {
      res.json({ secretStuff: 'Mhmm.' })
    })

    module.exports = router
    ```

8.
    Add a new POST route called `/register` that accepts a `username` and `password` parameter and then stores those values together in an object in a JSON file. The JSON file can be named anything you want, but an example of a good name would be `credentials.json` and consist of an `Array` of the objects you receive in the requests to this new POST route. **Make sure both values are present in the request, and that the username is unique.** If the request isn't correct (missing values, using an existing username), return the appropriate HTTP status code together with an appropriate error message. But if everything went well, return:
    ```json
    {
        "success": true
    }
    ```

    Then upgrade your authorization middleware to check the values from the `authorization` header to match any of the pairs in your JSON file instead of any hard coded values. (Note: The `/register` route should accept requests without authorization.)

8.


## Resources

- [Modules](https://nodejs.org/api/modules.html) - Node.js
- [Module Exports](https://stackify.com/node-js-module-exports/) - Stackify
- [Using middleware](https://expressjs.com/en/guide/using-middleware.html) - Express
- [body-parser](https://github.com/expressjs/body-parser) - body-parser repository
- [Basic authantication](https://en.wikipedia.org/wiki/Basic_access_authentication) - Wikipedia
- [Base64](https://en.wikipedia.org/wiki/Base64) - Wikipedia
- [Base64 in Node.js](https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/) - Stack Abuse