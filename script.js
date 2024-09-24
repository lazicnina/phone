document.addEventListener('DOMContentLoaded', () => {
    const phoneList = document.getElementById('phone-list');
    const searchInput = document.getElementById('searchInput');
    const casesList = document.getElementById('cases-list');
    const glassesList = document.getElementById('glasses-list');
    const chargersList = document.getElementById('chargers-list');
    const headphonesList = document.getElementById('headphones-list');
    const basketButton = document.getElementById('viewBasketButton');
    const basketView = document.getElementById('basket');
    const basketItems = document.getElementById('basketItems');
    const basketCount = document.getElementById('basketCount');
    const filterAppleButton = document.getElementById('filterApple');
    const filterAndroidButton = document.getElementById('filterAndroid');
    const checkoutButton = document.getElementById('checkoutButton');
    const menuToggle = document.querySelector('.menu-toggle');
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.querySelector('.search-bar');
    const body = document.body;

    

    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let allPhones = [];
    let allCases = [];
    let allGlasses = [];
    let allChargers = [];
    let allHeadphones = [];

    basketCount.textContent = basket.length;

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('show');
    });
    
    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);


    const fetchPhones = () => {
        fetch('phones.json')
            .then(response => response.json())
            .then(data => {
                allPhones = data.phoness;
                displayPhones(allPhones);
            })
            .catch(error => console.error('Error loading the phone data:', error));
    };


    const fetchCases = () => {
        fetch('phones.json')
            .then(response => response.json())
            .then(data => {
                allCases = data.casess;
                displayCases(allCases);
            })
            .catch(error => console.error('Error loading the case data:', error));
    };

    const fetchGlasses = () => {
        fetch('phones.json')
            .then(response => response.json())
            .then(data => {
                allGlasses = data.glassess;
                displayGlasses(allGlasses);
            })
            .catch(error => console.error('Error loading glasses data:', error));
    };

    const fetchChargers = () => {
        fetch('phones.json')
            .then(response => response.json())
            .then(data => {
                allChargers = data.chargerss;
                displayChargers(allChargers);
            })
            .catch(error => console.error('Error loading chargers data:', error));
    };

    const fetchHeadphones = () => {
        fetch('phones.json')
            .then(response => response.json())
            .then(data => {
                allHeadphones = data.headphoness;
                displayHeadphones(allHeadphones);
            })
            .catch(error => console.error('Error loading headphones data:', error));
    };

    const displayPhones = (phones) => {
        phoneList.innerHTML = '';
        phones.forEach(phone => {
            const phoneItem = document.createElement('a');
            phoneItem.href = `phonedetail.html?id=${phone.id}`;
            phoneItem.className = 'phone-item';
            phoneItem.innerHTML = `
                <img src="${phone.image[0]}" alt="${phone.name}">
                <h3>${phone.name}</h3>
                <p>Price: ${phone.price}</p>
                <button data-id="${phone.id}" class="add-to-basket">Add to Basket</button>
            `;
            phoneList.appendChild(phoneItem);
        });

        document.querySelectorAll('.add-to-basket').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const phoneId = event.target.getAttribute('data-id');
                addToBasket(phoneId, 'phone');
            });
        });
    };

    const displayCases = (cases) => {
        casesList.innerHTML = '';
        cases.forEach(phoneCase => {
            const caseItem = document.createElement('a');
            caseItem.className = 'case-item';
            caseItem.innerHTML = `
                <img src="${phoneCase.image}" alt="${phoneCase.name}">
                <h3>${phoneCase.name}</h3>
                <p>Price: ${phoneCase.price}</p>
                <button data-id="${phoneCase.id}" class="add-to-basket">Add to Basket</button>
            `;
            casesList.appendChild(caseItem);
        });

        document.querySelectorAll('.add-to-basket').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const caseId = event.target.getAttribute('data-id');
                addToBasket(caseId, 'case');
            });
        });
    };

   const displayGlasses = (glasses) => {
    glassesList.innerHTML = '';
    glasses.forEach(glass => {
        const glassItem = document.createElement('a');
        glassItem.className = 'glass-item';
        glassItem.innerHTML = `
            <img src="${glass.image}" alt="${glass.name}">
            <h3>${glass.name}</h3>
            <p>Price: ${glass.price}</p>
            <button data-id="${glass.id}" class="add-to-basket">Add to Basket</button>
        `;
        glassesList.appendChild(glassItem);
    });


    document.querySelectorAll('.add-to-basket').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const glassId = event.target.getAttribute('data-id');
            addToBasket(glassId, 'glass');
        });
    });
    };

    const displayChargers = (chargers) => {
        chargersList.innerHTML = '';
        chargers.forEach(charger => {
            const chargerItem = document.createElement('a');
            chargerItem.className = 'charger-item';
            chargerItem.innerHTML = `
                <img src="${charger.image}" alt="${charger.name}">
                <h3>${charger.name}</h3>
                <p>Price: ${charger.price}</p>
                <button data-id="${charger.id}" class="add-to-basket">Add to Basket</button>
            `;
            chargersList.appendChild(chargerItem);
        });

        document.querySelectorAll('.add-to-basket').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const chargerId = event.target.getAttribute('data-id');
                addToBasket(chargerId, 'charger');
            });
        });
    };


    const displayHeadphones = (headphones) => {
        headphonesList.innerHTML = '';
        headphones.forEach(headphone => {
            const headphoneItem = document.createElement('a');
            headphoneItem.className = 'headphone-item';
            headphoneItem.innerHTML = `
                <img src="${headphone.image}" alt="${headphone.name}">
                <h3>${headphone.name}</h3>
                <p>Price: ${headphone.price}</p>
                <button data-id="${headphone.id}" class="add-to-basket">Add to Basket</button>
            `;
            headphonesList.appendChild(headphoneItem);
        });

        document.querySelectorAll('.add-to-basket').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const headphoneId = event.target.getAttribute('data-id');
                addToBasket(headphoneId, 'headphone');
            });
        });
    };
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html')) {
        fetchPhones();
    } else if (currentPage.includes('cases.html')) {
        fetchCases();
    } else if (currentPage.includes('glasses.html')) {
        fetchGlasses();
    } else if (currentPage.includes('chargers.html')) {
        fetchChargers();
    } else if (currentPage.includes('headphones.html')) {
        fetchHeadphones();
    }

     const filterItems = () => {
        const query = searchInput.value.toLowerCase();
        if (currentPage.includes('index.html')) {
            const filteredPhones = allPhones.filter(phone =>
                phone.name.toLowerCase().includes(query)
            );
            displayPhones(filteredPhones);
        } else if (currentPage.includes('cases.html')) {
            const filteredCases = allCases.filter(phoneCase =>
                phoneCase.name.toLowerCase().includes(query)
            );
            displayCases(filteredCases);
        } else if (currentPage.includes('glasses.html')) {
            const filteredGlasses = allGlasses.filter(glass =>
                glass.name.toLowerCase().includes(query)
            );
            displayGlasses(filteredGlasses);
        } else if (currentPage.includes('chargers.html')) {
            const filteredChargers = allChargers.filter(charger =>
                charger.name.toLowerCase().includes(query)
            );
            displayChargers(filteredChargers);
        } else if (currentPage.includes('headphones.html')) {
            const filteredHeadphones = allHeadphones.filter(headphone =>
                headphone.name.toLowerCase().includes(query)
            );
            displayHeadphones(filteredHeadphones);
        }
    };


    searchInput.addEventListener('input', filterItems);


    const addToBasket = (itemId, type) => {
        let item;
        if (type === 'phone') {
            item = allPhones.find(p => p.id == itemId);
        } else if (type === 'case') {
            item = allCases.find(c => c.id == itemId);
        } else if (type === 'glass') {
            item = allGlasses.find(g => g.id == itemId);
        } else if (type === 'charger') {
            item = allChargers.find(c => c.id == itemId);
        } else if (type === 'headphone') {
            item = allHeadphones.find(h => h.id == itemId);
        }

        if (item) {
            const existingItem = basket.find(b => b.id == item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                basket.push({ ...item, quantity: 1 });
            }
            updateBasket();
            localStorage.setItem('basket', JSON.stringify(basket));
        }
    };

       
       const updateBasket = () => {
        basketItems.innerHTML = '';
        basket.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} (x${item.quantity})
                <span>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                <button class="delete-button" data-id="${item.id}">Delete</button>
            `;
            basketItems.appendChild(listItem);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-id');
                removeFromBasket(itemId);
            });
        });

      
        basketCount.textContent = basket.length;
    };


    const removeFromBasket = (itemId) => {
        basket = basket.filter(item => item.id != itemId);
        updateBasket();
        localStorage.setItem('basket', JSON.stringify(basket));
    };


    basketButton.addEventListener('click', () => {
        basketView.style.display = basketView.style.display === 'block' ? 'none' : 'block';
    });


    updateBasket();

   
    const viewButton = document.getElementById('viewButton');


    if (viewButton) {
        viewButton.addEventListener('click', () => {
            const phoneList = document.getElementById('phones');
            if (phoneList) {
                phoneList.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }  
    
 
        filterAppleButton.addEventListener('click', () => {
            const applePhones = allPhones.filter(phone => phone.name.toLowerCase().includes('iphone'));
            displayPhones(applePhones);

        });
        
        filterAndroidButton.addEventListener('click', () => {
            const androidPhones = allPhones.filter(phone => !phone.name.toLowerCase().includes('iphone'));
            displayPhones(androidPhones);

        });
    
        

    fetchPhones();
    fetchCases();
    fetchGlasses();
    fetchChargers();
    fetchHeadphones();
});
