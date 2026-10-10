@ 18 - Indovina il numero... malvagio!
@ Il computer NON sceglie un numero: risponde sempre in modo
@ da lasciarsi aperta la parte più grande dei numeri possibili.
@ Le risposte restano coerenti, ma la partita dura il più possibile.

print("Ho scelto un numero da 1 a 100. Prova a indovinarlo!")
basso = 1
alto = 100
tentativi = 0
loop {
    g = input("Il tuo tentativo: ") -> int
    tentativi = tentativi + 1
    if g < basso {
        print("Più alto!")
    } elif g > alto {
        print("Più basso!")
    } elif alto - basso == 0 {
        print("Bravo! Hai indovinato in " + tentativi + " tentativi.")
        break
    } elif g - basso > alto - g {
        print("Più basso!")
        alto = g - 1
    } else {
        print("Più alto!")
        basso = g + 1
    }
}
