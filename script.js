const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

const items = [{
        title: "Восковая свеча Макарон и роза",
        price: "40 рублей",
        img: "./img/1.jpg",
    },
    {
        title: "Восковая свеча Фисташковое брюле",
        price: "40 рублей",
        img: "./img/2.jpg",
    },

    {
        title: "Восковая свеча Мед",
        price: "30 рублей",
        img: "./img/6.jpg",
    },
    {
        title: "Восковая свеча Бергамот",
        price: "40 рублей",
        img: "./img/7.jpg",
    },
    {
        title: "Восковая свеча Лаванда",
        price: "40 рублей",
        img: "./img/9.jpg",
    },
    {
        title: "Восковая свеча Лимон + Вербена",
        price: "40 рублей",
        img: "./img/10.jpg",
    },
    {
        title: "Восковая свеча Афродита",
        price: "12 рублей",
        img: "./img/15.jpg",
    },
    {
        title: "Восковая свеча Суккулент",
        price: "10 рублей",
        img: "./img/16.jpg",
    },
    {
        title: "Восковая свеча Волна",
        price: "15 рублей",
        img: "./img/18.jpg",
    },
    {
        title: "Восковая свеча Ракушка",
        price: "16 рублей",
        img: "./img/20.jpg",
    },
    {
        title: "Восковая свеча Рождественский олень",
        price: "14 рублей",
        img: "./img/19.jpg",
    },
    {
        title: "Восковая свеча Пион",
        price: "14 рублей",
        img: "./img/21.jpg",
    },
];

function prepareShopItem(shopItem) {
    const { title, price, img } = shopItem;

    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h2").textContent = title;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}`;

    return item;
};

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    };

};
renderItems(currentState);

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    };

    return 0;

};

const sortControl = document.querySelector('#sort');

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
};

searchInput.addEventListener("click", applySearch);
searchButton.addEventListener("search", applySearch);