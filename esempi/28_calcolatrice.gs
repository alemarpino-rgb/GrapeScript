@ 28 - Calcolatrice
@ Legge due numeri e un'operazione, finchè l'utente non scrive "esci".
@ I numeri si leggono con -> float, così vanno bene anche i decimali.

print("Operazioni: + - * / // %   (scrivi esci per uscire)")
loop {
    op = input("Operazione: ")
    if op == "esci" {
        break
    }
    a = input("Primo numero: ") -> float
    b = input("Secondo numero: ") -> float

    if op == "+" {
        print(a + b)
    } elif op == "-" {
        print(a - b)
    } elif op == "*" {
        print(a * b)
    } elif op == "/" {
        if b == 0 {
            print("Non si divide per zero")
        } else {
            print(a / b)
        }
    } elif op == "//" {
        print(a // b)
    } elif op == "%" {
        print(a % b)
    } else {
        print("Operazione sconosciuta: " + op)
    }
}
