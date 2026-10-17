@ 12 - MCD e mcm (algoritmo di Euclide)
@ MCD(a, b) = MCD(b, a % b), finchè il resto non diventa 0.

a = input("Primo numero: ") -> int
b = input("Secondo numero: ") -> int

x = a
y = b
loop {
    if y == 0 {
        break
    }
    r = x % y
    x = y
    y = r
}
mcd = x
mcm = a * b // mcd

print("MCD = " + mcd)
print("mcm = " + mcm)
