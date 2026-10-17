@ 24 - Sasso, carta, forbici
@ Sfida il computer: vince chi arriva prima a 3.

tu = 0
cpu = 0
print("Scrivi: sasso, carta o forbici")
loop {
    m = input("La tua mossa: ")
    c = randint(1, 3)
    if c == 1 {
        cm = "sasso"
    } elif c == 2 {
        cm = "carta"
    } else {
        cm = "forbici"
    }
    print("Il computer gioca: " + cm)

    if m == cm {
        print("Pareggio!")
    } elif m == "sasso" {
        if cm == "forbici" {
            print("Il sasso rompe le forbici: punto tuo!")
            tu = tu + 1
        } else {
            print("La carta avvolge il sasso: punto al computer.")
            cpu = cpu + 1
        }
    } elif m == "carta" {
        if cm == "sasso" {
            print("La carta avvolge il sasso: punto tuo!")
            tu = tu + 1
        } else {
            print("Le forbici tagliano la carta: punto al computer.")
            cpu = cpu + 1
        }
    } elif m == "forbici" {
        if cm == "carta" {
            print("Le forbici tagliano la carta: punto tuo!")
            tu = tu + 1
        } else {
            print("Il sasso rompe le forbici: punto al computer.")
            cpu = cpu + 1
        }
    } else {
        print("Mossa non valida!")
    }
    print("Punteggio: tu " + tu + " - " + cpu + " computer")
    print("")
    if tu == 3 {
        print("HAI VINTO LA PARTITA!")
        break
    } elif cpu == 3 {
        print("Ha vinto il computer. Rivincita?")
        break
    }
}
