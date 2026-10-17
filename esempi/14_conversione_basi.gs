@ 14 - Conversione di base
@ Si divide per la base e si prendono i resti, dall'ultimo al primo.
@ Le cifre si leggono da un testo con l'indice: "0123456789ABCDEF"[r]

cifre = "0123456789ABCDEF"
n = input("Numero da convertire: ") -> int

basi = [2, 8, 16]
k = 0
repeat len(basi) {
    base = basi[k]
    x = n
    risultato = ""
    if x == 0 {
        risultato = "0"
    }
    loop {
        if x == 0 {
            break
        }
        risultato = cifre[x % base] + risultato
        x = x // base
    }
    print(n + " in base " + base + " = " + risultato)
    k += 1
}
