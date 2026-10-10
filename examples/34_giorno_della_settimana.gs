@ 34 - Che giorno della settimana era?
@ La formula di Zeller trova il giorno della settimana di
@ qualsiasi data del calendario gregoriano. Prova con la tua nascita!

g = input("Giorno (1-31): ") -> int
m = input("Mese (1-12): ") -> int
a = input("Anno: ") -> int

mm = m
aa = a
if mm < 3 {
    mm = mm + 12
    aa = aa - 1
}
j = aa / 100 -> int
k = aa - j * 100
t1 = 13 * mm + 13
t1 = t1 / 5 -> int
t2 = k / 4 -> int
t3 = j / 4 -> int
h = g + t1 + k + t2 + t3 + 5 * j
q = h / 7 -> int
h = h - q * 7

if h == 0 {
    nome = "sabato"
} elif h == 1 {
    nome = "domenica"
} elif h == 2 {
    nome = "lunedì"
} elif h == 3 {
    nome = "martedì"
} elif h == 4 {
    nome = "mercoledì"
} elif h == 5 {
    nome = "giovedì"
} else {
    nome = "venerdì"
}
print("Il " + g + "/" + m + "/" + a + " era (o sarà) di " + nome + "!")
