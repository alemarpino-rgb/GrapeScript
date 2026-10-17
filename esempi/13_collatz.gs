@ 13 - Congettura di Collatz
@ Se n è pari si divide per 2, se è dispari diventa 3n + 1.
@ Si pensa che si arrivi sempre a 1, ma nessuno l'ha mai dimostrato.

n = input("Numero di partenza (prova 27): ") -> int
passi = 0
massimo = n
sequenza = [n]

loop {
    if n == 1 {
        break
    }
    if n %% 2 {
        n = n // 2
    } else {
        n = 3 * n + 1
    }
    sequenza += [n]
    if n > massimo {
        massimo = n
    }
    passi += 1
}

print(sequenza)
print("Passi: " + passi)
print("Valore massimo raggiunto: " + massimo)
