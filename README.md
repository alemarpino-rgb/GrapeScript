# GrapeScript

[icon/icon.ico]

**GrapeScript** è un piccolo linguaggio di programmazione interpretato, scritto in Python da zero: tokenizer, parser e interprete ad albero, senza librerie esterne.

È pensato per essere semplice da leggere e da imparare, ed è un progetto nato per capire come funzionano davvero i linguaggi di programmazione.

```
nome = input("Come ti chiami? ")
print("Ciao, " + nome + "!")
```

> Versione attuale: **0.1.0**

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
  - [Numeri casuali](#numeri-casuali)
- [Esempi](#esempi)
- [Errori](#errori)
- [Limiti attuali](#limiti-attuali)
- [Come funziona](#come-funziona)
- [Roadmap](#roadmap)

---

## Installazione

Serve **Python 3.11 o superiore**.

Scarica il progetto e basta: non ci sono dipendenze da installare.

## Esecuzione

I programmi GrapeScript sono file di testo con estensione **`.gs`**.

Su Windows:

```
.\destems mio_programma.gs
```

Oppure, su qualsiasi sistema, direttamente con Python:

```
python GrapeScript.py mio_programma.gs
```

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

### Variabili e valori

Le variabili si creano assegnando un valore con `=`. Non serve dichiararne il tipo.

```
eta = 17
nome = "Grape"
saluto = 'ciao'      @ vanno bene sia " che '
```

I tipi di valore sono:

| Tipo | Esempio |
|---|---|
| Numero intero | `42` |
| Numero decimale | risultato di una divisione, o di `-> float` |
| Testo | `"ciao"` o `'ciao'` |
| Booleano | risultato di un confronto: `True` o `False` |

I numeri interi non hanno limite di cifre.

### Stampa e input

`print` stampa un valore. `input` mostra un messaggio e restituisce **come testo** quello che scrive l'utente:

```
print("Ciao mondo!")
nome = input("Come ti chiami? ")
print("Piacere, " + nome)
```

Se l'utente deve scrivere un numero, convertilo con `-> int`:

```
anni = input("Quanti anni hai? ") -> int
print(anni + 1)
```

### Operatori

**Aritmetici**

| Operatore | Significato | Esempio | Risultato |
|---|---|---|---|
| `+` | somma | `2 + 3` | `5` |
| `-` | sottrazione | `5 - 2` | `3` |
| `*` | moltiplicazione | `4 * 2` | `8` |
| `/` | divisione | `7 / 2` | `3.5` |

`*` e `/` hanno la precedenza su `+` e `-`, come in matematica.

Con il testo:

- `+` unisce un testo a qualsiasi valore: `"Hai " + 3 + " anni"` diventa `Hai 3 anni`
- `*` ripete un testo: `"ab" * 3` diventa `ababab`

**Confronti**

| Operatore | Significato |
|---|---|
| `==` | uguale |
| `<` `>` | minore, maggiore |
| `<=` `>=` | minore o uguale, maggiore o uguale |
| `%%` | **è divisibile per** (`10 %% 5` è vero) |

### Conversioni con `->`

La freccia `->` converte un valore in un altro tipo:

```
x = "42" -> int        @ da testo a numero intero
y = 7 / 2 -> int       @ 3, toglie la parte decimale
z = 5 -> float         @ 5.0
t = 100 -> str         @ "100"
```

Tipi disponibili: `int`, `float`, `str`.

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

`repeat` ripete un blocco un numero preciso di volte:

```
repeat 3 {
    print("Hip hip hurrà!")
}
```

`loop` ripete all'infinito, finché non incontra un `break`:

```
loop {
    risposta = input("Scrivi 'esci' per uscire: ")
    if risposta == "esci" {
        break
    }
}
```

`break` funziona anche dentro `repeat`.

### Numeri casuali

`randint(minimo, massimo)` restituisce un intero casuale, estremi inclusi:

```
dado = randint(1, 6)
print("È uscito " + dado)
```

---

## Esempi

### Fibonacci

```
a = 0
b = 1
repeat 10 {
    print(a)
    c = a + b
    a = b
    b = c
}
```

Stampa: `0 1 1 2 3 5 8 13 21 34`

### FizzBuzz

```
n = 1
repeat 15 {
    if n %% 15 {
        print("FizzBuzz")
    } elif n %% 3 {
        print("Fizz")
    } elif n %% 5 {
        print("Buzz")
    } else {
        print(n)
    }
    n = n + 1
}
```

### Indovina il numero

```
segreto = randint(1, 100)
tentativi = 0
print("Ho pensato un numero da 1 a 100!")
loop {
    g = input("Il tuo tentativo: ") -> int
    tentativi = tentativi + 1
    if g < segreto {
        print("Più alto!")
    } elif g > segreto {
        print("Più basso!")
    } else {
        print("Indovinato in " + tentativi + " tentativi!")
        break
    }
}
```

---

## Errori

Quando qualcosa va storto, GrapeScript stampa un messaggio **in rosso**, senza i dettagli interni di Python:

```
Errore: riga 3: Valore atteso, trovato ')'
Errore: Variabile y non esistente!
```

Gli errori di sintassi indicano la riga. Quelli su caratteri non validi e quelli che avvengono durante l'esecuzione, per ora, no.

Per fermare un programma, ad esempio un `loop` infinito, premi **Ctrl+C**.

---

## Limiti attuali

GrapeScript è giovane! Queste cose **non** sono ancora supportate:

- parentesi nelle espressioni: `(1 + 2) * 3`
- numeri negativi scritti direttamente: `x = -5` (usa `x = 0 - 5`)
- numeri decimali scritti direttamente: `3.14` (usa `314 / 100`)
- `!=`, `and`, `or`, `not`
- funzioni, liste e cicli `for`

---

## Come funziona

L'interprete lavora in tre fasi, tutte in `GrapeScript.py`:

1. **Tokenizer** (`tokenizza`): trasforma il testo in una lista di *token*, come `NUMERO 5`, `PIU +`, `NOME_VAR x`.
2. **Parser** (`Parser`): legge i token seguendo la grammatica e costruisce un **albero sintattico** di nodi (`PrintNode`, `IfNode`, `BinOpNode`...).
3. **Interprete** (`esegui`): visita l'albero e lo esegue, tenendo i valori delle variabili in un dizionario chiamato `ambiente`.

Grammatica semplificata:

```
programma   -> istruzione*
blocco      -> '{' istruzione* '}'
istruzione  -> 'print' '(' espressione ')'
             | 'if' espressione blocco ('elif' espressione blocco)* ('else' blocco)?
             | 'repeat' espressione blocco
             | 'loop' blocco
             | 'break'
             | NOME '=' espressione
espressione -> confronto ( '->' TIPO )*
confronto   -> somma ( ('==' | '<' | '>' | '<=' | '>=' | '%%') somma )?
somma       -> termine ( ('+' | '-') termine )*
termine     -> valore ( ('*' | '/') valore )*
valore      -> NUMERO | TESTO | NOME
             | 'randint' '(' espressione ',' espressione ')'
             | 'input' '(' espressione ')'
```

Fatto da Alessandro Marpino.