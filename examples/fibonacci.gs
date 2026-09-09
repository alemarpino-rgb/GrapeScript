n1=1
n2=1
n3=0

print n1 print ', ' // Commento (se su più righe bisogna anche terminarlo con ) //
print n2 print ', ' // In questa versione bisogna scrivere una valanga di print, ma prossimamente non più

repeat 20{
    n3+=n2
    n3+=n1
    n1=n2
    n2=n3
    n3=0
    print n2 print ', '
}