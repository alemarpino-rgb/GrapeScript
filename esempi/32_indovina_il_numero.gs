@ 32 - Indovina il numero
@ Il computer pensa un numero, l'utente prova a indovinarlo.
@ Con la strategia giusta (provare sempre a metà) bastano 7 tentativi.

segreto = randint(1, 100)
tentativi = 0
storia = []
print("Ho pensato un numero da 1 a 100.")

loop {
    n = input("Tentativo: ") -> int
    tentativi += 1
    storia += [n]
    if n < segreto {
        print("Più alto")
    } elif n > segreto {
        print("Più basso")
    } else {
        print("Indovinato in " + tentativi + " tentativi: " + storia)
        break
    }
}
