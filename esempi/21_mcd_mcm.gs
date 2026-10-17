@ 21 - MCD e mcm
@ L'algoritmo di Euclide, uno dei più antichi della storia (300 a.C.).

a = input("Primo numero: ") -> int
b = input("Secondo numero: ") -> int
x = a
y = b
loop {
    if x == y {
        break
    } elif x > y {
        x = x - y
    } else {
        y = y - x
    }
}
mcd = x
mcm = a * b / mcd -> int
print("MCD(" + a + ", " + b + ") = " + mcd)
print("mcm(" + a + ", " + b + ") = " + mcm)
if mcd == 1 {
    print(a + " e " + b + " sono primi tra loro!")
}
