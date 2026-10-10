@ 08 - Fibonacci
@ I primi 100 numeri di Fibonacci.
@ GrapeScript non ha limiti di cifre: guarda quanto diventano grandi!

a = 0
b = 1
n = 0
repeat 100 {
    print("F(" + n + ") = " + a)
    c = a + b
    a = b
    b = c
    n = n + 1
}
