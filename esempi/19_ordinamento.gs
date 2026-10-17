@ 19 - Ordinamento (bubble sort)
@ Confronta gli elementi vicini e li scambia se sono in ordine sbagliato.
@ Dopo ogni passata il più grande "galleggia" in fondo, come una bolla.

lista = []
repeat 12 {
    lista += [randint(1, 99)]
}
print("Prima: " + lista)

n = len(lista)
scambi = 0
passata = 0
repeat n - 1 {
    i = 0
    @ gli ultimi "passata" elementi sono già al loro posto
    repeat n - 1 - passata {
        if lista[i] > lista[i + 1] {
            tmp = lista[i]
            lista[i] = lista[i + 1]
            lista[i + 1] = tmp
            scambi += 1
        }
        i += 1
    }
    passata += 1
}

print("Dopo:  " + lista)
print("Scambi fatti: " + scambi)
