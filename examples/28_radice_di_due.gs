@ 28 - La radice quadrata di 2 con mille cifre
@ GrapeScript non ha i numeri con la virgola "infiniti"... ma ha
@ interi senza limiti! Trucco: cerchiamo una cifra alla volta il
@ numero più grande x tale che x * x <= 2 * 100 * 100 * ...

cifre = input("Quante cifre decimali? (prova 1000) ") -> int
x = 1
t = 2
s = "1."
repeat cifre {
    x = x * 10
    t = t * 100
    d = 9
    loop {
        y = x + d
        if y * y <= t {
            x = y
            break
        }
        d = d - 1
    }
    s = s + d
}
print("")
print("√2 =")
print(s)
