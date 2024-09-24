document.addEventListener('DOMContentLoaded', () => {
    const phoneDetail = document.getElementById('phonedetail');
    const basketButton = document.getElementById('viewBasketButton');
    const basketView = document.getElementById('basket');
    const basketItems = document.getElementById('basketItems');
    const basketCount = document.getElementById('basketCount');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    let allPhones = []; 

    const fetchPhoneDetails = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const phoneId = urlParams.get('id');

        if (!phoneId) {
            phoneDetail.innerHTML = '<p>No phone ID provided.</p>';
            return;
        }

        fetch('phones.json')
            .then(response => response.json())
            .then(data => {
                allPhones = data.phoness;

                const phone = allPhones.find(phone => phone.id == phoneId);
                if (phone) {
                    const images = Array.isArray(phone.image) ? phone.image : [phone.image];

                    phoneDetail.innerHTML = `
                        <div class="detailcontent">
                            <div id="image-slider" class="image-slider">
                                <img id="phoneImage" src="${images[0]}" alt="${phone.name}">
                                <div id="dots-container" class="dots-container">
                                    ${images.map((_, index) => `<span class="dot" data-index="${index}"></span>`).join('')}
                                </div>
                            </div>
                            <div class="details">
                                <h2>${phone.name}</h2>
                                <p>Price: ${phone.price}</p>
                                <p>Description: ${phone.description} </p>
                                <button data-id="${phone.id}" id="add-to-basket" class="add-to-basket">Add to Basket</button>
                            </div>
                        </div>
                    `;

                    const extraDescription = document.getElementById('extra-description');
                    if (phone.name.includes('iPhone 15')) {
                        extraDescription.innerHTML = `
                        <div class="infocontainers">
                            <div class="infocontainer">
                                <h2>Chip A17 Pro. It changes the rules of the game. It pushes the limits of the performance.</h2>
                                <img id="p" src="phones/Screenshot 2024-08-19 133208.png">
                            </div>
                            <div class="infocontainer" id="d">
                                <h2>The iPhone 15 Pro Max has by far the best optical zoom ever seen on an iPhone.</h2>
                            </div>
                            <div class="infocontainer third">
                                <h2>Battery for pro tasks.</h2>
                                <img id="t" src="phones/pngegg.png">
                            </div>
                        </div>

                    `;
                    } else {
                         extraDescription.innerHTML = '';
                    }

                    let currentImageIndex = 0;

                    const phoneImage = document.getElementById('phoneImage');
                    const dots = document.querySelectorAll('.dot');

                    const showImage = (index) => {
                        currentImageIndex = index;
                        phoneImage.src = images[currentImageIndex];
                        updateActiveDot();
                    };

                    const updateActiveDot = () => {
                        dots.forEach((dot, index) => {
                            if (index === currentImageIndex) {
                                dot.classList.add("active");
                            } else {
                                dot.classList.remove("active");
                            }
                        });
                    };

                    updateActiveDot();

                    dots.forEach(dot => {
                        dot.addEventListener('click', (event) => {
                            const index = parseInt(event.target.getAttribute('data-index'), 10);
                            showImage(index);
                        });
                    });
                    
                    const addToBasketButton = document.getElementById('add-to-basket');
                    if (addToBasketButton) {
                        addToBasketButton.addEventListener('click', () => {
                            addToBasket(phoneId);
                        });
                    }
                } else {
                    phoneDetail.innerHTML = '<p>Phone not found.</p>';
                }
            })
            .catch(error => console.error('Error loading phone data:', error));
    };

    const addToBasket = (phoneId) => {
        const phone = allPhones.find(p => p.id == phoneId);
        if (phone) {
            const existingItem = basket.find(item => item.id == phoneId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                basket.push({ ...phone, quantity: 1 });
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
                const phoneId = event.target.getAttribute('data-id');
                removeFromBasket(phoneId);
            });
        });

        basketCount.textContent = basket.length; 
    };


    const removeFromBasket = (phoneId) => {
        basket = basket.filter(item => item.id != phoneId);
        updateBasket();
        localStorage.setItem('basket', JSON.stringify(basket));
    };


    basketButton.addEventListener('click', () => {
        basketView.style.display = basketView.style.display === 'block' ? 'none' : 'block';
    });


    updateBasket();
    fetchPhoneDetails();
});
