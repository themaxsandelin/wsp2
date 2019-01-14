# 06. Final assignment
<img src="https://media.giphy.com/media/FLUkjdQ1u6COY/giphy.gif" alt="Doctor Who screams 'hashtags'!" width="600">

As a final assignment you are building a very simplified clone of the social network Twitter, but in API form! 🐦 The purpose of the assignment is to test you on all areas that we have covered in this course and for you to combine the different aspects of programming in a Node.js back-end to build a funtioning API that you then could easily plug a front-end app to.

## Requirements
- The API should be built upon Express and connected to a MySQL server with Sequelize.
- Make sure the app is as easy as possible to set up. This will affect your ability to get a higher grade than **E**. For example:
    - Write a thorough README.md describing the setup
    - Add scripts for database creation and synchronization
    - Add any necessary configuration files
- The requests that requires auth, should require Basic Auth with the credentials you get from registering a new account.
- All requests should either return the [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) 200 and a JSON string as the return body. If an error occurs the status code should be fitting to the error, and instead of a JSON string, a regular string should be returned.
- The project should be published on GitHub in it's own repository and the link should be emailed to me before the deadline.

## Routes
The API should have the following routes:
- `/register`
    - `POST`

        The route for registering a new account on the API. The fields that should be required are: `name`, `email`, `username`, `password`. Example request body:
        ```JSON
        {
            "name": "John Doe",
            "email": "john@apple.com",
            "username": "johndoe",
            "password": "Supersecret123!"
        }
        ```

        Returns on success:
        ```JSON
        {
            "success": true,
            "credentials": {
                "key": "",
                "secret": ""
            }
        }
        ```

- `/reset`
    - `POST` *(auth required)*

        The route for resetting the user's credentials in case they are compromised or lost. It does not require any body content for the request.

        Returns on success:
        ```JSON
        {
            "success": true,
            "credentials": {
                "key": "",
                "secret": ""
            }
        }
        ```

- `/post`
    - `POST` *(auth required)*

        The route for creating a new post for the user that is signed in. The route should require the parameter `content` in the request body. Example request body:
        ```JSON
        {
            "content": "Hello, world"
        }
        ```

        Returns on success:
        ```JSON
        {
            "success": true,
            "post": {
                "uuid": "o12ok3p1o2k31o2k3p1n2i3on12oi3n",
                "content": "Hello, world",
                "created": "1547479608"
            }
        }
        ```

- `/[username]`
    - `GET`

        Should list basic information about the user based on the username requested. If the user does not exist, it should return a fitting HTTP status code as well as a fitting text as the error message. If the user does exist, it should return the parameters `name`, `joined` (date user joined), `posts` (number of posts). Example return body:
        ```JSON
        {
            "name": "John Doe",
            "posts": 1337,
            "joined": "2017-04-20T11:32:00.000-04:00"
        }
        ```

- `/[username]/posts`
    - `GET`

        Should list all posts from the user tied to the username used in the request URI.

        Return example on success:
        ```JSON
        [
            {
                "uuid": "jo1i2j3o1i2j3oi1j23",
                "content": "Hello, world!",
                "created": "2017-04-20T11:32:00.000-04:00",
                "author": {
                    "name": "John Doe",
                    "username": "johndoe"
                }
            },
            {
                "uuid": "ok1j2io3joi1j23oin124",
                "content": "Good evening, world!",
                "created": "2017-04-20T11:32:00.000-04:00",
                "author": {
                    "name": "John Doe",
                    "username": "johndoe"
                }
            },
            {
                "uuid": "uh34i53h45iu2iuh34",
                "content": "Good night, world!",
                "created": "2017-04-20T11:32:00.000-04:00",
                "author": {
                    "name": "John Doe",
                    "username": "johndoe"
                }
            }
        ]
        ```

- `/[username]/posts/[uuid]`
    - `GET`

        The route to show one specific posts of a certain user based on the uuid of the post, and the username of the user who created the post. It should return the same paramters as the `/[username]/posts` route, except of course only for one post, the one tied to the `uuid` in the request URI.

        If either the `username` or the `uuid` parameters do not exist or are invalid, the API should return a fitting HTTP status code, and a fitting text string as the error message. If everything is okay and the post is found, this is an example of what the result body would look like:
        ```JSON
        {
            "content": "Good night, world!",
            "created": "2017-04-20T11:32:00.000-04:00",
            "author": {
                "name": "John Doe",
                "username": "johndoe"
            }
        }
        ```

    - `DELETE` *(auth required)*

        Should delete the post tied to the `uuid` in the request URI. Of course, only the author of the post should be able to delete his/her own post, and nobody else. Therefor the authentication is very important here.

        If the post or user doesn't exist, or if the authentication doesn't match the author, the route should return a fitting status code, as well as a fitting error message.

        Returns on success:
        ```JSON
        {
            "success": true
        }
        ```
