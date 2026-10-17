@ 18 - Statistiche su una lista di voti
@ Scorre la lista una volta sola e tiene somma, minimo e massimo.

voti = [7, 8.5, 6, 9, 5.5, 7.5, 8, 10, 6.5, 7]

somma = 0
minimo = voti[0]
massimo = voti[0]
i = 0
repeat len(voti) {
    v = voti[i]
    somma += v
    if v < minimo {
        minimo = v
    }
    if v > massimo {
        massimo = v
    }
    i += 1
}

media = somma / len(voti)
@ arrotonda a 2 decimali: moltiplica, aggiunge mezzo, toglie i decimali, divide
media = media * 100 + 0.5
media = media // 1 / 100

print("Voti:    " + voti)
print("Numero:  " + len(voti))
print("Media:   " + media)
print("Minimo:  " + minimo)
print("Massimo: " + massimo)

@ quanti sono sopra la media
sopra = []
i = 0
repeat len(voti) {
    if voti[i] > media {
        sopra += [voti[i]]
    }
    i += 1
}
print("Sopra la media: " + sopra)
