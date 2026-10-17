@ 44 - Il salvadanaio magico (interesse composto)
@ Metti dei soldi da parte con un interesse annuo:
@ ogni anno guadagni interessi anche sugli interessi!
@ Lavoriamo in centesimi per non perdere precisione.

euro = input("Quanti euro metti da parte? ") -> int
tasso = input("Interesse annuo in percentuale? (es. 5) ") -> int
anni = 30
cent = euro * 100
anno = 0
repeat anni + 1 {
    e = cent / 100 -> int
    c = cent - e * 100
    if c < 10 {
        sc = "0" + c
    } else {
        sc = "" + c
    }
    barra = cent / euro / 10 -> int
    print("Anno " + anno + ": " + e + "," + sc + " euro  " + "█" * barra)
    guadagno = cent * tasso / 100 -> int
    cent = cent + guadagno
    anno = anno + 1
}
