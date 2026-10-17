@ 39 - Nim: il gioco dei bastoncini
@ Ci sono 21 bastoncini. A turno se ne prendono da 1 a 3.
@ Chi prende l'ULTIMO bastoncino perde.
@ Il computer conosce una strategia segreta... riuscirai a batterlo?

n = 21
loop {
    print("")
    print("|" * n + "   (" + n + " bastoncini)")
    p = input("Quanti ne prendi? (1-3) ") -> int
    if p < 1 {
        print("Devi prenderne almeno 1!")
    } elif p > 3 {
        print("Al massimo 3!")
    } elif p > n {
        print("Non ce ne sono abbastanza!")
    } else {
        n = n - p
        if n == 0 {
            print("Hai preso l'ultimo bastoncino... HAI PERSO!")
            break
        }
        @ strategia: lasciare sempre 1, 5, 9, 13, 17... bastoncini
        m = n - 1
        q = m / 4 -> int
        c = m - q * 4
        if c == 0 {
            c = randint(1, 3)
            if c > n {
                c = n
            }
        }
        n = n - c
        print("Il computer prende " + c + ".")
        if n == 0 {
            print("Il computer ha preso l'ultimo bastoncino. HAI VINTO!")
            break
        }
    }
}
