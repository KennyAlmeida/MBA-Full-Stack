print("ola mundo")

def main():
    print("funcao main")

def variaveis():
    print('declarando variaveis')   
    text = 'text'
    int_number = 10
    decimal_number = 1.99
    ar = list()
    dc = dict()

    print(type(text))
    print(type(int_number))


    numbers = [1, 2, 3, 4, 5]
    for n in numbers:
        print(n)

def logger_builder(prefix):
    return lambda text: print(f'{prefix} {text}')

if __name__ == "__main__":
    main()
    variaveis()
    logger = logger_builder('::')
    logger('teste 1')
    logger('teste 2')