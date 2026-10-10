@ 41 - Tris (tic-tac-toe)
@ Tu sei X, il computer è O. Le caselle sono numerate così:
@  1 | 2 | 3
@  4 | 5 | 6
@  7 | 8 | 9

c1 = " "
c2 = " "
c3 = " "
c4 = " "
c5 = " "
c6 = " "
c7 = " "
c8 = " "
c9 = " "
turno = "X"
mosse = 0

print("Tu sei X. Caselle numerate da 1 a 9, come il tastierino del telefono.")
loop {
    print("")
    print(" " + c1 + " | " + c2 + " | " + c3)
    print("---+---+---")
    print(" " + c4 + " | " + c5 + " | " + c6)
    print("---+---+---")
    print(" " + c7 + " | " + c8 + " | " + c9)
    print("")

    @ sceglie la casella
    if turno == "X" {
        p = input("La tua mossa (1-9): ") -> int
    } else {
        if c5 == " " {
            p = 5
        } else {
            p = randint(1, 9)
        }
    }

    @ legge cosa c'è nella casella scelta
    if p == 1 {
        v = c1
    } elif p == 2 {
        v = c2
    } elif p == 3 {
        v = c3
    } elif p == 4 {
        v = c4
    } elif p == 5 {
        v = c5
    } elif p == 6 {
        v = c6
    } elif p == 7 {
        v = c7
    } elif p == 8 {
        v = c8
    } elif p == 9 {
        v = c9
    } else {
        v = "?"
    }

    if v == " " {
        if p == 1 {
            c1 = turno
        } elif p == 2 {
            c2 = turno
        } elif p == 3 {
            c3 = turno
        } elif p == 4 {
            c4 = turno
        } elif p == 5 {
            c5 = turno
        } elif p == 6 {
            c6 = turno
        } elif p == 7 {
            c7 = turno
        } elif p == 8 {
            c8 = turno
        } else {
            c9 = turno
        }
        if turno == "O" {
            print("Il computer gioca in " + p)
        }
        mosse = mosse + 1

        @ controlla le 8 linee vincenti
        vinto = 0
        if c1 == turno {
            if c2 == turno {
                if c3 == turno {
                    vinto = 1
                }
            }
            if c4 == turno {
                if c7 == turno {
                    vinto = 1
                }
            }
            if c5 == turno {
                if c9 == turno {
                    vinto = 1
                }
            }
        }
        if c5 == turno {
            if c4 == turno {
                if c6 == turno {
                    vinto = 1
                }
            }
            if c2 == turno {
                if c8 == turno {
                    vinto = 1
                }
            }
            if c3 == turno {
                if c7 == turno {
                    vinto = 1
                }
            }
        }
        if c9 == turno {
            if c7 == turno {
                if c8 == turno {
                    vinto = 1
                }
            }
            if c3 == turno {
                if c6 == turno {
                    vinto = 1
                }
            }
        }

        if vinto == 1 {
            print(" " + c1 + " | " + c2 + " | " + c3)
            print("---+---+---")
            print(" " + c4 + " | " + c5 + " | " + c6)
            print("---+---+---")
            print(" " + c7 + " | " + c8 + " | " + c9)
            print("")
            if turno == "X" {
                print("TRIS! Hai vinto!")
            } else {
                print("Tris del computer... hai perso!")
            }
            break
        }
        if mosse == 9 {
            print("Pareggio!")
            break
        }
        if turno == "X" {
            turno = "O"
        } else {
            turno = "X"
        }
    } elif turno == "X" {
        print("Casella non valida o già occupata, riprova.")
    }
}
