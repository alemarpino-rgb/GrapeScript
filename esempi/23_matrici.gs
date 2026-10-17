@ 23 - Matrici
@ Una matrice è una lista di liste: m[riga][colonna].
@ Calcola la trasposta e il prodotto di due matrici 3x3.

a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
b = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
n = 3

@ trasposta: le righe diventano colonne
t = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
i = 0
repeat n {
    j = 0
    repeat n {
        t[j][i] = a[i][j]
        j += 1
    }
    i += 1
}

@ prodotto: c[i][j] = somma di a[i][k] * b[k][j]
c = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
i = 0
repeat n {
    j = 0
    repeat n {
        k = 0
        repeat n {
            c[i][j] += a[i][k] * b[k][j]
            k += 1
        }
        j += 1
    }
    i += 1
}

print("A:")
i = 0
repeat n {
    print(a[i])
    i += 1
}
print("Trasposta di A:")
i = 0
repeat n {
    print(t[i])
    i += 1
}
print("A x B:")
i = 0
repeat n {
    print(c[i])
    i += 1
}
