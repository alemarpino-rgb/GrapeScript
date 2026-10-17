# GrapeScript

![logo](icon/icon.ico)

**GrapeScript** è un piccolo linguaggio di programmazione interpretato, scritto in Python da zero: tokenizer, parser e interprete ad albero, senza librerie esterne.

È pensato per essere semplice da leggere e da imparare, ed è un progetto nato per capire come funzionano davvero i linguaggi di programmazione.

```
nome = input("Come ti chiami? ")
print("Ciao, " + nome + "!")
```

> Versione attuale: **0.2.0**

---

## Indice

- [Installazione](#installazione)
- [Esecuzione](#esecuzione)
- [Guida al linguaggio](#guida-al-linguaggio)
  - [Commenti](#commenti)
  - [Variabili e valori](#variabili-e-valori)
  - [Stampa e input](#stampa-e-input)
  - [Operatori](#operatori)
  - [Conversioni con `->`](#conversioni-con--)
  - [Condizioni: `if` / `elif` / `else`](#condizioni-if--elif--else)
  - [Cicli: `repeat`, `loop` e `break`](#cicli-repeat-loop-e-break)
  - [Liste](#liste)
  - [Testi](#testi)
  - [Numeri casuali](#numeri-casuali)
- [Esempi](#esempi)
- [Errori](#errori)
- [Limiti attuali](#limiti-attuali)
- [Come funziona](#come-funziona)
- [Novità della 0.2](#novità-della-02)

---

## Installazione

**Con l'installer (Windows):** scarica `Installer\GrapeScript-0.2.0-setup.exe` e avvialo. Non servono permessi di amministratore e non serve avere Python. L'installer aggiunge al PATH due comandi:

| Comando | Cos'è |
|---|---|
| `grapescript` | l'interprete |
| `destems` | il lanciatore: chiama `grapescript` passandogli gli stessi argomenti |

**Dal codice sorgente:** serve **Python 3.11 o superiore**, non ci sono altre dipendenze.

Inoltre, dalla versione 0.2.1 c'è anche **un'estensione per vscode**. Per installarla, vai nella cartella grapescript e leggi il README.

## Esecuzione

I programmi GrapeScript sono file di testo con estensione **`.gs`**.

```
destems programma.gs          esegue un file
destems                       apre la console interattiva
destems --console             uguale
destems --version             mostra la versione
```

Oppure, su qualsiasi sistema, direttamente con Python:

```
python Grapescript.py programma.gs
```

Nella **console** ogni riga viene eseguita subito e le variabili restano in memoria fino all'uscita. Si esce scrivendo `esci` (oppure Ctrl+C).

---

## Guida al linguaggio

Ogni istruzione sta su una riga. I blocchi di codice si scrivono tra parentesi graffe `{ }`.

### Commenti

I commenti iniziano con `@` e arrivano fino a fine riga, oppure fino alla `@` successiva:

```
@ questo è un commento
x = 5   @ commento a fine riga
y = @ commento in mezzo @ 10
```

Attenzione: dentro un commento una seconda `@` lo chiude.

### Variabili e valori

Le variabili si creano assegnando un valore con `=`. Non serve dichiararne il tipo.

```
eta = 17
altezza = 1.75
nome = "Grape"
voti = [7, 8.5, 6]
```

| Tipo | Esempio |
|---|---|
| Numero intero | `42` (senza limite di cifre) |
| Numero decimale | `3.14` |
| Testo | `"ciao"` o `'ciao'` |
| Lista | `[1, 2.5, "tre"]` |
| Booleano | risultato di un confronto: `True` o `False` |

Le variabili si possono aggiornare con gli operatori di assegnazione:

```
x = 10
x += 5      @ 15
x *= 2      @ 30
x -= 1      @ 29
```

Disponibili: `+=` `-=` `*=` `/=` `%=`.

### Stampa e input

`print` stampa un valore. `input` mostra un messaggio e restituisce **sempre un testo**:

```
nome = input("Come ti chiami? ")
anni = input("Quanti anni hai? ") -> int
print("L'anno prossimo ne avrai " + anni + 1)
```

### Operatori

**Aritmetici**

| Operatore | Significato | Esempio | Risultato |
|---|---|---|---|
| `+` | somma | `2 + 3` | `5` |
| `-` | sottrazione | `5 - 2` | `3` |
| `*` | moltiplicazione | `4 * 2` | `8` |
| `/` | divisione | `7 / 2` | `3.5` |
| `//` | divisione intera | `7 // 2` | `3` |
| `%` | resto | `7 % 2` | `1` |

`*`, `/`, `//` e `%` hanno la precedenza su `+` e `-`, come in matematica.

Con testi e liste:

- `+` unisce un testo a qualsiasi valore: `"Hai " + 3 + " anni"` diventa `Hai 3 anni`
- `*` ripete: `"ab" * 3` diventa `ababab`, `[0] * 3` diventa `[0, 0, 0]`
- `+` unisce due liste: `[1, 2] + [3]` diventa `[1, 2, 3]`

> Le operazioni vanno da sinistra a destra, quindi `"totale: " + 2 + 3` dà `totale: 23`. Conviene calcolare prima in una variabile.

**Confronti**

| Operatore | Significato |
|---|---|
| `==` | uguale |
| `<` `>` | minore, maggiore |
| `<=` `>=` | minore o uguale, maggiore o uguale |
| `%%` | **è divisibile per** (`10 %% 5` è vero) |

### Conversioni con `->`

```
x = "42" -> int        @ da testo a numero intero
y = 7.9 -> int         @ 7: toglie la parte decimale
z = 5 -> float         @ 5.0
t = 100 -> str         @ "100"
```

Tipi disponibili: `int`, `float`, `str`. La freccia vale per **tutta** l'espressione alla sua sinistra.

### Condizioni: `if` / `elif` / `else`

```
voto = input("Che voto hai preso? ") -> int

if voto >= 9 {
    print("Ottimo!")
} elif voto >= 6 {
    print("Sufficiente")
} else {
    print("Insufficiente")
}
```

`elif` ed `else` sono facoltativi. Puoi metterli sulla stessa riga della `}` o andare a capo.

### Cicli: `repeat`, `loop` e `break`

`repeat` ripete un blocco un numero preciso di volte, `loop` ripete finché non incontra un `break`:

```
i = 1
repeat 3 {
    print(i)
    i += 1
}

loop {
    risposta = input("Scrivi 'esci' per uscire: ")
    if risposta == "esci" {
        break
    }
}
```

`break` esce dal ciclo più interno, sia `loop` sia `repeat`.

### Liste

```
frutta = ["mela", "pera", "uva"]
print(frutta[0])                  @ mela  (si conta da 0)
frutta[1] = "kiwi"                @ modifica un elemento
frutta += ["fico"]                @ aggiunge in fondo
print(len(frutta))                @ 4
print(frutta[len(frutta) - 1])    @ l'ultimo: fico

griglia = [[0, 0, 0], [0, 0, 0]]  @ liste di liste
griglia[1][2] = 9
griglia[0][0] += 1
```

Per scorrere una lista si usa un indice:

```
i = 0
repeat len(frutta) {
    print(frutta[i])
    i += 1
}
```

### Testi

Anche i testi hanno l'indice e la lunghezza:

```
parola = "grape"
print(parola[0])       @ g
print(len(parola))     @ 5
```

### Numeri casuali

`randint(minimo, massimo)` restituisce un intero casuale, estremi inclusi:

```
dado = randint(1, 6)
print("È uscito " + dado)
```

---

## Esempi

Nella cartella [`esempi`](esempi/) ci sono 40 programmi, dal più semplice ai più estremi:

- **le basi**: variabili, operatori, condizioni, cicli;
- **algoritmi**: numeri primi, crivello di Eratostene, Euclide, conversione di base, numeri romani, radice di 2 con centinaia di cifre;
- **liste e testi**: statistiche, ordinamento, ricerca binaria, matrici, palindromi, cifrario di Cesare;
- **simulazioni**: tris contro il computer, gioco della vita, insieme di Mandelbrot;
- **estremi**: pi greco con mille cifre, risolutore di sudoku, un interprete di Brainfuck e un **motore di scacchi**, tutti scritti in GrapeScript.

L'elenco completo è in [`esempi/README.md`](esempi/README.md).

---

## Errori

Quando qualcosa va storto, GrapeScript stampa un messaggio **in rosso** e in italiano, senza i dettagli interni di Python:

```
Errore: riga 3: Valore atteso, trovato ')'
Errore: Variabile y non esistente!
Errore: Indice 5 fuori dalla lista (che ha 3 elementi)
Errore: Non si può usare '<' tra un testo e un numero
```

Gli errori di sintassi indicano la riga. Quelli che avvengono durante l'esecuzione, per ora, no.

Per fermare un programma, ad esempio un `loop` infinito, premi **Ctrl+C**.

---

## Limiti attuali

GrapeScript è giovane! Queste cose **non** sono ancora supportate:

- parentesi nelle espressioni: `(1 + 2) * 3` (calcola prima in una variabile)
- numeri negativi scritti direttamente: `x = -5` (usa `x = 0 - 5`)
- `!=`, `and`, `or`, `not` (usa due `if` uno dentro l'altro)
- funzioni scritte dall'utente
- ciclo `for` (usa `repeat` con un indice)

---

## Come funziona

L'interprete lavora in tre fasi, tutte in `Grapescript.py`:

1. **Tokenizer** (`tokenizza`): trasforma il testo in una lista di *token*, come `NUMERO 5`, `PIU +`, `NOME_VAR x`.
2. **Parser** (`Parser`): legge i token seguendo la grammatica e costruisce un **albero sintattico** di nodi (`PrintNode`, `IfNode`, `BinOpNode`...).
3. **Interprete** (`esegui`): visita l'albero e lo esegue, tenendo i valori delle variabili in un dizionario chiamato `ambiente`.

Grammatica:

```
programma   -> istruzione*
blocco      -> '{' istruzione* '}'
istruzione  -> 'print' '(' espressione ')'
             | 'if' espressione blocco ('elif' espressione blocco)* ('else' blocco)?
             | 'repeat' espressione blocco
             | 'loop' blocco
             | 'break'
             | NOME ('=' | '+=' | '-=' | '*=' | '/=' | '%=') espressione
             | valore '[' espressione ']' ('=' | '+=' | ...) espressione
espressione -> confronto ( '->' TIPO )*
confronto   -> somma ( ('==' | '<' | '>' | '<=' | '>=' | '%%') somma )?
somma       -> termine ( ('+' | '-') termine )*
termine     -> valore ( ('*' | '/' | '//' | '%') valore )*
valore      -> primario ( '[' espressione ']' )*
primario    -> NUMERO | TESTO | NOME | lista
             | 'randint' '(' espressione ',' espressione ')'
             | 'input' '(' espressione ')'
             | 'len' '(' espressione ')'
lista       -> '[' ( espressione ( ',' espressione )* )? ']'
```

---

## Novità della 0.2.0 e 0.2.1

**Dalla 0.2.0**

- numeri decimali (`3.14`)
- liste, indici (`l[0]`, `griglia[1][2]`) e modifica degli elementi (`l[0] = 5`)
- `len` per liste e testi, indici anche sui testi
- operatori `//`, `%`, `+=`, `-=`, `*=`, `/=`, `%=`
- console interattiva, `--version`
- installer per Windows con i comandi `grapescript` e `destems`
- errori più chiari e in italiano

**Dalla 0.2.1**

- Nuova estenzaione vscode (per più info guarda [Installazione](#installazione) oppure vai nella cartella grapescript/)
- operatore divide che divide una stringa (es. divide('Ciao Mondo') = ['Ciao', 'Mondo'])

---

Fatto da Alessandro Marpino.
