# 02. HTTP & Express
<img src="https://media.giphy.com/media/uHbhiOYP7mduE/giphy.gif" alt="The Polar Express" width="600">

In this lesson we are taking a look at [NPM](https://npmjs.org) (Node Package Manager) and install our first module. We're going to learn about the HTTP protocol, the different [request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) that exist and [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). We're going to look at what [CRUD](https://www.codecademy.com/articles/what-is-crud) and [REST](https://www.codecademy.com/articles/what-is-rest) is, and what the differences are between the two. Finally we're going to build our very own web server and start working on an API using [Express](https://expressjs.com/).

## Assignments

1.
    Set up a new project folder and initialize it using the `npm init` command in the command prompt. Then create a JavaScript file called something like `hello.js` that simply outputs the text `Hello, world!` to the console. Then add a custom script called `hello` to the `package.json` file, that just runs the `hello.js` file in node. Now you should be able to run `npm run hello` while in the project folder in the command prompt.

2.
    Add support in your script for one argument that is the name of the user of your script. The user should be able to run your script, either directly in node `node hello.js Max` or with the npm script `npm run hello -- Max` and it should output `Hello, Max!`.

3.
    Create a new script and install the package [request](https://www.npmjs.com/package/request). Use the package to send a `GET` request to the API I created for schedule data and list out all schools in the database, using the school endpoint: https://data.gradee.io/schools. Your script should simply output the name of the school, and a URL to that specific school. A school URL is simply the school endpoint + the school slug, example: https://data.gradee.io/schools/campus-molndal.

    This is what your output should look like:
    ```
    npm run schools

    These are the schools in the API:

    Almåsskolan
    https://data.gradee.io/schools/almasskolan

    Amhultsgården
    https://data.gradee.io/schools/amhultsgarden

    ...
    ```

4.
    Create a new script and install [express](https://www.npmjs.com/package/express). Set up a basic HTTP server that listens to any given port and exposes the root route with GET and returns the text `Hello, world!`.

5.
    Download the [books.json](https://raw.githubusercontent.com/themaxsandelin/wsp2/master/02.%20HTTP%20%26%20Express/examples/books.json) example file and place it in the same folder as your current express script. Then add a new GET route called `/books` that will read the `books.json` file and list all the books within the file.

6.
    Add a new POST route called `/books` that accepts two parameters, `title` and `author`. As long as both parameters have a value, it should add a new book in the form of an object to the list of books in the `books.json` file. When visiting the GET route `/books`, the new book should show up.

    > I wrote this assignment without realising we will be going through middlewares in the next lesson. So you'll have to do some of your own research.

    Use the [body-parser](https://www.npmjs.com/package/body-parser) middleware for Express and include it in your script. Then use the JSON method to parse the body as JSON. Example:

    ```javascript
    const express = require('express')
    const bodyParser = require('body-parser')

    const app = express()
    app.use(bodyParser.json())
    ```

    If any value or parameter is missing, please use a proper [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to describe the error and return an error message in `String` format.

    If the request was successful, return a JSON string as a body with the contents:
    ```JSON
    {
        "success": true
    }
    ```

## Extra

7.
    Update your POST route (`/books`) to generate a random String á 32 characters long to act as an ID for each book, and add it to the object before storing it to the `books.json` file. Either update the old books by adding a random String of 32 characters as the property `id`, or empty the file and fill it with new books once you've update your code.

    Then add a new GET route (`/books/[id]`) that takes the book ID as a query parameter. This route should only return the book that matches the given ID as an `Object`. If the ID does not match any given book, you should return a fitting [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), and an error message in `String` format.

8.
    Update the GET route `/books` to look for the GET variable `author` (ex: `http://localhost:8080/books?author=Ernest%20Cline`). If `author` is set in the request, the code should filter the books based on if the value of `author` matches the name of the author of a given book. If no books are found with an author that matches that value, return an empty Array. And if there are any books who's author does match the value, only return those.

9.
    Do the same thing as assignment 8, but with a new GET variable called `title`. This should work the same way but for the title of the book. You should now be able to search for both or either `author` and `title`, and get the books that match the search result.

## Resources

- [About npm](https://www.npmjs.com/about) - npm
- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - MDN
- [What is CRUD?](https://www.codecademy.com/articles/what-is-crud) - Codecademy
- [What is REST?](https://www.codecademy.com/articles/what-is-rest) - Codecademy
- [Express](https://expressjs.com/) - ExpressJS