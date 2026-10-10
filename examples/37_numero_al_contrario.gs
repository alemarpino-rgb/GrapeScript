@ 37 - Numero al contrario
@ Inverte le cifre di un numero e controlla se è palindromo
@ (cioè uguale letto da destra e da sinistra, come 12321).

n = input("Scrivi un numero: ") -> int
x = n
r = 0
loop {
    if x == 0 {
        break
    }
    q = x / 10 -> int
    cifra = x - q * 10
    r = r * 10 + cifra
    x = q
}
print("Al contrario: " + r)
if r == n {
    print("È un numero palindromo!")
} else {
    print("Non è palindromo.")
    s = n + r
    print("Curiosità: " + n + " + " + r + " = " + s)
}
