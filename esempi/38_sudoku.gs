@ 38 - Risolutore di Sudoku (backtracking)
@ Prova i numeri da 1 a 9 nella prima casella vuota; se nessuno va bene
@ torna indietro alla casella prima e prova il numero successivo.
@ Senza funzioni né ricorsione: l'indice k fa da "pila" delle caselle vuote.
@ Ci mette qualche secondo.

schema = "530070000600195000098000060800060003400803001700020006060000280000419005000080079"

@ trasforma il testo in una lista di 81 numeri
g = [0] * 81
i = 0
repeat 81 {
    g[i] = schema[i] -> int
    i += 1
}

@ elenco delle caselle vuote
vuote = []
i = 0
repeat 81 {
    if g[i] == 0 {
        vuote += [i]
    }
    i += 1
}
print("Caselle da riempire: " + len(vuote))

k = 0
tentativi = 0
loop {
    if k == len(vuote) {
        break
    }
    if k < 0 {
        break
    }
    pos = vuote[k]
    r = pos // 9
    c = pos % 9
    br = r // 3 * 3
    bc = c // 3 * 3

    @ prova il numero dopo quello che c'è già
    v = g[pos] + 1
    loop {
        if v > 9 {
            @ nessun numero va bene: svuota e torna indietro
            g[pos] = 0
            k -= 1
            break
        }
        tentativi += 1
        @ controlla riga, colonna e quadrato 3x3
        ok = 1
        i = 0
        repeat 9 {
            if g[r * 9 + i] == v {
                ok = 0
            }
            if g[i * 9 + c] == v {
                ok = 0
            }
            rr = br + i // 3
            cc = bc + i % 3
            if g[rr * 9 + cc] == v {
                ok = 0
            }
            @ appena trova un conflitto smette di controllare
            if ok == 0 {
                break
            }
            i += 1
        }
        if ok == 1 {
            g[pos] = v
            k += 1
            break
        }
        v += 1
    }
}

if k < 0 {
    print("Questo sudoku non ha soluzione")
} else {
    print("Risolto con " + tentativi + " tentativi:")
    print("")
    r = 0
    repeat 9 {
        if r %% 3 {
            if r > 0 {
                print("------+-------+------")
            }
        }
        riga = ""
        c = 0
        repeat 9 {
            if c %% 3 {
                if c > 0 {
                    riga += "| "
                }
            }
            riga += g[r * 9 + c] + " "
            c += 1
        }
        print(riga)
        r += 1
    }
}
