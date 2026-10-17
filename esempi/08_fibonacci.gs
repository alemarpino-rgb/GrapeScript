@ 08 - Successione di Fibonacci
@ Ogni numero è la somma dei due precedenti: 0, 1, 1, 2, 3, 5, 8...
@ Con gli interi senza limite si arriva tranquillamente al centesimo.

a = 0
b = 1
n = 0
repeat 100 {
    print("F(" + n + ") = " + a)
    c = a + b
    a = b
    b = c
    n += 1
}
