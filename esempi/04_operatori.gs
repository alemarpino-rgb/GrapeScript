@ 04 - Operatori aritmetici
@ La differenza tra / , // e % è la cosa più importante da capire qui.

a = 17
b = 5

@ Prima si fanno i conti, poi si stampano: dentro una riga con del testo
@ il + unisce, quindi "a + b = " + a + b darebbe "a + b = 175"
somma = a + b
differenza = a - b
prodotto = a * b
divisione = a / b         @ divisione vera: 3.4
intera = a // b           @ divisione intera: 3
resto = a % b             @ resto: 2

print("a + b  = " + somma)
print("a - b  = " + differenza)
print("a * b  = " + prodotto)
print("a / b  = " + divisione)
print("a // b = " + intera)
print("a % b  = " + resto)

@ La prova: intera * b + resto torna sempre a
prova = intera * b + resto
print("controllo: " + intera + " x " + b + " + " + resto + " = " + prova)

@ %% risponde alla domanda "è divisibile per?"
@ (anche qui si calcola prima, perché il confronto viene dopo il +)
divisibile = 20 %% 5
print("20 è divisibile per 5? " + divisibile)

@ += , -= , *= ... modificano una variabile
x = 10
x += 5
x *= 2
x -= 1
print("x = " + x)
