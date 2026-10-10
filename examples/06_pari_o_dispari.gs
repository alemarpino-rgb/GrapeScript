@ 06 - Pari o dispari
@ Usa l'operatore %% ("è divisibile per").

n = input("Scrivi un numero: ") -> int

if n %% 2 {
    print(n + " è PARI")
} else {
    print(n + " è DISPARI")
}

if n %% 3 {
    print("...ed è anche divisibile per 3!")
}
if n %% 10 {
    print("...e finisce con uno zero!")
}
