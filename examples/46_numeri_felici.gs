@ 46 - Numeri felici
@ Somma i quadrati delle cifre e ripeti. Se arrivi a 1 il numero
@ è "felice"; altrimenti finisci in un ciclo che passa per 4.
@ Esempio: 7 → 49 → 97 → 130 → 10 → 1  Felice!

felici = ""
n = 1
repeat 100 {
    x = n
    loop {
        if x == 1 {
            felici = felici + n + " "
            break
        }
        if x == 4 {
            break
        }
        somma = 0
        loop {
            if x == 0 {
                break
            }
            q = x / 10 -> int
            cifra = x - q * 10
            somma = somma + cifra * cifra
            x = q
        }
        x = somma
    }
    n = n + 1
}
print("I numeri felici fino a 100:")
print(felici)

print("")
x = input("Prova un numero: ") -> int
percorso = "" + x
loop {
    if x == 1 {
        print(percorso + "  ☺ Felice!")
        break
    }
    if x == 4 {
        print(percorso + "  ☹ Infelice (ciclo infinito)")
        break
    }
    somma = 0
    loop {
        if x == 0 {
            break
        }
        q = x / 10 -> int
        cifra = x - q * 10
        somma = somma + cifra * cifra
        x = q
    }
    x = somma
    percorso = percorso + " → " + x
}
