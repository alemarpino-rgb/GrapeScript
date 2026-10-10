@ 31 - L'insieme di Mandelbrot
@ Il frattale più famoso del mondo, disegnato con i caratteri.
@ Per ogni punto ripetiamo z = z * z + c e guardiamo quanto
@ velocemente "scappa". Ci vuole qualche secondo!

larghezza = 78
altezza = 32
maxiter = 30
r = 0
repeat altezza {
    ci = r * 24 / altezza / 10 - 12 / 10
    riga = ""
    k = 0
    repeat larghezza {
        cr = k * 31 / larghezza / 10 - 22 / 10
        zr = 0
        zi = 0
        n = 0
        repeat maxiter {
            zr2 = zr * zr
            zi2 = zi * zi
            if zr2 + zi2 > 4 {
                break
            }
            zi = 2 * zr * zi + ci
            zr = zr2 - zi2 + cr
            n = n + 1
        }
        if n == maxiter {
            riga = riga + "@"
        } elif n > 12 {
            riga = riga + "%"
        } elif n > 8 {
            riga = riga + "*"
        } elif n > 6 {
            riga = riga + "+"
        } elif n > 4 {
            riga = riga + "="
        } elif n > 3 {
            riga = riga + "-"
        } elif n > 2 {
            riga = riga + ":"
        } elif n > 1 {
            riga = riga + "."
        } else {
            riga = riga + " "
        }
        k = k + 1
    }
    print(riga)
    r = r + 1
}
