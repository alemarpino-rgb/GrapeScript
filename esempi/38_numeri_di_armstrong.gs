@ 38 - Numeri di Armstrong
@ Numeri uguali alla somma dei cubi delle loro cifre.
@ Esempio: 153 = 1x1x1 + 5x5x5 + 3x3x3 = 1 + 125 + 27

n = 100
repeat 900 {
    a = n / 100 -> int
    resto = n - a * 100
    b = resto / 10 -> int
    c = resto - b * 10
    somma = a * a * a + b * b * b + c * c * c
    if somma == n {
        print(n + " = " + a + "³ + " + b + "³ + " + c + "³")
    }
    n = n + 1
}
