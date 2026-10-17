@ 35 - L'insieme di Mandelbrot
@ Per ogni punto c del piano si ripete z = z * z + c partendo da 0.
@ Se z resta piccolo il punto fa parte dell'insieme (chiocciola), altrimenti
@ il carattere dice quanto velocemente "scappa".

caratteri = " .:-=+*#%@"
larghezza = 78
altezza = 32
massimo = 50

r = 0
repeat altezza {
    ci = r * 2.4 / altezza - 1.2
    riga = ""
    k = 0
    repeat larghezza {
        cr = k * 3.1 / larghezza - 2.2
        zr = 0
        zi = 0
        n = 0
        repeat massimo {
            zr2 = zr * zr
            zi2 = zi * zi
            if zr2 + zi2 > 4 {
                break
            }
            zi = 2 * zr * zi + ci
            zr = zr2 - zi2 + cr
            n += 1
        }
        @ sceglie il carattere in base a quante iterazioni ha fatto
        if n == massimo {
            riga += "@"
        } else {
            indice = n * 9 // massimo
            riga += caratteri[indice]
        }
        k += 1
    }
    print(riga)
    r += 1
}
