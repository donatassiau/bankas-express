# Bankas

Sukurti API naudojantis Express.js, kuris leistu susikurti banko saskaitas, i jas isinesti pinigu ir vykdyti pinigu pervedimus tarp saskaitu.

Vienas asmuo gali tureti tik viena saskaita.

Visi pinigai yra ta pacia valiuta.

Visi duomenu mainai vyksta JSON formatu.

Visi pinigu mainai vyksta centais.

Visi pinigu "spausdinimai" vykdomi formatuojant teksta, pvz: `123,45 Eur`.

Uzklausu adresai neturi buti jautrus didziosioms/mazosioms raidems, t.y.

```
/api/account/{vardas}-{pavarde}
/api/account/john-doe
/api/account/John-doe
/api/account/John-Doe
/api/account/JOHN-DOE
```

## Reikalingi API endpoint'ai

### /api/account

> POST

```
/api/account
```

Perduodami duomenys:

- vardas
- pavarde
- gimimo data (yyyy-mm-dd)

Reikalavimai:

- saskaita gali susikurti tik pilnameciai (18m)
- vardo ir pavardes kombinacija turi buti unikali

> GET:

```
/api/account/john-doe
```

Grazina paskyros savininko varda, pavarde ir gimimo data

> DELETE:

```
/api/account/john-doe
```

Reikalavimai:

- istrinti galima tik jei saskaitoje nera pinigu

> PUT

```
/api/account/john-doe
```

Perduodami duomenys:

- vardas
- pavarde
- gimimo data (yyyy-mm-dd)

Jei atnaujiname paskyrtos duomenis, tai siunciama visa informacija, t.y. nepakitusi ir pakitusi kartu.

### /api/account/name

> GET

```
/api/account/john-doe/name
```

Grazina varda

> PUT

```
/api/account/john-doe/name
```

Perduodami duomenys:

- vardas

Atnaujina varda

### /api/account/surname

> GET

```
/api/account/john-doe/surname
```

Grazina pavarde

> PUT

```
/api/account/john-doe/surname
```

Perduodami duomenys:

- pavarde

Atnaujina pavarde

### /api/account/dob

> GET

```
/api/account/john-doe/dob
```

Grazina gimimo data

> PUT

```
/api/account/john-doe/dob
```

Perduodami duomenys:

- gimimo data (yyyy-mm-dd)

Atnaujina gimimo data

### /api/withdrawal

> POST

Perduodami duomenys:

- pinigu kiekis
- saskaitos savininko vardas
- saskaitos savininko pavarde

Is saskaitos isimami pinigai

### /api/deposit

> POST

Perduodami duomenys:

- pinigu kiekis
- saskaitos savininko vardas
- saskaitos savininko pavarde

I saskaita inesami pinigai

### /api/transfer

> POST

Perduodami duomenys:

- is kurios saskaitos: vardas
- is kurios saskaitos: pavarde
- i kuria saskaita: vardas
- i kuria saskaita: pavarde
- pinigu kiekis

Is vienos saskaitos isskaitomi pinigai ir iskaitomi i kita saskaita

## Vertinimas

- README (3 balai):
  - projekto aprasas
  - kaip ji paleisti
  - aprasyti visus viekiancius endpoint'us ir kaip jais naudotis
- git istorija:
  - 0..10 - 0 balu
  - 11..20 - 1 balas
  - 20+ - 2 balas
- Kiekvienas endpoint'as ir jo HTTP metodai yra verti po 5 balus:
  - 1 balas uz teisingai grazinta rezultata
  - 2 balas uz tinkamas validacijas (visas)
  - 1 balas uz URL
  - 1 balas uz gerai aprasyta dokumentacija README faile

## Deadline

2024-09-02 12:00:00
