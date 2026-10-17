@ 40 - Un motore di scacchi in GrapeScript
@
@ Tu giochi con il bianco (lettere maiuscole), il computer con il nero.
@ Le mosse si scrivono come casa di partenza + casa di arrivo: es e2e4, g1f3
@ Pezzi: R re, D donna, T torre, A alfiere, C cavallo, P pedone
@ Mancano (per ora): arrocco, presa en passant e la patta per ripetizione.
@ Il pedone che arriva in fondo diventa sempre donna.
@
@ Come funziona:
@ GrapeScript non ha funzioni, quindi il programma è una "macchina a stati":
@ un unico loop che guarda la variabile fase e fa un pezzo di lavoro alla volta.
@ es fase = "genera" calcola tutte le mosse possibili e poi torna alla fase
@ scritta in ritorno, proprio come farebbe una funzione.
@ La ricerca della mossa migliore è un negamax con potatura alfa-beta, e al
@ posto della ricorsione usa una pila fatta di liste: idx[d], best[d]... dove d
@ è la profondità a cui sta pensando.

@ ===================== LA SCACCHIERA =====================
@ 120 caselle (10 colonne x 12 righe): il bordo di caselle "fuori" (7) evita
@ di controllare ogni volta se un pezzo esce dalla scacchiera.
@ Codici: 0 vuota, 1-6 pezzi bianchi, 9-14 pezzi neri (8 + tipo), 7 fuori
@ Tipi:   1 pedone, 2 cavallo, 3 alfiere, 4 torre, 5 donna, 6 re
@ La casa a8 è la 21, h8 la 28, a1 la 91, h1 la 98.

b = [7] * 120
bianchi = [4, 2, 3, 5, 6, 3, 2, 4]
c = 0
repeat 8 {
    b[21 + c] = bianchi[c] + 8
    b[31 + c] = 9
    b[41 + c] = 0
    b[51 + c] = 0
    b[61 + c] = 0
    b[71 + c] = 0
    b[81 + c] = 1
    b[91 + c] = bianchi[c]
    c += 1
}

@ colore di ogni codice: 0 bianco, 1 nero, 2 vuota, 3 fuori
colore = [2, 0, 0, 0, 0, 0, 0, 3, 2, 1, 1, 1, 1, 1, 1]

@ valore dei pezzi: positivo per il bianco, negativo per il nero
valore = [0, 100, 320, 330, 500, 900, 20000, 0, 0, 0, 0, 0, 0, 0, 0]
t = 1
repeat 6 {
    valore[t + 8] = 0 - valore[t]
    t += 1
}

@ bonus per stare al centro (pedoni, cavalli, alfieri e un po' la donna)
peso_centro = [0, 3, 3, 2, 0, 1, 0, 0, 0, 3, 3, 2, 0, 1, 0]
centro = [0] * 120
r = 0
repeat 8 {
    c = 0
    repeat 8 {
        if c < 4 {
            dc = 3 - c
        } else {
            dc = c - 4
        }
        if r < 4 {
            dr = 3 - r
        } else {
            dr = r - 4
        }
        centro[21 + c + r * 10] = 6 - dc - dr
        c += 1
    }
    r += 1
}

@ direzioni di movimento (in caselle della lista da 120)
cavallo = [0 - 21, 0 - 19, 0 - 12, 0 - 8, 8, 12, 19, 21]
diagonali = [0 - 11, 0 - 9, 9, 11]
dritte = [0 - 10, 0 - 1, 1, 10]
tutte = diagonali + dritte
direzioni = [[], [], cavallo, diagonali, dritte, tutte, tutte]

lettere = "abcdefgh"
numeri = "12345678"
simboli = [".", "P", "C", "A", "T", "D", "R", "", "", "p", "c", "a", "t", "d", "r"]

INFINITO = 1000000
MATTO = 100000

@ la "pila" della ricerca: un elemento per ogni livello di profondità
mosse_liv = [[], [], [], [], [], [], [], []]
idx = [0] * 8
best = [0] * 8
alfa = [0] * 8
beta = [0] * 8
lato_liv = [0] * 8
s_da = [0] * 8
s_a = [0] * 8
s_mosso = [0] * 8
s_catt = [0] * 8
s_punt = [0] * 8

punteggio = 0          @ valutazione della posizione dal punto di vista del bianco
nodi = 0

print("=== SCACCHI IN GRAPESCRIPT ===")
@ livello 1 risponde in un attimo, livello 3 può pensare anche un minuto a mossa
livello = input("Livello del computer (1 facile, 2 medio, 3 difficile): ") -> int
if livello < 1 {
    livello = 1
}
if livello > 3 {
    livello = 3
}
@ quante mezze mosse guarda avanti: per vedere un matto ne servono almeno 3
@ (la sua mossa, la risposta, la presa del re)
profondita_computer = livello + 2
print("Scrivi le mosse come e2e4. Scrivi esci per uscire.")

fase = "mostra"

@ ===================== IL LOOP PRINCIPALE =====================
loop {

    @ ---------- GENERA: tutte le mosse del lato lato_gen ----------
    @ (le prese vanno per prime: così l'alfa-beta taglia di più)
    if fase == "genera" {
        catture = []
        quiete = []
        nemico = 1 - lato_gen
        if lato_gen == 0 {
            avanti = 0 - 10
        } else {
            avanti = 10
        }
        sq = 21
        repeat 78 {
            p = b[sq]
            if colore[p] == lato_gen {
                t = p % 8
                if t == 1 {
                    @ pedone: un passo avanti se libero...
                    a = sq + avanti
                    if b[a] == 0 {
                        quiete += [sq * 128 + a]
                        @ ...e due passi dalla casa di partenza
                        partenza = 0
                        if lato_gen == 0 {
                            if sq >= 81 {
                                partenza = 1
                            }
                        } elif sq <= 38 {
                            partenza = 1
                        }
                        if partenza == 1 {
                            a2 = a + avanti
                            if b[a2] == 0 {
                                quiete += [sq * 128 + a2]
                            }
                        }
                    }
                    @ prese in diagonale
                    a = sq + avanti - 1
                    if colore[b[a]] == nemico {
                        catture += [sq * 128 + a]
                    }
                    a = sq + avanti + 1
                    if colore[b[a]] == nemico {
                        catture += [sq * 128 + a]
                    }
                } else {
                    @ gli altri pezzi: alfiere, torre e donna scivolano, cavallo e re no
                    dirs = direzioni[t]
                    scivola = 0
                    if t >= 3 {
                        if t <= 5 {
                            scivola = 1
                        }
                    }
                    k = 0
                    repeat len(dirs) {
                        dd = dirs[k]
                        a = sq + dd
                        loop {
                            cq = colore[b[a]]
                            if cq == 2 {
                                quiete += [sq * 128 + a]
                                if scivola == 0 {
                                    break
                                }
                                a += dd
                            } elif cq == nemico {
                                catture += [sq * 128 + a]
                                break
                            } else {
                                break
                            }
                        }
                        k += 1
                    }
                }
            }
            sq += 1
        }
        mosse_gen = catture + quiete
        fase = ritorno

    @ ---------- CERCA: un passo della ricerca negamax con alfa-beta ----------
    } elif fase == "cerca" {
        aggiorna = 0
        if idx[d] >= len(mosse_liv[d]) {
            @ finite le mosse di questo livello
            if d == 0 {
                fase = ritorno_cerca
            } else {
                figlio = best[d]
                d -= 1
                @ disfa la mossa che aveva portato al livello sotto
                b[s_da[d]] = s_mosso[d]
                b[s_a[d]] = s_catt[d]
                punteggio = s_punt[d]
                val = 0 - figlio
                aggiorna = 1
            }
        } else {
            @ fa la prossima mossa di questo livello
            m = mosse_liv[d][idx[d]]
            da = m // 128
            a = m % 128
            mosso = b[da]
            catt = b[a]
            s_da[d] = da
            s_a[d] = a
            s_mosso[d] = mosso
            s_catt[d] = catt
            s_punt[d] = punteggio
            nodi += 1

            @ aggiorna la valutazione: materiale, posizione, promozione
            punteggio -= valore[catt]
            pc = peso_centro[catt] * centro[a] * 3
            if colore[catt] == 0 {
                punteggio -= pc
            } elif colore[catt] == 1 {
                punteggio += pc
            }
            spostamento = centro[a] - centro[da]
            delta = peso_centro[mosso] * spostamento * 3
            if colore[mosso] == 0 {
                punteggio += delta
            } else {
                punteggio -= delta
            }
            b[a] = mosso
            b[da] = 0
            if mosso == 1 {
                if a <= 28 {
                    b[a] = 5
                    punteggio += 800
                }
            } elif mosso == 9 {
                if a >= 91 {
                    b[a] = 13
                    punteggio -= 800
                }
            }

            if catt % 8 == 6 {
                @ ha mangiato il re: la partita (in questo ramo) è vinta
                val = MATTO - d * 10
                b[da] = mosso
                b[a] = catt
                punteggio = s_punt[d]
                aggiorna = 1
            } elif d + 1 == profondita {
                @ ultimo livello: valuta la posizione e torna indietro
                if lato_liv[d] == 0 {
                    val = punteggio
                } else {
                    val = 0 - punteggio
                }
                b[da] = mosso
                b[a] = catt
                punteggio = s_punt[d]
                aggiorna = 1
            } else {
                @ scende di un livello: tocca all'altro giocatore
                d += 1
                lato_liv[d] = 1 - lato_liv[d - 1]
                alfa[d] = 0 - beta[d - 1]
                beta[d] = 0 - alfa[d - 1]
                lato_gen = lato_liv[d]
                ritorno = "cerca_dopo_genera"
                fase = "genera"
            }
        }

        if aggiorna == 1 {
            if val > best[d] {
                best[d] = val
                if d == 0 {
                    migliore = mosse_liv[0][idx[0]]
                }
            }
            if val > alfa[d] {
                alfa[d] = val
            }
            @ potatura: questa strada è già peggiore di una trovata prima
            if alfa[d] >= beta[d] {
                idx[d] = len(mosse_liv[d])
            } else {
                idx[d] += 1
            }
        }

    } elif fase == "cerca_dopo_genera" {
        mosse_liv[d] = mosse_gen
        idx[d] = 0
        best[d] = 0 - INFINITO
        fase = "cerca"

    @ ---------- inizio di una ricerca dal lato lato_radice ----------
    } elif fase == "cerca_inizio" {
        d = 0
        lato_liv[0] = lato_radice
        alfa[0] = 0 - INFINITO
        beta[0] = INFINITO
        migliore = 0
        nodi = 0
        lato_gen = lato_radice
        ritorno = "cerca_dopo_genera"
        fase = "genera"

    @ ---------- FAI: esegue davvero la mossa mossa_da_fare ----------
    } elif fase == "fai" {
        da = mossa_da_fare // 128
        a = mossa_da_fare % 128
        u_da = da
        u_a = a
        u_mosso = b[da]
        u_catt = b[a]
        u_punt = punteggio
        punteggio -= valore[u_catt]
        pc = peso_centro[u_catt] * centro[a] * 3
        if colore[u_catt] == 0 {
            punteggio -= pc
        } elif colore[u_catt] == 1 {
            punteggio += pc
        }
        spostamento = centro[a] - centro[da]
        delta = peso_centro[u_mosso] * spostamento * 3
        if colore[u_mosso] == 0 {
            punteggio += delta
        } else {
            punteggio -= delta
        }
        b[a] = u_mosso
        b[da] = 0
        if u_mosso == 1 {
            if a <= 28 {
                b[a] = 5
                punteggio += 800
            }
        } elif u_mosso == 9 {
            if a >= 91 {
                b[a] = 13
                punteggio -= 800
            }
        }
        @ scrive la mossa in notazione: es e2e4
        x = da - 21
        n1 = 8 - x // 10
        testo_mossa = lettere[x % 10] + n1
        x = a - 21
        n2 = 8 - x // 10
        testo_mossa += lettere[x % 10] + n2
        fase = ritorno_fai

    @ ---------- MOSTRA la scacchiera ----------
    } elif fase == "mostra" {
        print("")
        r = 0
        repeat 8 {
            numero_riga = 8 - r
            riga = numero_riga + "  "
            c = 0
            repeat 8 {
                riga += simboli[b[21 + c + r * 10]] + " "
                c += 1
            }
            print(riga)
            r += 1
        }
        print("   a b c d e f g h")
        fase = "umano"

    @ ---------- UMANO: legge e controlla la mossa del giocatore ----------
    } elif fase == "umano" {
        testo = input("La tua mossa: ")
        if testo == "esci" {
            break
        }
        @ trasforma es "e2e4" in due case
        valida = 0
        if len(testo) == 4 {
            col_da = 0 - 1
            col_a = 0 - 1
            riga_da = 0 - 1
            riga_a = 0 - 1
            i = 0
            repeat 8 {
                if testo[0] == lettere[i] {
                    col_da = i
                }
                if testo[2] == lettere[i] {
                    col_a = i
                }
                if testo[1] == numeri[i] {
                    riga_da = i
                }
                if testo[3] == numeri[i] {
                    riga_a = i
                }
                i += 1
            }
            if col_da >= 0 {
                if col_a >= 0 {
                    if riga_da >= 0 {
                        if riga_a >= 0 {
                            valida = 1
                        }
                    }
                }
            }
        }
        if valida == 0 {
            print("Scrivi la mossa così: e2e4")
        } else {
            casa_da = 21 + col_da + 70 - riga_da * 10
            casa_a = 21 + col_a + 70 - riga_a * 10
            mossa_umana = casa_da * 128 + casa_a
            lato_gen = 0
            ritorno = "umano_controlla"
            fase = "genera"
        }

    } elif fase == "umano_controlla" {
        @ la mossa è tra quelle possibili?
        trovata = 0
        i = 0
        repeat len(mosse_gen) {
            if mosse_gen[i] == mossa_umana {
                trovata = 1
            }
            i += 1
        }
        if trovata == 0 {
            print("Mossa non valida")
            fase = "umano"
        } else {
            mossa_da_fare = mossa_umana
            ritorno_fai = "umano_scacco"
            fase = "fai"
        }

    } elif fase == "umano_scacco" {
        @ dopo la mossa, il nero potrebbe mangiare il re bianco? allora non vale
        lato_gen = 1
        ritorno = "umano_scacco_verifica"
        fase = "genera"

    } elif fase == "umano_scacco_verifica" {
        sotto_scacco = 0
        i = 0
        repeat len(mosse_gen) {
            if b[mosse_gen[i] % 128] == 6 {
                sotto_scacco = 1
            }
            i += 1
        }
        if sotto_scacco == 1 {
            @ annulla la mossa
            b[u_da] = u_mosso
            b[u_a] = u_catt
            punteggio = u_punt
            print("Mossa non valida: il tuo re resterebbe sotto scacco")
            fase = "umano"
        } else {
            fase = "computer"
        }

    @ ---------- COMPUTER: cerca e gioca la mossa migliore ----------
    } elif fase == "computer" {
        print("Il computer pensa...")
        lato_radice = 1
        profondita = profondita_computer
        ritorno_cerca = "computer_gioca"
        fase = "cerca_inizio"

    } elif fase == "computer_gioca" {
        if best[0] <= 0 - MATTO + 100 {
            @ ogni mossa del nero perde il re: è matto o stallo
            lato_gen = 0
            ritorno = "fine_nero"
            fase = "genera"
        } else {
            mossa_da_fare = migliore
            ritorno_fai = "computer_fatto"
            fase = "fai"
        }

    } elif fase == "computer_fatto" {
        valutazione = punteggio / 100
        print("Il computer gioca " + testo_mossa + "   (" + nodi + " posizioni esaminate, vantaggio del bianco: " + valutazione + ")")
        @ il re bianco adesso è sotto scacco?
        lato_gen = 1
        ritorno = "controlla_scacco"
        fase = "genera"

    } elif fase == "controlla_scacco" {
        scacco = 0
        i = 0
        repeat len(mosse_gen) {
            if b[mosse_gen[i] % 128] == 6 {
                scacco = 1
            }
            i += 1
        }
        @ il bianco ha ancora una mossa che salva il re?
        lato_radice = 0
        profondita = 2
        ritorno_cerca = "controlla_fine"
        fase = "cerca_inizio"

    } elif fase == "controlla_fine" {
        if best[0] <= 0 - MATTO + 100 {
            if scacco == 1 {
                fase = "mostra_fine"
                messaggio = "Scacco matto: ha vinto il computer."
            } else {
                fase = "mostra_fine"
                messaggio = "Stallo: la partita è patta."
            }
        } else {
            if scacco == 1 {
                print("Scacco!")
            }
            fase = "mostra"
        }

    } elif fase == "fine_nero" {
        @ il nero non ha mosse buone: se il suo re è attaccato è matto
        scacco = 0
        i = 0
        repeat len(mosse_gen) {
            if b[mosse_gen[i] % 128] == 14 {
                scacco = 1
            }
            i += 1
        }
        if scacco == 1 {
            messaggio = "Scacco matto: HAI VINTO!"
        } else {
            messaggio = "Stallo: la partita è patta."
        }
        fase = "mostra_fine"

    } elif fase == "mostra_fine" {
        print("")
        r = 0
        repeat 8 {
            numero_riga = 8 - r
            riga = numero_riga + "  "
            c = 0
            repeat 8 {
                riga += simboli[b[21 + c + r * 10]] + " "
                c += 1
            }
            print(riga)
            r += 1
        }
        print("   a b c d e f g h")
        print(messaggio)
        break
    }
}
