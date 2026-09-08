numeroattuale=1
numeroprecedente=1
numero=0

repeat 10{
    numero+=numeroprecedente
    numero+=numeroattuale
    numeroprecedente=numeroattuale
    numeroattuale=numero
    numero=0
    print numeroattuale
    print ', '
} 