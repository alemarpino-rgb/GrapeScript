@ 33 - Tris contro il computer
@ La scacchiera è una lista di 9 caselle, le 8 linee vincenti sono una lista di liste.
@ Il computer: 1) vince se può, 2) blocca se deve, 3) prende il centro, 4) gioca a caso.
@ Caselle:  1 | 2 | 3
@           4 | 5 | 6
@           7 | 8 | 9

b = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
linee = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
turno = "X"
mosse = 0

loop {
    @ disegna la scacchiera
    print("")
    print(" " + b[0] + " | " + b[1] + " | " + b[2])
    print("---+---+---")
    print(" " + b[3] + " | " + b[4] + " | " + b[5])
    print("---+---+---")
    print(" " + b[6] + " | " + b[7] + " | " + b[8])

    if turno == "X" {
        @ mossa dell'utente
        p = input("La tua mossa (1-9): ") -> int
        p -= 1
        valida = 0
        if p >= 0 {
            if p <= 8 {
                if b[p] == " " {
                    valida = 1
                }
            }
        }
        if valida == 0 {
            print("Casella non valida")
        }
    } else {
        @ mossa del computer: cerca una linea con due simboli uguali e una casella vuota
        p = 0 - 1
        cerca = ["O", "X"]          @ prima prova a vincere (O), poi a bloccare (X)
        c = 0
        repeat 2 {
            if p < 0 {
                simbolo = cerca[c]
                l = 0
                repeat len(linee) {
                    uguali = 0
                    vuota = 0 - 1
                    k = 0
                    repeat 3 {
                        casella = linee[l][k]
                        if b[casella] == simbolo {
                            uguali += 1
                        } elif b[casella] == " " {
                            vuota = casella
                        }
                        k += 1
                    }
                    if uguali == 2 {
                        if vuota >= 0 {
                            p = vuota
                        }
                    }
                    l += 1
                }
            }
            c += 1
        }
        if p < 0 {
            if b[4] == " " {
                p = 4
            }
        }
        @ altrimenti a caso, finchè non trova una casella libera
        loop {
            if p >= 0 {
                break
            }
            prova = randint(0, 8)
            if b[prova] == " " {
                p = prova
            }
        }
        casella_umana = p + 1
        print("Il computer gioca in " + casella_umana)
        valida = 1
    }

    if valida == 1 {
        b[p] = turno
        mosse += 1

        @ controlla se qualcuno ha fatto tris
        vinto = 0
        l = 0
        repeat len(linee) {
            if b[linee[l][0]] == turno {
                if b[linee[l][1]] == turno {
                    if b[linee[l][2]] == turno {
                        vinto = 1
                    }
                }
            }
            l += 1
        }

        if vinto == 1 {
            print("")
            print(" " + b[0] + " | " + b[1] + " | " + b[2])
            print("---+---+---")
            print(" " + b[3] + " | " + b[4] + " | " + b[5])
            print("---+---+---")
            print(" " + b[6] + " | " + b[7] + " | " + b[8])
            if turno == "X" {
                print("Hai vinto!")
            } else {
                print("Ha vinto il computer")
            }
            break
        }
        if mosse == 9 {
            print("Pareggio")
            break
        }
        if turno == "X" {
            turno = "O"
        } else {
            turno = "X"
        }
    }
}
