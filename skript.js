const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const demoButton = document.getElementById('demoButton');

function showMessage() {
    formMessage.textContent = 'Demo activated! You can now interact with the form and to-do list.';
    formMessage.className = 'form-message success';
}

demoButton.addEventListener('click', showMessage);

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function clearErrors() {
    document.querySelectorAll('.error').forEach((element) => {
        element.textContent = '';
    });
    document.querySelectorAll('input, textarea').forEach((element) => {
        element.classList.remove('invalid');
    });
}

function validateForm(event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    if (!name) {
        document.querySelector('[data-error-for="name"]').textContent = 'Name is required.';
        document.getElementById('name').classList.add('invalid');
        isValid = false;
    }

    if (!email) {
        document.querySelector('[data-error-for="email"]').textContent = 'Email is required.';
        document.getElementById('email').classList.add('invalid');
        isValid = false;
    } else if (!validateEmail(email)) {
        document.querySelector('[data-error-for="email"]').textContent = 'Please enter a valid email.';
        document.getElementById('email').classList.add('invalid');
        isValid = false;
    }

    if (!message) {
        document.querySelector('[data-error-for="message"]').textContent = 'Message is required.';
        document.getElementById('message').classList.add('invalid');
        isValid = false;
    }

    if (isValid) {
        formMessage.textContent = 'Thank you! Your message has been submitted.';
        formMessage.className = 'form-message success';
        contactForm.reset();
    } else {
        formMessage.textContent = 'Please fix the highlighted fields.';
        formMessage.className = 'form-message error';
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="remove-btn" type="button">Remove</button>
    `;

    listItem.querySelector('.remove-btn').addEventListener('click', () => {
        listItem.remove();
    });

    taskList.appendChild(listItem);
    taskInput.value = '';
    taskInput.focus();
}

contactForm.addEventListener('submit', validateForm);
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});