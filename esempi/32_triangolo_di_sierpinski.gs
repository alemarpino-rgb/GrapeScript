@ 32 - Il triangolo di Sierpinski
@ Un frattale nascosto nel triangolo di Tartaglia: coloriamo solo
@ i numeri dispari. Un numero C(n, k) è dispari quando k e n - k
@ non hanno cifre binarie "1" nella stessa posizione.

righe = 32
n = 0
repeat righe {
    spazi = righe - n
    riga = " " * spazi
    k = 0
    repeat n + 1 {
        a = k
        b = n - k
        dispari = 1
        loop {
            if a == 0 {
                break
            }
            if b == 0 {
                break
            }
            if a %% 2 {
                @ ultima cifra binaria di a è 0
            } elif b %% 2 {
                @ ultima cifra binaria di b è 0
            } else {
                dispari = 0
                break
            }
            a = a / 2 -> int
            b = b / 2 -> int
        }
        if dispari == 1 {
            riga = riga + "▲ "
        } else {
            riga = riga + "  "
        }
        k = k + 1
    }
    print(riga)
    n = n + 1
}
