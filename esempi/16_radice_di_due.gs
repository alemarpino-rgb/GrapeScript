@ 16 - Radice quadrata di 2 con centinaia di cifre
@ Si cerca una cifra alla volta il numero x più grande con x * x <= 2 * 100^k.
@ Usa solo interi, quindi non perde mai precisione.

cifre = input("Quante cifre decimali? (prova 500) ") -> int

x = 1
obiettivo = 2
risultato = "1."
repeat cifre {
    x *= 10
    obiettivo *= 100
    @ prova le cifre dalla più grande: la prima che va bene è quella giusta
    d = 9
    loop {
        prova = x + d
        if prova * prova <= obiettivo {
            x = prova
            break
        }
        d -= 1
    }
    risultato += d
}
print(risultato)
