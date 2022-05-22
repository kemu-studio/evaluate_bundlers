Do sprawdzenia dalej: webpack, rollup, esbuild, microbundle i może browserify (opis niżej)

***

1.Większość bundlerów rozumie import isomorficznej paczki (main/browser w package.json), ale wymaga jawnej deklaracji paczki w dependencies (package.json) oraz jej instalacji do node_modules. Mam wrażenie, że to jest powszechnie akceptowany standard.

2. Warunkowe require - bundlery, które mają eliminacje zdechlego kodu usuwają kod serwerowy jeśli jest w fałszywym warunku if (stała). Część bundlerów ma możliwość globalnego zdefiniowana stałej w swoim konfigu. PROBLEM: Taki kod nie działa sam z siebie na serwerze bez przepuszczenia przez bundler - brakuje stałej.

3. Warunkowy import - wydaje mi się, że to karkołomny pomysł. Importy muszą być w globalnym namespacie - działają statycznie (w czasie kompilacji, nie w czasie uruchomienia) podobnie jak importy w pascalu, moduli, adzie itd. Do niektórych bundlerów da się dodrutować preprocesor #ifdef, ale - PROBLEM: Kod z #ifdef jest nieprzenośny, trudny w debugowaniu i serwer wymaga bundlera do pracy.
Sprawdziłem to rozwiązanie tylko dla 3 pierwszych bundlerow. Dalej uznałem, że te rozwiąania są mocno przyspawane do danego bundlera, wymagają sporo czasu żeby je znaleźć a i tak nie wiadomo czy będziemy tego używać. W razie potrzeby możemy do tego wrócić dla wybranego bundlera."

4. Raczej na pewno możemy olać - poi (oficjalnie przestarzały) i carbon (moloch wymagający pythona2)

5. Niektóre bundlery wyglądają jakby kładły nacisk na zarządzanie całym drzewem/aplikacją a nie tylko robienei bundli. Wydaje mi się, że to nie do końca to czego szukamy:  vite, snowpack, lasso

6. Parcel i fuse nie udało mi się w pełni skonfigurować żeby robiły to co chcemy, ale wydaje mi się, że to jest do zrobienia. Na tym etapie nie porafię powiedzieć czy one mają jakąś przewagę nad resztą.

7. Browserify potrafi sprawić że paczki typowo nodowe zaczynają działać na browserze (sprawdziliśmy to też sami w calculli). Ale żeby mieć mumifikacje i usunięcie kodu serwerowego potrzebujemy obudować to zewnętrznymi toolami - trudno powiedzieć czy to będzie miało przewagę na jakimś etapie.

8. Te bundlery udało mi się w miarę łatwo skonfigurować aby robiły to co chcemy na tym etapie: rollup, webpack, esbuild, microbundle.

***

https://docs.google.com/spreadsheets/d/1vIX3g0Y_qDFY-MSstAuKD6dahVN7ZIbArNcZ4KFopuQ/edit#gid=531564476