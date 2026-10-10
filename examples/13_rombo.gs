@ 13 - Rombo
@ Una piramide che sale e poi scende.

n = 9
i = 1
repeat n {
    spazi = n - i
    stelle = i * 2 - 1
    print(" " * spazi + "◆" * stelle)
    i = i + 1
}
i = n - 1
repeat n - 1 {
    spazi = n - i
    stelle = i * 2 - 1
    print(" " * spazi + "◆" * stelle)
    i = i - 1
}
