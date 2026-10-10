@ 15 - Dado
@ Lancia un dado e disegna la faccia uscita.

loop {
    d = randint(1, 6)
    print("")
    print("+-------+")
    if d == 1 {
        print("|       |")
        print("|   o   |")
        print("|       |")
    } elif d == 2 {
        print("| o     |")
        print("|       |")
        print("|     o |")
    } elif d == 3 {
        print("| o     |")
        print("|   o   |")
        print("|     o |")
    } elif d == 4 {
        print("| o   o |")
        print("|       |")
        print("| o   o |")
    } elif d == 5 {
        print("| o   o |")
        print("|   o   |")
        print("| o   o |")
    } else {
        print("| o   o |")
        print("| o   o |")
        print("| o   o |")
    }
    print("+-------+")
    print("È uscito " + d + "!")
    r = input("Lanci ancora? (s/n) ")
    if r == "n" {
        break
    }
}
print("Ciao!")
