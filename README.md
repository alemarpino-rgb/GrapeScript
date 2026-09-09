# GrapeScript

GrapeScript è un semplice linguaggio che ho creato per puro interesse personale

## Le sue funzionalità 

Per adesso non ha tante specialità, ma il suo punto forte è repeat, che sostituisce for e while

## Le caratteristiche

Se non hai ancora python, installalo!

Il comando per eseguire i file .gs è:

```bash
.\destems Prova.gs
```
## Gli esempi

Secondo me gli esempi fanno capire meglio che 1000 righe di spiegazioni, quindi, eccoli a voi:

```GrapeScript
print 'Ciao Mondo'
```

```GrapeScript
x=0
printn x
repeat 400{
    x++
    printn x
}
print 'Fine Programma'
```

NB: printn equivale a cosa da stampare + \n

Fibonacci:
```GrapeScript
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
```
FizzBuzz:
```
x=1
repeat 100{

    stampato=0

    if x%%3{

        print 'Fizz'
        stampato++

    }

    if x%%5{

        print 'Buzz'
        stampato++

    }
    if stampato==0{

        print x

    }

    print ', '
    x++
}
```
Volendo si puo' scrivere tutto attaccato...
```
x=1repeat 100{stampato=0if x%%3{print'Fizz'stampato++}if x%%5{print'Buzz'stampato++}if stampato==0{print x}print', 'x++}
```
... Ma ve lo sconsiglio fortemente

## L'autore

Per adesso l'unico autore sono io! Alessandro Marpino : )
