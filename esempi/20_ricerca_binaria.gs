@ 20 - Ricerca binaria
@ In una lista ordinata si guarda l'elemento in mezzo e si butta
@ via la metà sbagliata. Con 1000 elementi bastano al massimo 10 passi.

@ costruisce la lista dei quadrati: 1, 4, 9, 16, ...
quadrati = []
i = 1
repeat 1000 {
    quadrati += [i * i]
    i += 1
}

cercato = input("Che numero cerchi tra i quadrati da 1 a 1000000? ") -> int

basso = 0
alto = len(quadrati) - 1
passi = 0
trovato = 0 - 1
loop {
    if basso > alto {
        break
    }
    passi += 1
    mezzo = basso + alto
    mezzo = mezzo // 2
    print("passo " + passi + ": guardo la posizione " + mezzo + " (" + quadrati[mezzo] + ")")
    if quadrati[mezzo] == cercato {
        trovato = mezzo
        break
    } elif quadrati[mezzo] < cercato {
        basso = mezzo + 1
    } else {
        alto = mezzo - 1
    }
}

if trovato >= 0 {
    radice = trovato + 1
    print("Trovato! " + cercato + " è il quadrato di " + radice)
} else {
    print(cercato + " non è un quadrato perfetto")
}
