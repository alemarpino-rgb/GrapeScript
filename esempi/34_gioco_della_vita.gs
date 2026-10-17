@ 34 - Il Gioco della vita (John Conway, 1970)
@ Ogni cella è viva o morta. Ad ogni generazione:
@   - una cella viva con 2 o 3 vicine vive sopravvive, altrimenti muore
@   - una cella morta con esattamente 3 vicine vive nasce
@ Qui parte il "cannone di Gosper", che spara alianti all'infinito.

righe = 24
colonne = 50

@ griglia vuota: una lista di righe, ogni riga è una lista di 0
griglia = []
r = 0
repeat righe {
    griglia += [[0] * colonne]
    r += 1
}

@ coordinate (riga, colonna) delle celle vive del cannone
vive = [[5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13], [3, 14], [9, 14], [6, 15], [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18], [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36]]
i = 0
repeat len(vive) {
    griglia[vive[i][0]][vive[i][1]] = 1
    i += 1
}

generazione = 0
repeat 91 {
    @ stampa solo ogni 30 generazioni
    if generazione %% 30 {
        print("Generazione " + generazione + ":")
        r = 0
        repeat righe {
            riga = ""
            c = 0
            repeat colonne {
                if griglia[r][c] == 1 {
                    riga += "#"
                } else {
                    riga += "."
                }
                c += 1
            }
            print(riga)
            r += 1
        }
        print("")
    }

    @ calcola la generazione dopo in una griglia nuova
    nuova = []
    r = 0
    repeat righe {
        nuova += [[0] * colonne]
        r += 1
    }
    r = 1
    repeat righe - 2 {
        c = 1
        repeat colonne - 2 {
            @ conta le 8 vicine
            vicine = griglia[r - 1][c - 1] + griglia[r - 1][c] + griglia[r - 1][c + 1]
            vicine += griglia[r][c - 1] + griglia[r][c + 1]
            vicine += griglia[r + 1][c - 1] + griglia[r + 1][c] + griglia[r + 1][c + 1]
            if vicine == 3 {
                nuova[r][c] = 1
            } elif vicine == 2 {
                nuova[r][c] = griglia[r][c]
            }
            c += 1
        }
        r += 1
    }
    griglia = nuova
    generazione += 1
}
