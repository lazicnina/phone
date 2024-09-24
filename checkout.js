document.addEventListener('DOMContentLoaded', () => {
    const checkoutItems = document.getElementById('checkoutItems');
    const totalAmount = document.getElementById('totalAmount');
    const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];


    const updateCheckout = () => {
        checkoutItems.innerHTML = '';
        let total = 0;


        if (basket.length === 0) {
            alert('Your basket is empty!');
            window.location.href = 'index.html'; 
            return;
        }

        basket.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'checkout-item';

            const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;

            listItem.innerHTML = `
                <img src="${imageSrc}" alt="${item.name}" class="checkout-item-image">
                <div class="checkout-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;

            checkoutItems.appendChild(listItem);

            total += parseFloat(item.price.replace('$', '')) * item.quantity;
        });

        totalAmount.textContent = total.toFixed(2);

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-id');
                changeQuantity(itemId, -1);
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-id');
                changeQuantity(itemId, 1);
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.getAttribute('data-id');
                removeFromBasket(itemId);
            });
        });
    };

    const changeQuantity = (itemId, change) => {
        basket = basket.map(item => {
            if (item.id == itemId) {
                item.quantity = Math.max(1, item.quantity + change);
            }
            return item;
        });
        updateBasket();
    };


    const removeFromBasket = (itemId) => {
        basket = basket.filter(item => item.id != itemId);
        updateBasket();
    };

    const updateBasket = () => {
        localStorage.setItem('basket', JSON.stringify(basket));
        updateCheckout();
    };

    confirmPurchaseButton.addEventListener('click', () => {
        window.location.href = 'purchasing.html'; 
    });


    updateCheckout();
});
