# Esempi di GrapeScript

40 programmi, dal più semplice al più estremo. Si eseguono con:

```
destems esempi\01_ciao_mondo.gs
```

## Le basi
| # | File | Cosa fa |
|---|---|---|
| 01 | `01_ciao_mondo.gs` | stampa una riga |
| 02 | `02_variabili_e_tipi.gs` | interi, decimali, testi, liste e conversioni con `->` |
| 03 | `03_input.gs` | legge dati dall'utente |
| 04 | `04_operatori.gs` | la differenza tra `/`, `//` e `%` |
| 05 | `05_condizioni.gs` | `if` / `elif` / `else` |
| 06 | `06_cicli.gs` | `repeat`, `loop` e `break` |

## Algoritmi sui numeri
| # | File | Cosa fa |
|---|---|---|
| 07 | `07_fizzbuzz.gs` | il classico esercizio da colloquio |
| 08 | `08_fibonacci.gs` | i primi 100 numeri di Fibonacci |
| 09 | `09_fattoriale.gs` | 1000! con tutte le sue 2568 cifre |
| 10 | `10_numero_primo.gs` | controlla se un numero è primo |
| 11 | `11_crivello_di_eratostene.gs` | tutti i primi fino a N con una lista |
| 12 | `12_mcd_mcm.gs` | algoritmo di Euclide |
| 13 | `13_collatz.gs` | la congettura ancora irrisolta |
| 14 | `14_conversione_basi.gs` | binario, ottale, esadecimale |
| 15 | `15_numeri_romani.gs` | con due liste "parallele" |
| 16 | `16_radice_di_due.gs` | √2 con centinaia di cifre, solo interi |
| 17 | `17_numeri_perfetti.gs` | 6, 28, 496, 8128 |

## Liste
| # | File | Cosa fa |
|---|---|---|
| 18 | `18_statistiche_voti.gs` | media, minimo, massimo |
| 19 | `19_ordinamento.gs` | bubble sort |
| 20 | `20_ricerca_binaria.gs` | trova un elemento in al massimo 10 passi |
| 21 | `21_inverti_e_ruota.gs` | operazioni classiche sulle liste |
| 22 | `22_lista_della_spesa.gs` | programma interattivo con una lista che cresce |
| 23 | `23_matrici.gs` | trasposta e prodotto di matrici |
| 24 | `24_istogramma_dadi.gs` | la "campana" dei due dadi |

## Testi
| # | File | Cosa fa |
|---|---|---|
| 25 | `25_palindromo.gs` | "i topi non avevano nipoti" |
| 26 | `26_conta_vocali.gs` | conta le vocali di una frase |
| 27 | `27_cifrario_di_cesare.gs` | cifra e decifra |

## Piccole applicazioni
| # | File | Cosa fa |
|---|---|---|
| 28 | `28_calcolatrice.gs` | calcolatrice con menu |
| 29 | `29_giorno_della_settimana.gs` | formula di Zeller |
| 30 | `30_interesse_composto.gs` | come crescono i risparmi |
| 31 | `31_tabella_temperature.gs` | Celsius, Fahrenheit, Kelvin |

## Simulazioni e giochi
| # | File | Cosa fa |
|---|---|---|
| 32 | `32_indovina_il_numero.gs` | il primo gioco |
| 33 | `33_tris.gs` | tris contro un computer che vince e blocca |
| 34 | `34_gioco_della_vita.gs` | Conway, con il cannone di Gosper |
| 35 | `35_mandelbrot.gs` | il frattale più famoso |
| 36 | `36_pi_monte_carlo.gs` | pi greco col caso |

## Estremi
| # | File | Cosa fa |
|---|---|---|
| 37 | `37_pi_mille_cifre.gs` | pi greco con mille cifre esatte (formula di Machin) |
| 38 | `38_sudoku.gs` | risolutore di sudoku con backtracking, senza ricorsione |
| 39 | `39_interprete_brainfuck.gs` | un linguaggio dentro GrapeScript dentro Python |
| 40 | `40_scacchi.gs` | **un motore di scacchi**: negamax con alfa-beta, scritto come macchina a stati |

## Trucchi usati negli esempi
GrapeScript non ha ancora le parentesi, quindi i calcoli lunghi si spezzano in variabili:

```
@ invece di  (a + b) * c
s = a + b
r = s * c
```

E per arrotondare a 2 decimali:

```
x = x * 100 + 0.5
x = x // 1 / 100
```
