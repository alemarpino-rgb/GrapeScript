@ 21 - Invertire e ruotare una lista
@ Due operazioni classiche fatte "a mano", scambiando gli elementi.

lista = [1, 2, 3, 4, 5, 6, 7, 8]
print("Originale: " + lista)

@ inverte: scambia il primo con l'ultimo, il secondo col penultimo...
i = 0
j = len(lista) - 1
loop {
    if i >= j {
        break
    }
    tmp = lista[i]
    lista[i] = lista[j]
    lista[j] = tmp
    i += 1
    j -= 1
}
print("Invertita: " + lista)

@ ruota a sinistra di k posizioni: l'elemento i va nella posizione i - k
@ (riparte dalla lista in ordine, così si vede meglio)
lista = [1, 2, 3, 4, 5, 6, 7, 8]
k = 3
n = len(lista)
ruotata = [0] * n
i = 0
repeat n {
    nuova = i - k + n
    ruotata[nuova % n] = lista[i]
    i += 1
}
print("Ruotata di " + k + ": " + ruotata)
