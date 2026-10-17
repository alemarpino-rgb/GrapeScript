@ 43 - Tavola pitagorica
@ Tutte le tabelline in una griglia ordinata.

intestazione = "   x |"
j = 1
repeat 10 {
    if j < 10 {
        intestazione = intestazione + "   " + j
    } else {
        intestazione = intestazione + "  " + j
    }
    j = j + 1
}
print(intestazione)
print("-----+" + "-" * 40)

i = 1
repeat 10 {
    if i < 10 {
        riga = "   " + i + " |"
    } else {
        riga = "  " + i + " |"
    }
    j = 1
    repeat 10 {
        p = i * j
        if p < 10 {
            riga = riga + "   " + p
        } elif p < 100 {
            riga = riga + "  " + p
        } else {
            riga = riga + " " + p
        }
        j = j + 1
    }
    print(riga)
    i = i + 1
}
