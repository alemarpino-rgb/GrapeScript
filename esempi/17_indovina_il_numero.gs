@ 17 - Indovina il numero
@ Il computer pensa un numero, tu provi a indovinarlo.

segreto = randint(1, 100)
tentativi = 0
print("Ho pensato un numero da 1 a 100. Indovinalo!")
loop {
    g = input("Il tuo tentativo: ") -> int
    tentativi = tentativi + 1
    if g < segreto {
        print("Più alto!")
    } elif g > segreto {
        print("Più basso!")
    } else {
        print("Indovinato in " + tentativi + " tentativi!")
        break
    }
}
if tentativi <= 7 {
    print("Strategia perfetta!")
} else {
    print("Suggerimento: prova sempre il numero a metà dell'intervallo.")
}
