# Задание 1. Заметки.
# Напишите программу для создания списка заметок. Программа
# должна спрашивать у пользователя действие:
# - Добавить заметку
# - Посмотреть список заметок
# - Прочитать заметку
# - Выход
# Каждое действие должно вызывать соответствующую функцию:
# - add_note(name, text) - добавляет заметку в список
# - show_notes() - показывает список заметок с порядковыми
# номерами
# - read_note(number) - выводит текст заметки по ее
# порядковому номеру
# Заметка должна иметь два поля: название и текст
# Данные необходимо хранить в json файле.
import json
json_list = []



def add_note(name, text):
    note = {'name': name, 'text': text}
    json_list.append(note)
    with open('notes.json', 'w', encoding='utf-8') as f:
        json.dump(json_list, f, ensure_ascii=False)


def show_notes():
    # for number, note in enumerate(json_list, start=1):
    #     print(number, note['name'])
    with open('notes.json', 'r', encoding='utf-8') as f:
        notes = json.load(f)
        for number, note in enumerate(notes, start=1):
            print(number, note['name'])


def read_note(input_number):
    with open('notes.json', 'r', encoding='utf-8') as f:
        notes = json.load(f)
        for number, note in enumerate(notes, start=1):
            if int(input_number) == int(number):
                print(number, note['text'])


while True:
    print('\nДействие: 1 - добавить заметку, 2 - посмотреть заметки, 3 - прочитать заметку, 4 - выход')
    choice = input('Выберите действие: ')
    if choice == '1':
        name = input('Название заметки: ')
        text = input('Текст: ')
        add_note(name, text)
    if choice == '2':
        show_notes()
    if choice == '3':
        show_notes()
        number = input('введи номер: ')
        read_note(number)
    if choice == '4':
        print('выход из программы')
        break