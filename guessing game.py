import random

answer= random.randrange(1,101)
chance=0
while chance<5:
    guess = int(input("Guess a number between 1 and 100:"))
    if guess == answer:
        print("You won")
    if guess<answer:
        print("go higher")
    if guess>answer:
        print("Go lower") 
    chance+=1
    if chance == 5:
        print("Game over,the answer was:",answer)           