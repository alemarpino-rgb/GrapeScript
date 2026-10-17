@ 25 - Palindromo
@ Una frase è palindroma se letta al contrario è uguale.
@ Prima toglie gli spazi, poi confronta le lettere dalle due estremità.

frase = input("Scrivi una frase (es. i topi non avevano nipoti): ")

@ toglie gli spazi
pulita = ""
i = 0
repeat len(frase) {
    if frase[i] == " " {
        @ salta
    } else {
        pulita += frase[i]
    }
    i += 1
}

palindroma = 1
i = 0
j = len(pulita) - 1
loop {
    if i >= j {
        break
    }
    if pulita[i] == pulita[j] {
        i += 1
        j -= 1
    } else {
        palindroma = 0
        break
    }
}

if palindroma == 1 {
    print("È palindroma!")
} else {
    print("Non è palindroma: '" + pulita[i] + "' è diverso da '" + pulita[j] + "'")
}
