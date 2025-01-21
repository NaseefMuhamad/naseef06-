number=input("entre a number")
if number.isdigit():
    number=int(number)

    if number%2==0:
        print("even")
    else:
        print("odd")        
else:
    print("invalid")        