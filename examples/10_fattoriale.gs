@ 10 - Fattoriale gigante
@ Calcola n! = 1 x 2 x 3 x ... x n e conta le sue cifre.
@ Prova con 100, poi con 1000!

n = input("Di quale numero vuoi il fattoriale? ") -> int

f = 1
i = 1
repeat n {
    f = f * i
    i = i + 1
}

@ conta le cifre confrontando con le potenze di 10
cifre = 1
p = 10
loop {
    if p > f {
        break
    }
    p = p * 10
    cifre = cifre + 1
}

print(n + "! =")
print(f)
print("")
print("Ha " + cifre + " cifre!")
