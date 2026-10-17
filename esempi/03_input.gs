@ 03 - Leggere dati dall'utente
@ input restituisce sempre un testo: se serve un numero si converte con -> int

nome = input("Come ti chiami? ")
anno = input("In che anno sei nato? ") -> int

eta = 2026 - anno
print("Ciao " + nome + ", quest'anno compi " + eta + " anni.")

@ Quanti giorni sono, più o meno
giorni = eta * 365
print("Sono circa " + giorni + " giorni.")
