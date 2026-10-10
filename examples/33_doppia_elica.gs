@ 33 - La doppia elica del DNA
@ Due onde che si intrecciano. Seno e coseno calcolati "a mano":
@ ogni passo ruota un po' il punto (s, c) attorno al centro.

s = 0
c = 1
passo = 2 * 314 / 100 / 24
centro = 30
ampiezza = 20
repeat 72 {
    p1 = s * ampiezza + centro -> int
    p2 = centro * 2 - p1
    if p1 < p2 {
        gap = p2 - p1 - 1
        print(" " * p1 + "●" + "-" * gap + "○")
    } elif p1 > p2 {
        gap = p1 - p2 - 1
        print(" " * p2 + "○" + "-" * gap + "●")
    } else {
        print(" " * p1 + "◉")
    }
    s = s + c * passo
    c = c - s * passo
}
