# 00. Getting started
<img src="https://camo.githubusercontent.com/757fdafbb598bd16131153314bf2f35967dffd12/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f336f6875417856304466634c5478566836772f67697068792e676966" alt="Much to learn you still have.">

Hello, and welcome to the beautiful world of Node.js. In this lesson we will go through the basics of Node and how you can get up and running and start hacking on your own. 👨‍💻

## Assignments

-
    [Download and install](https://nodejs.org/en/download/current/) the latest version of Node.js (not LTS). Once you've installed it, make sure you can type the following command and get the version number as an output in your terminal window:
    ```bash
    $ node -v
    ```

-
    Type the `node` command in terminal to start a new Node instance and write your first Node script. Write your first `Hello, world!` script using the `console.log` method:
    ```bash
    $ node
    > console.log('Hello, world!')
    ```

-
    Time to write and run your first server-side JavaScript file. You can make the file do whatever you want, but a simple example is to move the `console.log('Hello, world!')` script above into the file. Then run the `node` command together with the name of your JavaScript file. Ex:
    ```bash
    $ node hello-world.js
    ```


## Extra

-
    Uninstall Node.js from your computer. Here are links on how to remove it from [macOS](https://stackoverflow.com/a/11178106), [Windows](https://blog.teamtreehouse.com/install-node-js-npm-windows) and [Ubuntu](https://askubuntu.com/a/786019).

    Once you've completely removed Node, download and install [nvm (Node Version Manager)](https://github.com/creationix/nvm). Then use the `nvm` command to install two different versions (ex. `v11.6.0` and `v9.0.0`) of Node.js. Ex:
    ```bash
    $ nvm install 11.6.0
    $ nvm install 9.0.0
    ```

    Then try switching between the two versions and running the JavaScript file you created in the previous assignment in each version respectively. Ex:
    ```bash
    $ nvm use 11.6.0
    $ node hello-world.js

    $ nvm use 9.0.0
    $ node hello-world.js
    ```