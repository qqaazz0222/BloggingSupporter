t = "1. 1번문장입니다. 2. 2번문장입니다. 3. 3번문장입니다. 4. 4번문장입니다. 5. 5번문장입니다."
temp = []
res = []
for i in range(1, 7):
    print(i, ": t :", t)
    temp = t.split(str(i)+". ")
    print(temp)
    if i < 6:
        t = temp[1]
    if i > 1:
        res.append(temp[0])
print(res)
