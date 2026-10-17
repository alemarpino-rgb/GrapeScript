@ 27 - Cifrario di Cesare
@ Ogni lettera viene spostata avanti di "chiave" posizioni nell'alfabeto.
@ Per decifrare basta spostarla indietro (cioè avanti di 26 - chiave).

alfabeto = "abcdefghijklmnopqrstuvwxyz"

testo = input("Testo (in minuscolo): ")
chiave = input("Chiave (1-25): ") -> int

cifrato = ""
i = 0
repeat len(testo) {
    c = testo[i]
    @ cerca la posizione della lettera nell'alfabeto
    pos = 0 - 1
    k = 0
    repeat 26 {
        if alfabeto[k] == c {
            pos = k
        }
        k += 1
    }
    @ se non è una lettera (spazio, punto...) la lascia com'è
    if pos >= 0 {
        nuova = pos + chiave
        cifrato += alfabeto[nuova % 26]
    } else {
        cifrato += c
    }
    i += 1
}
print("Cifrato:   " + cifrato)

@ decifra con la chiave opposta, per controllo
inversa = 26 - chiave
chiaro = ""
i = 0
repeat len(cifrato) {
    c = cifrato[i]
    pos = 0 - 1
    k = 0
    repeat 26 {
        if alfabeto[k] == c {
            pos = k
        }
        k += 1
    }
    if pos >= 0 {
        nuova = pos + inversa
        chiaro += alfabeto[nuova % 26]
    } else {
        chiaro += c
    }
    i += 1
}
print("Decifrato: " + chiaro)
