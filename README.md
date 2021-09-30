# Moment2

## Automatiseringsprocessen 
Underlättar utvecklande av webbplatser eller applikationer genom att filer som ändras i grundfilen automatiskt ändras i alla filer samt komprimering av till exempel bilder automatiskt komprimerar alla bilder samtidigt, likaså vid komprimering av JS- och CSS-filer där alla komprimeras på bästa sätt för att ta så liten plats som möjligt och ta bort onödiga tecken.

## Paket och verktyg
I detta fall används NodeJS och så har Gulp installerats lokalt med hjälp av npm install --save-dev gulp-install. Efter detta har paket installerats och funktioner och tasks skapats. Paketen som använts för denna uppgift är:

* Gulp copyHTML - Överför HTML-koden från den lokala till publika mappen
* Gulp concat - Slår ihop alla filer med samma format till en
* Gulp terser - Ser till att JavaScript-filer tar så liten plats som möjligt
* Gulp cssnano - Ser till att all CSS-fil tar så liten plats som möjligt
* Gulp imagemin - Komprimerar bilder
* Gulp watch - Gör att ändringar utförs automatiskt
* Gulp browserSync - Gör att webbläsaren uppdaterar ändringar som görs i filerna direkt

## Systemet
Systemet börjar användas genom att skriva "gulp" i terminalfönstret.

Variabler läggs till i gulp-filen och gulp-paketen läggs till. Sedan skapas tasks. En **HTML-task** som kopierar in informationen ur HTML-filen från lokala till servern för publicering. En **CSS-task** som gör samma sak med CSS samt att den slår ihop alla separata CSS-filer till en fil och döper denna till main.css. Den komprimerar även all CSS-kod för att ta så liten plats som möjligt och ta bort eventuella onödiga tecken bland annat. **JS-tasken** körs sedan och på samma sätt som CSS-tasken. Där är det dock terser som komprimerar JS-filer och inte cssnano, men i övrigt är dert samma funktioner. Efter detta körs **image-tasken** och där komprimeras alla bilder för att ta såliten plats som möjligt. Och när detta är klart körs **wacth-tasken** som är den som håller koll på när något ändras och då kör om igen från browserSync som kontrollerar alla tasks och laddar om så fort en ändring sparas så ändringar sker direkt i webbläsaren. Och sen läggs en export in för att dessa filer som ligger som privata i arbetskatalogen ska kunna ses i arbetskatalogen.
