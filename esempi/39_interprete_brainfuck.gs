@ 39 - Un interprete di Brainfuck scritto in GrapeScript
@ Brainfuck ha solo 8 comandi:  > < + - . , [ ]
@ Quindi qui c'è un linguaggio che gira dentro GrapeScript, che gira dentro Python.

@ il programma da eseguire: stampa "Hello World!"
programma = "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++."

@ tabella ASCII dei caratteri stampabili (dal codice 32 al 126)
ascii = " !" + '"' + "#$%&" + "'" + "()*+,-./0123456789:;<=>?"
ascii += "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

@ prima passata: per ogni [ trova la sua ] e viceversa, usando una pila
salto = [0] * len(programma)
pila = [0] * 100
cima = 0
i = 0
repeat len(programma) {
    if programma[i] == "[" {
        pila[cima] = i
        cima += 1
    } elif programma[i] == "]" {
        cima -= 1
        aperta = pila[cima]
        salto[aperta] = i
        salto[i] = aperta
    }
    i += 1
}

@ seconda passata: esegue
nastro = [0] * 300
p = 0
pc = 0
uscita = ""
passi = 0
loop {
    if pc >= len(programma) {
        break
    }
    comando = programma[pc]
    if comando == ">" {
        p += 1
    } elif comando == "<" {
        p -= 1
    } elif comando == "+" {
        nastro[p] = nastro[p] + 1
        nastro[p] = nastro[p] % 256
    } elif comando == "-" {
        nastro[p] = nastro[p] + 255
        nastro[p] = nastro[p] % 256
    } elif comando == "." {
        codice = nastro[p]
        if codice == 10 {
            print(uscita)
            uscita = ""
        } elif codice >= 32 {
            uscita += ascii[codice - 32]
        }
    } elif comando == "[" {
        if nastro[p] == 0 {
            pc = salto[pc]
        }
    } elif comando == "]" {
        if nastro[p] > 0 {
            pc = salto[pc]
        }
    }
    pc += 1
    passi += 1
}
if len(uscita) > 0 {
    print(uscita)
}
print("(" + passi + " istruzioni Brainfuck eseguite)")
