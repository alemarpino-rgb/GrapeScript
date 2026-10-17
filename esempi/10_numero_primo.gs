@ 10 - È un numero primo?
@ Basta provare i divisori fino alla radice quadrata:
@ se d * d supera n, non serve andare oltre.

n = input("Scrivi un numero: ") -> int

primo = 1
if n < 2 {
    primo = 0
}

d = 2
loop {
    if d * d > n {
        break
    }
    if n %% d {
        primo = 0
        print(n + " è divisibile per " + d)
        break
    }
    d += 1
}

if primo == 1 {
    print(n + " è primo")
} else {
    print(n + " non è primo")
}
