@ 24 - Istogramma: somma di due dadi
@ Una lista fa da "contatore" per ogni risultato possibile (da 2 a 12).
@ Il 7 esce più spesso perché ci sono più modi di ottenerlo.

lanci = 3600
conteggi = [0] * 13

repeat lanci {
    s = randint(1, 6) + randint(1, 6)
    conteggi[s] += 1
}

s = 2
repeat 11 {
    @ un # ogni 10 lanci
    lunghezza = conteggi[s] // 10
    barra = "#" * lunghezza
    if s < 10 {
        print(" " + s + " | " + barra + " " + conteggi[s])
    } else {
        print(s + " | " + barra + " " + conteggi[s])
    }
    s += 1
}
