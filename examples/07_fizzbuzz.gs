@ 07 - FizzBuzz
@ Il classico esercizio dei colloqui di lavoro, da 1 a 100.
@ Multipli di 3: Fizz. Multipli di 5: Buzz. Di entrambi: FizzBuzz.

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
    n = n + 1
}
