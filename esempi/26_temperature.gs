@ 26 - Tabella delle temperature
@ Converte da gradi Celsius a Fahrenheit: F = C x 9 / 5 + 32

print("  °C  |  °F  |")
print("------+------+---------------------------")
c = 0
repeat 21 {
    f = c * 9 / 5 + 32 -> int
    if c < 10 {
        sc = "    "
    } elif c < 100 {
        sc = "   "
    } else {
        sc = "  "
    }
    if f < 100 {
        sf = "   "
    } else {
        sf = "  "
    }
    tacche = c / 4 -> int
    termometro = "▓" * tacche
    print(sc + c + " |" + sf + f + " | " + termometro)
    c = c + 5
}
