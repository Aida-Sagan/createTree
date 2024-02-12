"use strict";

/**
 * Пример ответа с сервера
 */

const data = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        },
        {
            "id": 11,
            "head": null,
            "name": "Добавила элемент",
            "node": 0,
            "price": 700.0,
            "sorthead": 50
        },
        {
            "id": 12,
            "head": 11,
            "name": "Я тут",
            "node": 0,
            "price": 200,
            "sorthead": 60
        },
        {
            "id": 13,
            "head": 11,
            "name": "Hey!",
            "node": 0,
            "price": 300,
            "sorthead": 60
        }
    ]
}


/**
 *
 * Построение дерева
 */

function buildTree(data, parent) {
    const services = data.services.filter(service => service.head === parent);

    if (services.length === 0) return;

    const ul = document.createElement('ul');
    ul.className = 'list-group';

    services.sort((a, b) => a.sorthead - b.sorthead);

    services.forEach(service => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        const icon = document.createElement('i');
        icon.className = 'bi bi-chevron-right';
        li.appendChild(icon);

        const name = document.createTextNode(`${service.name} (${service.price})`);
        li.appendChild(name);

        if (service.node === 1 || service.node === 0) {
            li.addEventListener('click', (event) => {
                const nestedUl = li.querySelector('ul');
                if (nestedUl) {
                    nestedUl.classList.toggle('collapse');
                    icon.classList.toggle('bi-chevron-right');
                    icon.classList.toggle('bi-chevron-down');
                    event.stopPropagation();
                }
            });

            const nestedUl = buildTree(data, service.id);
            if (nestedUl) {
                nestedUl.id = `folder${service.id}`;
                nestedUl.className = 'collapse';
                li.appendChild(nestedUl);
            }
        }


        ul.appendChild(li);
    });

    return ul;
}

/**
 *
 Вывод дерева
 */

const tree = document.getElementById('tree');
tree.appendChild(buildTree(data, null));