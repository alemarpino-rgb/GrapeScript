@ 04 - Tabellina
@ Stampa la tabellina del numero scelto.

n = input("Quale tabellina vuoi? ") -> int
print("--- Tabellina del " + n + " ---")
i = 1
repeat 10 {
    print(n + " x " + i + " = " + n * i)
    i = i + 1
}
