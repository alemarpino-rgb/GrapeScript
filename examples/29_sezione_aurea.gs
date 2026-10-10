@ 29 - La sezione aurea
@ Il numero d'oro φ = 1.618... si trova in natura, nell'arte e
@ nell'architettura. Ha una proprietà magica: φ x φ = φ + 1.
@ Usiamo proprio quella per calcolarne centinaia di cifre.

cifre = 500
y = 1
sc = 1
s = "1."
repeat cifre {
    y = y * 10
    sc = sc * 10
    d = 9
    loop {
        z = y + d
        if z * z <= z * sc + sc * sc {
            y = z
            break
        }
        d = d - 1
    }
    s = s + d
}
print("φ =")
print(s)
print("")
print("E guarda: i rapporti tra numeri di Fibonacci vicini si avvicinano a φ!")
a = 1
b = 1
repeat 15 {
    c = a + b
    a = b
    b = c
    r = b / a
    print(b + " / " + a + " = " + r)
}
