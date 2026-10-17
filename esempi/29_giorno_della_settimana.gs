@ 29 - Giorno della settimana
@ La formula di Zeller trova il giorno di qualsiasi data del calendario gregoriano.
@ Gennaio e febbraio contano come mesi 13 e 14 dell'anno prima.

giorni = ["sabato", "domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì"]

g = input("Giorno: ") -> int
m = input("Mese: ") -> int
a = input("Anno: ") -> int

mm = m
aa = a
if mm < 3 {
    mm += 12
    aa -= 1
}
k = aa % 100
j = aa // 100

h = 13 * mm + 13
h = h // 5
h += g + k + k // 4 + j // 4 + 5 * j
h = h % 7

print(g + "/" + m + "/" + a + " è (o era) " + giorni[h])
