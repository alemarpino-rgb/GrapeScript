@ 02 - Variabili e tipi
@ In GrapeScript non si dichiara il tipo: lo decide il valore.

intero = 42
decimale = 3.14
testo = "GrapeScript"
lista = [1, 2.5, "tre"]

print(intero)
print(decimale)
print(testo)
print(lista)

@ Le conversioni si fanno con la freccia ->
@ attenzione: la freccia vale per tutta l'espressione a sinistra,
@ quindi conviene convertire in una variabile e poi usarla
n = "42" -> int
print(n + 8)
print(7 -> float)
print(3.99 -> int)        @ toglie la parte decimale, non arrotonda
percentuale = 100 -> str
print(percentuale + "%")

@ Gli interi non hanno limite di cifre
grande = 99999999999999999999 * 99999999999999999999
print(grande)
