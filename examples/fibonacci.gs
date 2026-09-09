n1=1
n2=1
n3=0

contatore=0

v=', '

print n1 print v // Commento (se su più righe bisogna anche terminarlo con ) //
print n2 print v // In questa versione bisogna scrivere una valanga di print, ma prossimamente non più

cicli=20

repeat cicli{

    contatore++
    n3+=n2
    n3+=n1
    n1=n2
    n2=n3
    n3=0

    print n2 

    if contatore < cicli{ 
        print v
    } else {
        print '.'
    }

}
// Ora si possono anche fare variabili stringhe!!! (in questo caso v)