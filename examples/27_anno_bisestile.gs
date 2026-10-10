@ 27 - Anno bisestile
@ Bisestile se divisibile per 4, ma non per 100... a meno che
@ non sia divisibile per 400! (Regola del calendario gregoriano)

anno = input("Scrivi un anno: ") -> int
if anno %% 400 {
    print(anno + " è bisestile (divisibile per 400)")
} elif anno %% 100 {
    print(anno + " NON è bisestile (divisibile per 100 ma non per 400)")
} elif anno %% 4 {
    print(anno + " è bisestile")
} else {
    print(anno + " NON è bisestile")
}

print("")
print("Gli anni bisestili dal 1890 al 1920:")
a = 1890
riga = ""
repeat 31 {
    if a %% 400 {
        riga = riga + a + " "
    } elif a %% 100 {
        @ divisibile per 100 ma non per 400: niente
    } elif a %% 4 {
        riga = riga + a + " "
    }
    a = a + 1
}
print(riga)
