@ 03 - Calcolatrice
@ Legge due numeri e mostra le quattro operazioni.

print("=== Calcolatrice GrapeScript ===")
a = input("Primo numero: ") -> int
b = input("Secondo numero: ") -> int

somma = a + b
differenza = a - b
prodotto = a * b

print(a + " + " + b + " = " + somma)
print(a + " - " + b + " = " + differenza)
print(a + " x " + b + " = " + prodotto)

if b == 0 {
    print(a + " : " + b + " = impossibile! Non si divide per zero")
} else {
    quoziente = a / b
    print(a + " : " + b + " = " + quoziente)
}
