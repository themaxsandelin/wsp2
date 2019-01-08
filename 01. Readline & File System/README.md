# 01. Readline & File System
<img src="https://camo.githubusercontent.com/ec69f3fe6db811a5c714b4cf0de60d52aec00c1b/68747470733a2f2f692e67697068792e636f6d2f6d656469612f4c706b42415544673533464938784c6d67312f67697068792e77656270" alt="Here we go."><br>

All right let's write our first application (that doesn't just say `"Hello, world!"`). In this lesson we'll be using the [Readline](https://nodejs.org/docs/latest/api/readline.html) and [File System](https://nodejs.org/docs/latest/api/fs.html) modules and learn how to take user input and store it in the file system.

## Assignments

-
    Create a new file for the assignment and write a simple script that uses the [Readline](https://nodejs.org/docs/latest/api/readline.html) module to ask the user for their name. Then write back to the user a message, either with or without the name they typed. Ex:
    ```bash
    $ node input.js
    Enter your name: Max

    Hello, Max!
    ```

-
    Time to extend this a little, this time we'll add in 2 more questions, one for age and one for height in centimeters. It should look something like this:
    ```bash
    $ node input.js
    Enter your name: Max
    Enter your age: 23
    Enter your height(cm): 198

    Hello, Max! You are 23 years old and 198cm tall. 😎
    ```

-
    Now you're going to store the input we get from the user in a file in JSON format using the [File System](https://nodejs.org/docs/latest/api/fs.html) module. You should not overwrite the old contents of the file, but instead add to the contents each time someone runs the script. Nothing special about this assignment really, just make sure each input instance is saved in the JSON file.

-
    Now it's time to list out the input you've received in your script. Create a new file called for example `list.js` that reads from your JSON file and lists each individual input instance in the order they were stored. Ex output:
    ```bash
    $ node list.js

    People who used the script:

    Name: Max
    Age: 23
    Height: 198cm

    Name: Vincent
    Age: 25
    Height: 181cm

    Name: Martina
    Age: 19
    Height: 178cm
    ```

## Extra

-
    Add the ability to specify the number of input items you want to list when you run your `list.js` script using an "argument". Use the [process.argv](https://nodejs.org/docs/latest/api/process.html#process_process_argv) to find the argument used when the script file is run. Ex:
    ```bash
    $ node list.js 2

    People who used the script:

    Name: Max
    Age: 23
    Height: 198cm

    Name: Vincent
    Age: 25
    Height: 181cm
    ```

-
    Add another argument for the properties you want to output from each input instance. The argument needs to be able to take either 1 or all 3 properties, and you should be able to write either capitalized (Name) or all lowercase (name). Ex:
    ```bash
    $ node list 2 name Age (or)
    $ node list 2 NAME age (or)
    $ node list 2 name age

    People who used the script:

    Name: Max
    Age: 23

    Name: Vincent
    Age: 25
    ```