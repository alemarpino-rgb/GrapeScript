@ 14 - Scacchiera
@ Le caselle si alternano: nera se riga + colonna è pari.

print("  a b c d e f g h")
r = 8
repeat 8 {
    riga = r + " "
    c = 1
    repeat 8 {
        s = r + c
        if s %% 2 {
            riga = riga + "██"
        } else {
            riga = riga + "  "
        }
        c = c + 1
    }
    print(riga + " " + r)
    r = r - 1
}
print("  a b c d e f g h")
