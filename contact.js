function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var formMessage = document.getElementById('formMessage');

    formMessage.textContent = '';

    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'All fields are required.';
        formMessage.style.color = 'red';
        return false;
    } else if (!validateEmail(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'red';
        return false;
    } else {
        formMessage.textContent = 'Your message has been sent!';
        formMessage.style.color = 'green';
        return false; 
    }
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}