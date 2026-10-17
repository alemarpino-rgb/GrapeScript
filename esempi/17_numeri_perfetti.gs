@ 17 - Numeri perfetti
@ Un numero è perfetto se è uguale alla somma dei suoi divisori (lui escluso).
@ es 28 = 1 + 2 + 4 + 7 + 14
@ Controlla tutti i numeri fino a 10000: ci mette qualche secondo.

n = 2
repeat 9999 {
    somma = 1
    piccoli = [1]
    grandi = []
    d = 2
    loop {
        if d * d > n {
            break
        }
        if n %% d {
            @ i divisori vanno a coppie: d e n // d
            somma += d
            piccoli += [d]
            altro = n // d
            if altro > d {
                somma += altro
                grandi = [altro] + grandi
            }
        }
        d += 1
    }
    if somma == n {
        divisori = piccoli + grandi
        print(n + " = somma di " + divisori)
    }
    n += 1
}
