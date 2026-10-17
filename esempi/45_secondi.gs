@ 45 - Quanti secondi?
@ Converte i secondi in giorni, ore, minuti e secondi...
@ e calcola da quanti secondi sei vivo!

s = input("Quanti secondi? ") -> int
giorni = s / 86400 -> int
s = s - giorni * 86400
ore = s / 3600 -> int
s = s - ore * 3600
minuti = s / 60 -> int
s = s - minuti * 60
print("Sono " + giorni + " giorni, " + ore + " ore, " + minuti + " minuti e " + s + " secondi.")

print("")
eta = input("Quanti anni hai? ") -> int
vissuti = eta * 365 * 24 * 60 * 60
battiti = eta * 365 * 24 * 60 * 70
respiri = eta * 365 * 24 * 60 * 15
print("Hai vissuto circa " + vissuti + " secondi!")
print("Il tuo cuore ha battuto circa " + battiti + " volte.")
print("Hai respirato circa " + respiri + " volte.")
