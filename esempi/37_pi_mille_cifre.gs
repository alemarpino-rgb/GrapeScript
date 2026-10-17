@ 37 - Pi greco con mille cifre (formula di Machin, 1706)
@   pi = 16 * arctan(1/5) - 4 * arctan(1/239)
@ L'arcotangente si calcola con la sua serie: x - x³/3 + x⁵/5 - x⁷/7 ...
@ Tutto con numeri interi "scalati" di 10^(cifre + 10), usando //,
@ quindi non si perde nemmeno una cifra.

cifre = input("Quante cifre? (prova 1000) ") -> int
scala = 10
repeat cifre + 9 {
    scala *= 10
}

@ calcola arctan(1/5) e arctan(1/239) con lo stesso codice, uno alla volta
divisori = [5, 239]
risultati = [0, 0]
d = 0
repeat 2 {
    x = divisori[d]
    x2 = x * x
    termine = scala // x
    somma = termine
    n = 1
    segno = 0 - 1
    loop {
        termine = termine // x2
        if termine == 0 {
            break
        }
        n += 2
        somma += segno * termine // n
        segno = 0 - segno
    }
    risultati[d] = somma
    d += 1
}

pi = 16 * risultati[0] - 4 * risultati[1]

@ toglie le 10 cifre di sicurezza in fondo
repeat 10 {
    pi = pi // 10
}

@ stampa a blocchi di 10 cifre, 50 per riga
testo = pi -> str
print("pi = 3.")
riga = ""
i = 1
repeat cifre {
    riga += testo[i]
    if i %% 10 {
        riga += " "
    }
    if i %% 50 {
        print("     " + riga)
        riga = ""
    }
    i += 1
}
if len(riga) > 0 {
    print("     " + riga)
}
