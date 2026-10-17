@ 36 - Il sistema binario
@ I computer contano solo con 0 e 1. Ecco come.

n = input("Scrivi un numero: ") -> int
x = n
s = ""
uni = 0
loop {
    if x == 0 {
        break
    }
    if x %% 2 {
        s = "0" + s
    } else {
        s = "1" + s
        uni = uni + 1
    }
    x = x / 2 -> int
}
if n == 0 {
    s = "0"
}
print(n + " in binario è " + s + " (contiene " + uni + " cifre 1)")

print("")
print("I numeri da 0 a 31 in binario (█ = 1, · = 0):")
k = 0
repeat 32 {
    x = k
    s = ""
    repeat 5 {
        if x %% 2 {
            s = "·" + s
        } else {
            s = "█" + s
        }
        x = x / 2 -> int
    }
    if k < 10 {
        print(" " + k + "  " + s)
    } else {
        print(k + "  " + s)
    }
    k = k + 1
}
