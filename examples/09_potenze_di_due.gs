@ 09 - Potenze di due
@ Raddoppia per 64 volte, poi calcola 2 elevato alla 1000.

p = 1
e = 0
repeat 65 {
    print("2^" + e + " = " + p)
    p = p * 2
    e = e + 1
}

print("")
print("E ora... 2 elevato alla 1000:")
p = 1
repeat 1000 {
    p = p * 2
}
print(p)
