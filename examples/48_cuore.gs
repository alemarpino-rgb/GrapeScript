@ 48 - Un cuore matematico
@ Tutti i punti (x, y) per cui (x² + y² - 1)³ - x² y³ <= 0
@ formano... un cuore! Usiamo numeri con la virgola, ottenuti
@ dalle divisioni.

righe = 26
colonne = 60
r = 0
repeat righe {
    y = 13 - r
    y = y / 10
    riga = ""
    k = 0
    repeat colonne {
        x = k / 24 - 5 / 4
        a = x * x + y * y - 1
        v = a * a * a - x * x * y * y * y
        if v <= 0 {
            riga = riga + "♥"
        } else {
            riga = riga + " "
        }
        k = k + 1
    }
    print(riga)
    r = r + 1
}
print("")
print("          Fatto con amore in GrapeScript")
