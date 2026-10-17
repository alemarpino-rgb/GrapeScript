@ 22 - Lista della spesa
@ Un piccolo programma interattivo: la lista cresce con += [elemento]
@ e per togliere un elemento si ricostruisce la lista senza di lui.

spesa = []
print("Comandi: aggiungi, togli, mostra, esci")

loop {
    comando = input("> ")

    if comando == "esci" {
        break

    } elif comando == "aggiungi" {
        cosa = input("Cosa vuoi aggiungere? ")
        spesa += [cosa]
        print("Aggiunto: " + cosa)

    } elif comando == "mostra" {
        if len(spesa) == 0 {
            print("La lista è vuota")
        }
        i = 0
        repeat len(spesa) {
            numero = i + 1
            print(numero + ". " + spesa[i])
            i += 1
        }

    } elif comando == "togli" {
        n = input("Numero dell'elemento da togliere: ") -> int
        if n < 1 {
            print("Numero non valido")
        } elif n > len(spesa) {
            print("Numero non valido")
        } else {
            @ ricostruisce la lista saltando l'elemento n
            nuova = []
            i = 0
            repeat len(spesa) {
                if i + 1 == n {
                    print("Tolto: " + spesa[i])
                } else {
                    nuova += [spesa[i]]
                }
                i += 1
            }
            spesa = nuova
        }

    } else {
        print("Comando sconosciuto")
    }
}
print("Lista finale: " + spesa)
