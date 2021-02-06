from math import sqrt, floor


def seive(n):
    res = [True]*(n+1)
    for i in range(2, n+1):
        if res[i]:
            for j in range(i*i, n+1, i):
                res[j] = False
    return [i for i in range(2, n+1) if res[i]]


# print(seive(20))


def segmentedSeive(low, high):
    initialPrimes = seive(floor(sqrt(high)))
    temp = [True]*(high-low+1)
    for p in initialPrimes:
        sm = (low//p)*p
        if (sm < low):
            sm += low
        for m in range(sm, high+1, p):
            temp[m-low] = False
    for i in initialPrimes:
        print(i, end=' ')
    for i in range(len(temp)):
        if temp[i]:
            print(i+low, end=' ')


segmentedSeive(6, 10)
