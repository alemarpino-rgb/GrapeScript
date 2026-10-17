@ 30 - Interesse composto
@ Ogni anno il capitale cresce di una percentuale, anche sugli interessi già presi.
@ capitale = capitale * (1 + tasso / 100), scritto in due passi perché non ci sono le parentesi.

capitale = input("Capitale iniziale (euro): ") -> float
tasso = input("Tasso annuo (%): ") -> float
anni = input("Per quanti anni? ") -> int

fattore = tasso / 100
fattore += 1
iniziale = capitale

anno = 1
repeat anni {
    capitale *= fattore
    @ arrotonda ai centesimi: moltiplica, aggiunge mezzo, toglie i decimali, divide
    mostrato = capitale * 100 + 0.5
    mostrato = mostrato // 1 / 100
    print("Anno " + anno + ": " + mostrato + " euro")
    anno += 1
}

guadagno = capitale - iniziale
guadagno = guadagno * 100 + 0.5
guadagno = guadagno // 1 / 100
print("Guadagno totale: " + guadagno + " euro")
