@ 26 - Contare le vocali
@ Per ogni lettera del testo cerca se è una delle vocali,
@ e incrementa il contatore giusto nella lista conteggi.

vocali = "aeiou"
conteggi = [0, 0, 0, 0, 0]

testo = input("Scrivi una frase in minuscolo: ")

i = 0
repeat len(testo) {
    @ cerca la lettera tra le vocali
    v = 0
    repeat len(vocali) {
        if testo[i] == vocali[v] {
            conteggi[v] += 1
        }
        v += 1
    }
    i += 1
}

totale = 0
v = 0
repeat len(vocali) {
    print(vocali[v] + ": " + "*" * conteggi[v] + " " + conteggi[v])
    totale += conteggi[v]
    v += 1
}
print("Vocali in tutto: " + totale + " su " + len(testo) + " caratteri")
