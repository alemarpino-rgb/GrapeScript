@ 05 - Condizioni
@ if / elif / else: viene eseguito solo il primo ramo vero.

voto = input("Che voto hai preso (1-10)? ") -> int

if voto > 10 {
    print("Voto non valido")
} elif voto >= 9 {
    print("Ottimo")
} elif voto >= 7 {
    print("Buono")
} elif voto >= 6 {
    print("Sufficiente")
} else {
    print("Insufficiente")
}

@ Non esiste ancora "and": si mettono due if uno dentro l'altro
if voto >= 6 {
    if voto %% 2 {
        print("...ed è anche un numero pari")
    }
}
