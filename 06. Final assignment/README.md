# 06. Final assignment
<img src="https://media.giphy.com/media/FLUkjdQ1u6COY/giphy.gif" alt="Doctor Who screams 'hashtags'!" width="600">

Som slutuppgift ska du bygga en förenklad klon av det sociala nätverket Twitter, men i API form! 🐦 Syftet med uppgiften är att du ska få prova på de kunskaper du byggt upp under dessa 6 veckor genom att kombinera de olika delarna vi gått igenom av programmering i Node.js, genom att bygga ett fungerande API som du enkelt skulle kunna lägga på en front-end app på.

## Krav
Varje nivå innefattar även de krav från tidigare nivå, om en tidigare nivå finns. Vill säga, om du vill uppnå betyg C, måste du ha uppfyllt alla krav för betyg C. Och för betyg A måste du då ha uppfyllt alla krav för både betyg E som betyg C.

### Grundläggande krav (Betyg E)
- Du har byggt en enkel HTTP server med hjälp av Express.js som grund för ditt API.
- Du använder body-parser som middleware för att parse:a datan som skickas till ditt API.
- När allt går vägen så returnerar du alltid JSON-data. Men när något går fel, returnerar du en rimlig HTTP status kod, samt en ren text som felmeddelande (alltså inte JSON.)

**-- Betyg E unika krav --**
- Du använder en core modul (core = inkluderad i Node.js, alltså inte från npm) för att läsa från och skriva till filer.
- Du har minst 2 endpoints (routes) i ditt API, varav 1 GET och 1 POST.
    - Din POST route tar in JSON data med två fält, `content` och `author`. Dessa sparar du sedan i en `.json` fil i din projektmapp.
    - Din GET route skall läsa från samma `.json` fil och sedan skicka listan av poster i JSON som respons.
- Din server kollar vid uppstart (när du kör `.js` filen) att din `.json`-fil existerar. Om den inte gör det, skapar du den med en tom `Array` sparad som JSON (stringified).

**-- // Betyg E unika krav --**

### Avancerade krav (Betyg C)
> Kräver krav från Betyg E (ej unika krav för Betyg E)

- Du använder dig av Sequelize för att koppla upp dig mot en MySQL databas, istället för att läsa från en `.json` fil.
- Du använder en model för att skapa tabllen för dina tweets som har både en `content` och en `author` column. Båda skall vara text-formaterade, inte vara mer än 255 tecken långa och får inte vara `null`. Din tabell skall självklart även ha en `id` column.
- Du har en model som representerar användare med åtminstone ett `name` och ett `username`, som båda är text formaterade, max 255 tecken och kan inte vara `null`.
    - Användarens `username` skall också vara unikt, vilket gör att ingen användare kan registera sig med ett användarnamn som redan existerar.
- Du har en one-to-many relation mellan modellen för användare och modellen för tweets, så att en användare äger flera tweets, och ett tweet tillhör en användare.
- Du har uppdaterat dina routes så du nu har:
    - En GET route för att lista ut alla användare som finns där endast `name` och `username` borde finns med i listan.
    - En POST route för att registrera en ny användare (kräver ett `name` och `username`)
    - En GET route för att hämta ut tweets från en specifik användare baserat på `username` (ex. route: `localhost/users/themaxsandelin`)
    - En POST route för att skapa Tweets för en specifik användare. baserat på `username`.

### Extra avancerade krav (Betyg A)
> Kräver krav från Betyg E och C

- Du separerar dina modeller in i separata `.js` filer och exponerar de som moduler du sedan inkluderar i samma fil som din databas-koppling.
- Du uppdaterar din modell för användare med en ny rad, `password` samt `salt`. Du kräver sedan `password` när man skapar en ny användare, och genererar en `salt` sträng programmatiskt med hjälp av `crypto` modulen i Node.js. Du hashar sedan lösenordet med `salt`:en du genererar, detta gör du med `crypto` modulen också, och sparar både `salt` och det hashade `password` på användaren.
- Du uppdaterar dina routes så du nu har:
    - En ny DELETE route för att ta bort användare baserat på användarnamn.
    - En ny DELETE route för att ta bort ett tweet baserat på ID (ex. route: `localhost/users/themaxsandelin/123`)
- Du skapar en egen middleware för att hantera autentisering som skall fungera enligt följande:
    - Auth modulen skall kräva `Basic` auth, där användarnamnet och lösenordet måste matcha det som står på användaren.
    - Du applicerar denna middleware endast på följande routes:
        - Din route för att skapa tweets för en specifik användare baserat på användarnamn.
        - Din route för att ta bort användare baserat på användarnamn.
        - Din route för att ta bort ett tweet baserat på ID.

## Inlämning

Innan du lämnar in, var noga med att ta bort din node_modules folder. Detta är en tung folder som är väldigt onödig att dela, då `npm install` återskapar den. Skapa en `.zip` fil baserad på din projektfolder. Skicka den till min mail ([max@maxsandelin.com](mailto:max@maxsandelin.com)) med ämnesraden "Slutprojekt Webbserverprogrammering 2 - [Ditt namn]".

**Deadline är Fredag, 14/2 - 2019**