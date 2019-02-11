# 05. MVC & Auth
<img src="https://media.giphy.com/media/8aeHZ17vdkL72/giphy.gif" alt="You don't need to see our identification" width="600">

I dagens lektion skall vi knyta ihop säcken för kursen Node.js med en genomgång av MVC arkitektur och view engines i Express, samt hur ni implementerar en säker användar-autentisering med hjälp av [crypto](https://nodejs.org/api/crypto.html) modulen i Node.js.

## Uppgifter

1.
    Ladda ner `/server` foldern från samma repo som denna README fil och uppdatera `index.js` filen så att den serverar `/static` foldern med `express.static`. Så om du går in på `http://localhost:3000/` border `index.html` laddas in. Och om du går till någon av `cat1.jpg` eller `cat2.jpg` bilderna så visas bilderna.

2.
    Bygg vidare på din Express server och använd Handlebars som template engine istället. Installera [express-handlebars](https://github.com/ericf/express-handlebars), lägg in den som en template engine i din server, och lägg upp en default layout och en template fil. Lägg sedan in så att din server har en GET route på root (`/`) som renderar din template fil. Skicka in två properties, en `title` och en `paragraph` som du sedan skriver ut i din template fil som en `<h1></h1>` och en `<p></p>`.

3.
    Ladda ner `/books` foldern från samma repo som denna README fil. För att få det att funka måste du först och främst ha en MySQL server igång och en ny databas skapad. Gå sedan in i `database.js` och kolla så att följande är rätt konfigurerat:

    ```javascript
    const connection = new Sequelize(/*database name: */'books', /* username: */'root', /* password: */'root', {
        host: 'localhost',
        dialect: 'mysql',
        logging: () => {},
        operatorsAliases: false
    })
    ```

    Kolla sedan längst ner i `database.js` och kommentera av följande rader så de inte längre är utkommenterade:

    ```javascript
    // connection.sync({ force: true }).then(_ => {
    //   console.log('Database synchronized!')
    // })
    ```

    Kör nu `database.js` filen med node (`node database`), och du borde se texten `Database synchronized!` som output i din konsoll. När det är klart kan du stänga node processen (ctrl + c), gå tillbaka in i `database.js` och kommentera ut de raderna du precis fixade, som du ser ovan denna rad.

    Sist, men inte minst, måste du importera böckerna och författarna från `books.json`. Detta gör du genom att köra `import.js` scriptet (`node import`), vilket kommer kopiera böckerna och författarna från `books.json` filen in i din databas.

4.
    Nu när du har `/books` projektet uppsatt ska du byta ut output av både författare och böcker till att renderas av en template fil med hjälp av Handlebars. Gör som i uppgift 2 och installera [express-handlebars](https://github.com/ericf/express-handlebars) och lägg sedan in den som en template engine i din Express server. Skapa sedan en default layout och två views, en view för författare och en för böcker.

    Din view för författare borde bestå av en enkel `<ul>` där varje författare är en `<li>` med en `<a>` länk som länkar till dess egna sida som listar ut alla böcker som författaren har skrivit.

    Din view för böcker skall i sin tur innehålla en `<a>` länk som tar dig tillbaka till listan av författare, en `<h1>` med namnet på den författare vars böcker listas på sidan, samt en `<ul>` med varje bok som en `<li>` i listan (utan länk).

5.
    Bygg vidare på `/books` projektet (för enkelhetens skull) och skapa en ny modell i `database.js`. Modellen skall vara för användare `user`, som skall ha 4 kolumner:
    - `id`: Som innan, en `INTEGER` som inte får vara `null`, samt är primary key och auto increment.
    - `name`: En enkel `STRING` som inte får vara `null`
    - `username`: En `STRING` med begränsning till 80 karaktärer, som inte får vara `null` och måste vara ett unikt värde (hint: `unique`)
    - `password`: En `STRING` med en längd på `512` karaktärer, som inte får vara `null`
    - `salt`: En `STRING` med en längd på `512` karaktärer, som inte får vara `null`

    Skapa sedan en ny `POST` route i din `index.js` fil som skall hantera användarregistrering, som skall ta emot `JSON` data med de obligatoriska fälten `name`, `username` och `password`. Se till att dessa fält skickas med och att `username` inte är längre än **80 tecken**.

    Om allt är i sin ordning, skall du skapa en random sträng på 512 karaktärer med hjälp av [crypto](https://nodejs.org/api/crypto.html) modulen (hint: [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)) som skall vara användarens `salt`.

    Använd sedan denna `salt` för att hasha det lösenord användaren angav med hjälp av [crypto.pbkdf2sync](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest), och sätt iterationer till `10000` och använda `sha512` som digest.

    Spara sedan `name`, `username`, det hashade lösenordet och den genererade `salt` strängen som en ny användare i databasen.

    Om allt gick vägen skall du som vanligt skicka tillbaka en `{ success: true }`. Annars en passande HTTP status kod samt en text sträng som felmeddelande.

6.
    Skapa en ny route i `index.js` för `DELETE` requests som använder sig av en dynamisk parameter (ex: `/:username` <- username blir dynamisk parameter och hamnar under `req.params.username`). Denna skall hantera borttagningen av en användare och kommer kräva att man använder sig av `Basic auth` header där användarnamnet och lösenordet måste överensstämma med det som står på användaren i databasen.

    Om det inte gör det, skall man inte kunna ta bort användaren och därmed få en passande HTTP status kod och ett felmeddelande i text form.

    Om `authorization` header använder `Basic auth` och både användarnamnet och lösenordet matchar mot användaren i databasen, så skall den ta bort användaren och returnera, som vanligt, `{ success: true }`.

## Extrauppgifter

1.
    Separera dina modeller från `database.js`till sena egna `.js` filer som alla har samma namn som den modell de innehåller (ex. `User.js`innehåller `User` modellen). Använd sedan [sequelize.import](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import) för att importera modellerna från sina filer in i din databas.

2.
    Skapa en `/models` folder och flytta över dina modeller in i den mappen. Flytta sedan över din `database.js` in i samma mapp och döp om den till `index.js`. Utöka sedan din `index.js` (föredetta `database.js`) så att den läser av alla modell-filer som finns i mappen och lägger in dessa dynamiskt med hjälp av [sequelize.import](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import) (hint: [fs.readdirSync](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options)).

    > Tänk på att modellerna bör ha stor bokstav på sina namn i models objektet, så du bör nog namnge filerna med stor bokstav också för att undvika skriva kod som gör om namnet till stor bokstav. Det gör även att det blir lättare att urskilja modell-filerna från index.js.


## Resurser

- [express.static](https://expressjs.com/en/starter/static-files.html) - Express
- [express-handlebars](https://github.com/ericf/express-handlebars) - GitHub
- [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) - Wikipedia
- [MVC: Model, View, Controller](https://www.codecademy.com/articles/mvc) - Codecademy
- [crypto](https://nodejs.org/api/crypto.html) - Node.js
- [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) - Node.js
- [crypto.pbkdf2sync](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest) - Node.js
- [sequelize.import](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import) - Sequelize