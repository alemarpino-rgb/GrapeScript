@ 11 - Crivello di Eratostene
@ Trova tutti i primi fino a N "cancellando" i multipli.
@ Si usa una lista di N+1 elementi: 1 = forse primo, 0 = cancellato.

N = 300
crivello = [1] * N + [1]
crivello[0] = 0
crivello[1] = 0

p = 2
loop {
    if p * p > N {
        break
    }
    @ se p non è stato cancellato, cancella i suoi multipli
    if crivello[p] == 1 {
        m = p * p
        loop {
            if m > N {
                break
            }
            crivello[m] = 0
            m += p
        }
    }
    p += 1
}

@ raccoglie i primi in una lista
primi = []
i = 0
repeat N + 1 {
    if crivello[i] == 1 {
        primi += [i]
    }
    i += 1
}
print(primi)
print("Ci sono " + len(primi) + " primi fino a " + N)
