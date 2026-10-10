@ 23 - Quiz
@ Cinque domande, un punteggio finale.

punti = 0
print("=== IL GRANDE QUIZ DI GRAPESCRIPT ===")
print("")

r = input("1) Qual è la capitale d'Italia? ")
if r == "Roma" {
    print("Giusto!")
    punti = punti + 1
} else {
    print("No, è Roma.")
}

r = input("2) Quanto fa 7 x 8? ") -> int
if r == 56 {
    print("Esatto!")
    punti = punti + 1
} else {
    print("No, fa 56.")
}

r = input("3) Quante zampe ha un ragno? ") -> int
if r == 8 {
    print("Bravo!")
    punti = punti + 1
} else {
    print("No, ne ha 8.")
}

r = input("4) Di che colore è il cielo in una giornata serena? ")
if r == "azzurro" {
    print("Certo!")
    punti = punti + 1
} elif r == "blu" {
    print("Accettato!")
    punti = punti + 1
} else {
    print("Era azzurro!")
}

r = input("5) Quanti giorni ha un anno bisestile? ") -> int
if r == 366 {
    print("Perfetto!")
    punti = punti + 1
} else {
    print("No, 366.")
}

print("")
vuote = 5 - punti
print("Punteggio: " + punti + " su 5 " + "★" * punti + "☆" * vuote)
