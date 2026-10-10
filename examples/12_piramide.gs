@ 12 - Piramide
@ Una piramide centrata, costruita con spazi e stelle.

righe = input("Altezza della piramide? ") -> int
i = 1
repeat righe {
    spazi = righe - i
    stelle = i * 2 - 1
    print(" " * spazi + "*" * stelle)
    i = i + 1
}
print(" " * righe + "|")
