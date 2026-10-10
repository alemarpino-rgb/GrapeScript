@ 40 - Avventura testuale: Il castello
@ Sei chiuso in un castello. Trova il modo di uscire!
@ Comandi: nord, sud, est, ovest, su, giu, prendi, guarda, aiuto

stanza = "ingresso"
lampada = 0
chiave = 0
mosse = 0
nuova = 1

print("=== IL CASTELLO ===")
print("Ti svegli nell'ingresso di un vecchio castello. La porta è chiusa.")

loop {
    if nuova == 1 {
        print("")
        if stanza == "ingresso" {
            print("INGRESSO. Una grande porta a sud è chiusa a chiave.")
            print("Vedi una scala a nord e una porta a est.")
        } elif stanza == "biblioteca" {
            print("BIBLIOTECA. Scaffali pieni di libri polverosi.")
            if lampada == 0 {
                print("Su un tavolo c'è una lampada a olio.")
            }
            print("L'uscita è a sud.")
        } elif stanza == "cucina" {
            print("CUCINA. Odora di pane vecchio. Una botola porta giù.")
            print("L'uscita è a ovest.")
        } elif stanza == "cantina" {
            print("CANTINA. Botti di vino ovunque.")
            if chiave == 0 {
                print("Qualcosa luccica per terra: una chiave!")
            }
            print("Una scala porta su.")
        }
    }
    nuova = 0
    c = input("> ")
    mosse = mosse + 1

    if c == "aiuto" {
        print("Comandi: nord, sud, est, ovest, su, giu, prendi, guarda")
    } elif c == "guarda" {
        nuova = 1
    } elif c == "prendi" {
        if stanza == "biblioteca" {
            if lampada == 0 {
                lampada = 1
                print("Hai preso la lampada. Ora puoi vedere al buio!")
            } else {
                print("Hai già preso la lampada.")
            }
        } elif stanza == "cantina" {
            if chiave == 0 {
                chiave = 1
                print("Hai preso la chiave! Sembra quella del portone.")
            } else {
                print("Non c'è altro da prendere.")
            }
        } else {
            print("Non c'è niente da prendere qui.")
        }
    } elif stanza == "ingresso" {
        if c == "nord" {
            stanza = "biblioteca"
            nuova = 1
        } elif c == "est" {
            stanza = "cucina"
            nuova = 1
        } elif c == "sud" {
            if chiave == 1 {
                print("")
                print("La chiave gira nella serratura... il portone si apre!")
                print("SEI LIBERO! Ce l'hai fatta in " + mosse + " mosse.")
                break
            } else {
                print("Il portone è chiuso a chiave.")
            }
        } else {
            print("Non puoi andare di là.")
        }
    } elif stanza == "biblioteca" {
        if c == "sud" {
            stanza = "ingresso"
            nuova = 1
        } else {
            print("Non puoi andare di là.")
        }
    } elif stanza == "cucina" {
        if c == "ovest" {
            stanza = "ingresso"
            nuova = 1
        } elif c == "giu" {
            if lampada == 1 {
                stanza = "cantina"
                nuova = 1
            } else {
                print("È troppo buio per scendere! Ti serve una luce.")
            }
        } else {
            print("Non puoi andare di là.")
        }
    } elif stanza == "cantina" {
        if c == "su" {
            stanza = "cucina"
            nuova = 1
        } else {
            print("Non puoi andare di là.")
        }
    }
}
