@ 09 - Fattoriale
@ n! = 1 x 2 x 3 x ... x n
@ Per contare le cifre si converte il numero in testo e si usa len.

n = input("Di che numero vuoi il fattoriale? (prova 1000) ") -> int

f = 1
i = 2
repeat n - 1 {
    f *= i
    i += 1
}

print(n + "! =")
print(f)
print("")
print("Il risultato ha " + len(f -> str) + " cifre.")
