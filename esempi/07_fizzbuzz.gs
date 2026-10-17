@ 07 - FizzBuzz
@ Multipli di 3: Fizz, multipli di 5: Buzz, di entrambi: FizzBuzz.
@ L'ordine dei rami conta: il caso 15 va controllato per primo.

n = 1
repeat 100 {
    if n %% 15 {
        print("FizzBuzz")
    } elif n %% 3 {
        print("Fizz")
    } elif n %% 5 {
        print("Buzz")
    } else {
        print(n)
    }
    n += 1
}
