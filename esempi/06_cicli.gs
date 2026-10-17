@ 06 - Cicli
@ repeat ripete un numero preciso di volte,
@ loop ripete all'infinito finchè non trova un break.

@ conta da 1 a 5
i = 1
repeat 5 {
    print(i)
    i += 1
}

@ somma i numeri finchè il totale non supera 100
totale = 0
n = 0
loop {
    n += 1
    totale += n
    if totale > 100 {
        break
    }
}
print("Sommando da 1 a " + n + " si supera 100: totale " + totale)
