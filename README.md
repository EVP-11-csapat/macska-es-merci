# Macska és Merci problémája Szimuláció

Ez a projekt egy egyszerű webalkalmazás, amely a Monty Hall problémát, más néven a "Macska és Merci problémáját" szimulálja. A probléma egy valószínűségi játékot ír le, amelyben egy játékos három ajtó közül választhat, és célja az autó megtalálása. A három ajtó közül kettő mögött macskák vannak, míg egyik mögött egy Mercedes gépkocsi.

## Hogyan működik?

Az alkalmazás alapvetően a következő lépéseket követi:

1. A felhasználó beállíthatja, hogy hány szimulációt szeretne futtatni.

2. Minden szimuláció során az alkalmazás véletlenszerűen választ egy ajtót, ahol az autó lehet.

3. A szimuláció megjeleníti a választott ajtót, és az egyik másik ajtót, amit a játékmester (Monty Hall) kinyit, hogy macskát találjon mögötte.

4. A felhasználó választhat, hogy megtartja eredeti választását, vagy megváltoztatja a választását egy másik ajtóra.

5. Az alkalmazás rögzíti, hogy a játékos nyert-e vagy veszített a kiválasztott stratégiától függően.

6. Az összes szimuláció lefutása után az alkalmazás összesíti, hogy hány alkalommal nyertek a felhasználók a döntés módosítása vagy nem módosítása alapján.

## Hogyan futtasd az alkalmazást?

1. Klónozd le a projektet a saját gépedre:
```bash
git clone https://github.com/felhasznaloneved/macska-es-merci-szimulacio.git
```
2. Lépj a projekt mappájába:
```bash
cd macska-es-merci-szimulacio
```
3. Nyisd meg az index.html fájlt egy webböngészőben:

Most már futtathatod az alkalmazást, és megvizsgálhatod az eredményeket.

## Közzététel
Ez a projekt nyilvános és nyitott forráskódú. Ha szeretnél hozzájárulni a fejlesztéséhez, kérlek, forkold a repository-t és küldj egy pull request-et a változtatásaidhoz.

## Licensz
Ez a projekt a MIT licensz alatt áll, részletekért lásd a LICENSE fájlt.
