@ 15 - Numeri romani
@ Due liste "parallele": valori[i] corrisponde a simboli[i].
@ Si toglie ogni volta il valore più grande possibile.

valori =  [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
simboli = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

n = input("Numero da 1 a 3999: ") -> int
originale = n
romano = ""

i = 0
repeat len(valori) {
    @ finchè il valore ci sta, lo toglie e aggiunge il simbolo
    loop {
        if n < valori[i] {
            break
        }
        n -= valori[i]
        romano += simboli[i]
    }
    i += 1
}

print(originale + " = " + romano)
