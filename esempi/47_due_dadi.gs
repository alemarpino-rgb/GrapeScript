@ 47 - La campana dei due dadi
@ Lanciamo due dadi 3600 volte. Il 7 esce più spesso di tutti:
@ ci sono più combinazioni che lo formano (1+6, 2+5, 3+4...).

c2 = 0
c3 = 0
c4 = 0
c5 = 0
c6 = 0
c7 = 0
c8 = 0
c9 = 0
c10 = 0
c11 = 0
c12 = 0
repeat 3600 {
    s = randint(1, 6) + randint(1, 6)
    if s == 2 {
        c2 = c2 + 1
    } elif s == 3 {
        c3 = c3 + 1
    } elif s == 4 {
        c4 = c4 + 1
    } elif s == 5 {
        c5 = c5 + 1
    } elif s == 6 {
        c6 = c6 + 1
    } elif s == 7 {
        c7 = c7 + 1
    } elif s == 8 {
        c8 = c8 + 1
    } elif s == 9 {
        c9 = c9 + 1
    } elif s == 10 {
        c10 = c10 + 1
    } elif s == 11 {
        c11 = c11 + 1
    } else {
        c12 = c12 + 1
    }
}
d = 10
print("Somma | Uscite")
print("------+---------------------------------------------")
n = 2
repeat 11 {
    if n == 2 {
        v = c2
    } elif n == 3 {
        v = c3
    } elif n == 4 {
        v = c4
    } elif n == 5 {
        v = c5
    } elif n == 6 {
        v = c6
    } elif n == 7 {
        v = c7
    } elif n == 8 {
        v = c8
    } elif n == 9 {
        v = c9
    } elif n == 10 {
        v = c10
    } elif n == 11 {
        v = c11
    } else {
        v = c12
    }
    lunghezza = v / d -> int
    if n < 10 {
        etichetta = "   " + n + "  |"
    } else {
        etichetta = "  " + n + "  |"
    }
    print(etichetta + " " + "█" * lunghezza + " " + v)
    n = n + 1
}
