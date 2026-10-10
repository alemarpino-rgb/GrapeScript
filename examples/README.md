# Esempi di GrapeScript

48 programmi, dal più semplice al più complesso. Eseguili con:

```
.\destems esempi\01_ciao_mondo.gs
```

oppure `python GrapeScript.py esempi/01_ciao_mondo.gs`.

## Primi passi
| # | Programma | Cosa impari |
|---|---|---|
| 01 | `01_ciao_mondo.gs` | `print` |
| 02 | `02_saluto.gs` | `input`, testo moltiplicato |
| 03 | `03_calcolatrice.gs` | operazioni, `-> int`, `if`/`else` |
| 04 | `04_tabellina.gs` | `repeat` |
| 05 | `05_conto_alla_rovescia.gs` | contatori, ASCII art |
| 06 | `06_pari_o_dispari.gs` | l'operatore `%%` |
| 07 | `07_fizzbuzz.gs` | `elif` |
| 08 | `08_fibonacci.gs` | numeri giganti |
| 09 | `09_potenze_di_due.gs` | 2 elevato alla 1000 |
| 10 | `10_fattoriale.gs` | 1000! con 2568 cifre |

## Disegni con il testo
| # | Programma | Cosa impari |
|---|---|---|
| 11 | `11_triangolo.gs` | `"*" * n` |
| 12 | `12_piramide.gs` | spazi e allineamento |
| 13 | `13_rombo.gs` | cicli che salgono e scendono |
| 14 | `14_scacchiera.gs` | cicli annidati |
| 15 | `15_dado.gs` | `randint`, `loop` e `break` |

## Caso e statistica
| # | Programma | Cosa impari |
|---|---|---|
| 16 | `16_testa_o_croce.gs` | percentuali, grafici a barre |
| 17 | `17_indovina_il_numero.gs` | il primo vero gioco |
| 18 | `18_indovina_malvagio.gs` | un computer che "bara" in modo coerente |

## Matematica
| # | Programma | Cosa impari |
|---|---|---|
| 19 | `19_numeri_primi.gs` | i primi fino a 500 |
| 20 | `20_collatz.gs` | un mistero ancora irrisolto |
| 21 | `21_mcd_mcm.gs` | l'algoritmo di Euclide |
| 22 | `22_numeri_perfetti.gs` | 6, 28, 496, 8128 |

## Programmi interattivi
| # | Programma | Cosa impari |
|---|---|---|
| 23 | `23_quiz.gs` | punteggi |
| 24 | `24_sasso_carta_forbici.gs` | `if` dentro `if` |
| 25 | `25_bancomat.gs` | menu e tentativi |
| 26 | `26_temperature.gs` | tabelle allineate |
| 27 | `27_anno_bisestile.gs` | regole a cascata |

## Stupefacenti
| # | Programma | Cosa fa |
|---|---|---|
| 28 | `28_radice_di_due.gs` | √2 con **mille** cifre decimali |
| 29 | `29_sezione_aurea.gs` | il numero d'oro con 500 cifre |
| 30 | `30_pi_greco_casuale.gs` | π calcolato lanciando punti a caso |
| 31 | `31_mandelbrot.gs` | **il frattale di Mandelbrot** |
| 32 | `32_triangolo_di_sierpinski.gs` | un frattale nascosto nel triangolo di Tartaglia |
| 33 | `33_doppia_elica.gs` | la doppia elica del DNA |
| 34 | `34_giorno_della_settimana.gs` | che giorno era una data qualsiasi |
| 35 | `35_numeri_romani.gs` | da 2026 a MMXXVI |
| 36 | `36_binario.gs` | come contano i computer |

## Progetti completi
| # | Programma | Cosa fa |
|---|---|---|
| 37 | `37_numero_al_contrario.gs` | palindromi |
| 38 | `38_numeri_di_armstrong.gs` | 153 = 1³ + 5³ + 3³ |
| 39 | `39_nim.gs` | un avversario imbattibile |
| 40 | `40_avventura.gs` | **avventura testuale nel castello** |
| 41 | `41_tris.gs` | **tris contro il computer** |
| 42 | `42_triangolo_di_tartaglia.gs` | coefficienti binomiali |
| 43 | `43_tavola_pitagorica.gs` | tutte le tabelline |
| 44 | `44_salvadanaio.gs` | l'interesse composto |
| 45 | `45_secondi.gs` | da quanti secondi sei vivo |
| 46 | `46_numeri_felici.gs` | 7 → 49 → 97 → 130 → 10 → 1 |
| 47 | `47_due_dadi.gs` | la campana di Gauss con i dadi |
| 48 | `48_cuore.gs` | **un cuore disegnato da un'equazione** ♥ |

## Trucchi usati negli esempi
GrapeScript non ha ancora le parentesi, quindi i calcoli complessi si fanno a passi con variabili temporanee:

```
@ invece di (a + b) * c
s = a + b
r = s * c
```

E il resto della divisione si calcola così:

```
q = x / 10 -> int
resto = x - q * 10
```

Alcuni esempi usano simboli come ♥ ▲ █ ●. Se nel terminale vedi dei punti di domanda, usa **Windows Terminal** invece del vecchio prompt dei comandi.
