@ 36 - Pi greco col metodo Monte Carlo
@ Si lanciano punti a caso nel quadrato da 0 a 1. La parte che cade
@ dentro il quarto di cerchio (x² + y² <= 1) è circa pi / 4 del totale.

dentro = 0
punti = 0
repeat 10 {
    repeat 5000 {
        x = randint(0, 1000000) / 1000000
        y = randint(0, 1000000) / 1000000
        if x * x + y * y <= 1 {
            dentro += 1
        }
        punti += 1
    }
    stima = 4 * dentro / punti
    print(punti + " punti: pi = " + stima)
}
print("Valore vero:   pi = 3.14159265358979...")
