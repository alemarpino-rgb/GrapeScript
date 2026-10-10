@ 30 - Calcolare π con il caso (metodo Monte Carlo)
@ Lanciamo punti a caso in un quadrato. La parte che cade dentro
@ il quarto di cerchio è circa π/4 del totale. Magia!

punti = 0
dentro = 0
repeat 10 {
    repeat 3000 {
        x = randint(0, 1000)
        y = randint(0, 1000)
        if x * x + y * y <= 1000000 {
            dentro = dentro + 1
        }
        punti = punti + 1
    }
    stima = 4 * dentro / punti
    print("Dopo " + punti + " punti: π ≈ " + stima)
}
print("")
print("Il valore vero è  π = 3.14159265...")
