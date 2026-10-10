@ 16 - Testa o croce
@ Lancia 10000 monete e verifica che escano circa metà e metà.

lanci = 10000
teste = 0
repeat lanci {
    if randint(0, 1) == 1 {
        teste = teste + 1
    }
}
croci = lanci - teste

pt = teste * 100 / lanci
pc = croci * 100 / lanci
print("Lanci:  " + lanci)
print("Teste:  " + teste + " (" + pt + "%)")
print("Croci:  " + croci + " (" + pc + "%)")
print("")
bt = teste / 200 -> int
bc = croci / 200 -> int
print("Teste " + "█" * bt)
print("Croci " + "█" * bc)
