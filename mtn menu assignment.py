def display_menu(menu):
    for key, value in menu.items():
        print(f"{key}.{value['title']}")
    print("0.Exit")

def main():
    menu = {
        "1": {"title": "Send Money", "sub menu": {
            "1": {"title": "To MTN Mobile Money"},
            "2": {"title": "To Other Networks"},
            "3": {"title": "To Bank Account"}
        }},
        "2": {"title": "Withdrawl Money", "sub menu": {
            "1": {"title": "From Mobile Money agent"},
            "2": {"title": "From Bank Account"}
        }},
        "3": {"title": "Buy Airtime", "sub menu": {
            "1": {"title": "For Self"},
            "2": {"title": "For another"}
        }},
        "4": {"title": "Pay bills", "sub menu": {
            "1": {"title": "Electricity"},
            "2": {"title": "DSTV"},
            "3": {"title": "Water"},
            "4": {"title": "School Fees"}
        }},
        "5": {"title": "Check balance"}
    }
    current_menu = menu
    while True:
        display_menu(current_menu)
        choice = input("select an option:")
        if choice == "0":
            print("Exiting...")
            break
        elif choice in current_menu:
            if "sub menu" in current_menu[choice]:
                current_menu = current_menu[choice]["sub menu"]
            else:
                print(f"selected: {current_menu[choice]['title']}")
                current_menu = menu
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    main()