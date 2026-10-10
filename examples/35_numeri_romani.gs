@ 35 - Numeri romani
@ Converte un numero in cifre romane, togliendo ogni volta
@ il simbolo più grande possibile.

loop {
    n = input("Numero da 1 a 3999 (0 per uscire): ") -> int
    if n == 0 {
        break
    }
    originale = n
    s = ""
    loop {
        if n >= 1000 {
            s = s + "M"
            n = n - 1000
        } elif n >= 900 {
            s = s + "CM"
            n = n - 900
        } elif n >= 500 {
            s = s + "D"
            n = n - 500
        } elif n >= 400 {
            s = s + "CD"
            n = n - 400
        } elif n >= 100 {
            s = s + "C"
            n = n - 100
        } elif n >= 90 {
            s = s + "XC"
            n = n - 90
        } elif n >= 50 {
            s = s + "L"
            n = n - 50
        } elif n >= 40 {
            s = s + "XL"
            n = n - 40
        } elif n >= 10 {
            s = s + "X"
            n = n - 10
        } elif n >= 9 {
            s = s + "IX"
            n = n - 9
        } elif n >= 5 {
            s = s + "V"
            n = n - 5
        } elif n >= 4 {
            s = s + "IV"
            n = n - 4
        } elif n >= 1 {
            s = s + "I"
            n = n - 1
        } else {
            break
        }
    }
    print(originale + " = " + s)
}
