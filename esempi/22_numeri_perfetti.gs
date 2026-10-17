@ 22 - Numeri perfetti
@ Un numero è perfetto se è uguale alla somma dei suoi divisori.
@ Esempio: 28 = 1 + 2 + 4 + 7 + 14

n = 2
repeat 9999 {
    somma = 1
    d = 2
    loop {
        if d * d > n {
            break
        }
        if n %% d {
            altro = n / d -> int
            somma = somma + d
            if altro > d {
                somma = somma + altro
            }
        }
        d = d + 1
    }
    if somma == n {
        print(n + " è perfetto!")
    }
    n = n + 1
}
