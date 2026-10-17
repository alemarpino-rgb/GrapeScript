@ 31 - Tabella delle temperature
@ Da Celsius a Fahrenheit e Kelvin: F = C * 9 / 5 + 32,  K = C + 273.15
@ I decimali del computer non sono esatti (273.15 - 40 dà 233.14999...),
@ quindi i risultati si arrotondano a 2 cifre prima di stamparli.

print("     °C |      °F |       K")
print("--------+---------+--------")
c = 0 - 40
repeat 15 {
    f = c * 9 / 5 + 32
    k = c + 273.15

    @ arrotonda a 2 decimali
    k = k * 100 + 0.5
    k = k // 1 / 100

    @ allinea a destra: aggiunge spazi davanti fino a 7 caratteri
    sc = c -> str
    sf = f -> str
    sk = k -> str
    spazi = 7 - len(sc)
    sc = " " * spazi + sc
    spazi = 7 - len(sf)
    sf = " " * spazi + sf
    spazi = 7 - len(sk)
    sk = " " * spazi + sk

    print(sc + " | " + sf + " | " + sk)
    c += 10
}
