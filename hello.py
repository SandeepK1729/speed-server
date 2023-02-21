a = list(input().split())
b = list(input().split())

re = True
for i, j in zip(a, b):
    if "null" in (i, j):
        re &= i == j
    else:
        x, y = int(i), int(j)
        re &= (x ** 2 == y) or (y ** 2 == x)
    
print("true" if re else "false")