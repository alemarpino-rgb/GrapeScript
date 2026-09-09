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