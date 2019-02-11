# 04. Promises & Sequelize
<img src="https://media.giphy.com/media/VIbnEWQS9y7Wo/giphy.gif" alt="Cross my hearts" width="600">

I dagens lektion tar vi en titt på ett relativt nytt koncept i JavaScript, [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), en ny typ av asynkron operation som lovar ett resultat som antingen kan vara ett "uppföljt" (`resolve`) löfte, eller ett "avvisat" (`reject`) löfte. Vi gräver oss även ner i vad som kallas ORM, vilket står för "objekt-relationell mappning" (object-relational mapping), och använder oss av ett ORM ramverk i Node.js som kallas [Sequelize](http://docs.sequelizejs.com/).

Instructional video (in Swedish) based on our live lesson: [YouTube video](https://www.youtube.com/watch?v=G9Xk0MXNIs4)

## Uppgifter

1.
    Nedan hittar du funktionen `calc()`, en superenkel funktion som adderar två värden och returnerar resultatet. Problemet med funktionen är att den är beroende av en `setTimeout` som tar totalt 1 sekund att köra, vilket gör att om du kör funktionen som vanligt (`const val = calc(1, 2)`) så blir resultatet `undefined`.

    ```javascript
    function calc(num1, num2) {
        setTimeout(() => {
            return num1 + num2
        }, 1000)
    }
    ```

    Skriv om funktionen så att den returnerar ett [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), utan att ta bort setTimeout och istället för att returnera resultatet så skickas det med i `resolve`. När du är klar skall det gå att skriva följande för att köra funktionen:

    ```javascript
    calc(1, 2).then(result => {
        console.log('1 + 2 = ' + result)
    })
    ```

2.
    Ladda ner mappen `server`, som du hittar i `examples` mappen i dagens lektions mapp. Detta är en enkel `Express` server med två routes (`/` och `/:author`) som baseras på en enkel `books.json` med författare och böcker. Glöm inte när du laddat ner den att köra `npm install` innuti mappen innan du försöker köra `index.js`. När du väl har servern igång och testat så att allt funkar skall du bygga en enkel funktion som skall hämta böckerna baserat på vilken författare man skriver in. Funktionen borde heta något i stil med `getBooksByAuthor()` och när funktionen väl är klar och funkar borde du kunna skriva som följande för att få ut böckerna från en viss författare:

    ```javascript
    getBooksByAuthor('J. K. Rowling').then(books => {
        console.log('J. K. Rowling has written the following books:')
        console.log(books)
    })
    ```

    > Tips: Använd [request](https://www.npmjs.com/package/request) modulen från npm för att skicka GET, POST etc. förfrågningar till en viss resurs.

3.
    Bygg vidare på server-koden du laddade ner i förra uppgiften och bygg upp en databas-koppling med [Sequelize](http://docs.sequelizejs.com/). Kom ihåg att du kan sätta `operatorsAliases: false` och `logging: () => {}` för att slippa onödig output i konsollen när du kör ditt script. När du väl har en fungerande databaskoppling, skapar du din första databasmodell ([Your first model](http://docs.sequelizejs.com/manual/installation/getting-started.html#your-first-model)) som skall vara `Author`. Modellen borde ha en `id` kolumn som är av typen `INTEGER` och har `primaryKey: true`, `autoIncrement: true` samt `allowNull: false` och även en `name` kolumn som är av typen `STRING` och har `allowNull: false`. Se sedan till att din databas synkroniseras (ej `force: true`) och se så att din modell dyker upp som en tabell i din databas.

4.
    Om du inte redan gjort det, lyft ut din databas logik från server-koden till sin egen fil, rimligtvis med namnet `database.js`. Denna skall alltså innehålla din databasuppkoppling och dina modeller. Till sist skall den exportera dina modeller i ett `Object` som gör att du skall kunna göra en `require()` på din `database.js` enligt nedan, och enkelt kunna referera till dina modeller:

    ```javascript
    const models = require('./database.js')
    // Ex: models.Author
    ```

    När du väl gjort detta skapar du en till modell för böckerna som då rimligtvis kallas `Book`. Modellen borde ha en `id` kolumn som ser likadan ut som `Author` ser ut, och även en `title` kolumn som är av typen `STRING` och har `allowNull: false`.

    Sist, men inte minst, skall `Book` tillhöra en `Author`, så skapa en one-to-many relation (se [associations](http://docs.sequelizejs.com/manual/tutorial/associations.html)) mellan de. Var noga med att göra detta innan du kör din synkronisering av databasen. Notera även att du kan behöva köra en `synchronise({ force: true })` för att skriva över den gamla databas-strukturen. Du kan då enkelt köra scriptet en gång med `synchronise({ force: true })` och sedan ta bort `{force: true}` igen för att göra det enkelt för dig.

5.
    Nu när vi har en databas som reflekterar en struktur som liknar vår JSON-fil med böcker och författare skall vi flytta över vår data från JSON filen till databasen. Detta gör du enklast manuellt. Så flytta först över alla författare via ex. PhpMyAdmin (manuellt skapa rader i tabellen), och gör sedan samma sak med böckerna och kolla då samtidigt upp vilket ID författaren har i databasen som skrivit boken så att du får rätt relation.

    När du väl har alla författare och böcker inne i databasen är det dags att uppdatera våra routes så de använder sig av vår databas istället för JSON filen. Så under root-routen (`get('/')`) så skall du hämta alla författare och returnera deras namn i en `Array`. Så i slutändan borde alltså `authors` som ni ser returneras på rad 15 i `index.js` vara en `Array` med namnen på alla författare i databasen.

    > Tips: Använd dig av modellen `Author` och kolla på funktionen [findAll](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findall-search-for-multiple-elements-in-the-database) för att hämta ut alla i en databas.

6.
    Dags att fixa den andra och sista routen i vår book-server så vi kan fråga efter böcker baserat på vilken författare vi frågar efter. Så, med hjälp av `:author` som hamnar i `req.params.author`, hämta den author vars namn matchar detta värde, och hämta sedan de böcker som tillhör den författaren. I slutändan skall alltså det som returneras vara en `Array` med namn på de böcker som författaren har skrivit enligt vad som finns i databasen.

    Se till att det finns felhantering för ifall någon frågar efter en författare som inte existerar i databasen. Då skall den returnera, precis som den gör nu, en 404 statuskod med felmeddelandet `Not found.`

    > Tips: gör en [findOne](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-find-search-for-one-specific-element-in-the-database) först på författaren med hjälp av namnet. Kör sedan en [findAll](http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findall-search-for-multiple-elements-in-the-database) på böckerna med hjälp av författarens egna ID.


## Resurser

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - Mozilla Developer Network
- [Sequelize - Getting Started](http://docs.sequelizejs.com/manual/installation/getting-started.html) - Sequelize
- [Sequelize - Model Defenition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html) - Sequelize
- [Sequelize - Data Types](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types) - Sequelize
- [Sequelize - Associations](http://docs.sequelizejs.com/manual/tutorial/associations.html) - Sequelize
- [Sequelize - Model Usage](http://docs.sequelizejs.com/manual/tutorial/models-usage.html) - Sequelize