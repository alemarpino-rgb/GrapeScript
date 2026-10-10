@ 42 - Il triangolo di Tartaglia
@ Ogni numero è la somma dei due sopra di lui.
@ Lo calcoliamo con la formula C(n, k+1) = C(n, k) x (n - k) / (k + 1)

righe = 13
n = 0
repeat righe {
    rientro = righe - n
    riga = "  " * rientro
    c = 1
    k = 0
    repeat n + 1 {
        if c < 10 {
            cella = "   " + c
        } elif c < 100 {
            cella = "  " + c
        } elif c < 1000 {
            cella = " " + c
        } else {
            cella = "" + c
        }
        riga = riga + cella
        a = n - k
        b = k + 1
        c = c * a / b -> int
        k = k + 1
    }
    print(riga)
    n = n + 1
}
