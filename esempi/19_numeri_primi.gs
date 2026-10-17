@ 19 - Numeri primi
@ Trova tutti i numeri primi fino a 500.
@ Basta provare i divisori fino alla radice quadrata del numero.

limite = 500
n = 2
trovati = 0
riga = ""
repeat limite - 1 {
    primo = 1
    d = 2
    loop {
        if d * d > n {
            break
        }
        if n %% d {
            primo = 0
            break
        }
        d = d + 1
    }
    if primo == 1 {
        riga = riga + n + " "
        trovati = trovati + 1
        if trovati %% 15 {
            print(riga)
            riga = ""
        }
    }
    n = n + 1
}
print(riga)
print("")
print("Ci sono " + trovati + " numeri primi fino a " + limite + ".")
