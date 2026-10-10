@ 20 - La congettura di Collatz
@ Se n è pari dividilo per 2, se è dispari fai 3n + 1.
@ Nessuno ha mai dimostrato che si arriva sempre a 1!
@ Prova con 27: fa un viaggio incredibile.

n = input("Numero di partenza: ") -> int
passi = 0
massimo = n
loop {
    barra = n / 100 -> int
    print(n + " " + "▪" * barra)
    if n == 1 {
        break
    }
    if n %% 2 {
        n = n / 2 -> int
    } else {
        n = 3 * n + 1
    }
    if n > massimo {
        massimo = n
    }
    passi = passi + 1
}
print("")
print("Arrivato a 1 in " + passi + " passi.")
print("Il valore più alto raggiunto è " + massimo + ".")
