@ 25 - Bancomat
@ PIN con tre tentativi e un menu che si ripete.
@ Il PIN è 1234.

saldo = 500
entrato = 0
tentativi = 3
loop {
    pin = input("Inserisci il PIN: ") -> int
    if pin == 1234 {
        entrato = 1
        break
    }
    tentativi = tentativi - 1
    if tentativi == 0 {
        break
    }
    print("PIN errato! Tentativi rimasti: " + tentativi)
}

if entrato == 0 {
    print("Carta bloccata. Contatta la tua banca.")
} else {
    print("Benvenuto!")
    loop {
        print("")
        print("1) Saldo   2) Preleva   3) Deposita   4) Esci")
        scelta = input("Scelta: ") -> int
        if scelta == 1 {
            print("Saldo disponibile: " + saldo + " euro")
        } elif scelta == 2 {
            x = input("Quanto vuoi prelevare? ") -> int
            if x > saldo {
                print("Saldo insufficiente!")
            } elif x %% 10 {
                saldo = saldo - x
                print("Ritira le banconote. Nuovo saldo: " + saldo + " euro")
            } else {
                print("Puoi prelevare solo multipli di 10 euro.")
            }
        } elif scelta == 3 {
            x = input("Quanto vuoi depositare? ") -> int
            saldo = saldo + x
            print("Deposito eseguito. Nuovo saldo: " + saldo + " euro")
        } elif scelta == 4 {
            print("Grazie e arrivederci!")
            break
        } else {
            print("Scelta non valida.")
        }
    }
}
