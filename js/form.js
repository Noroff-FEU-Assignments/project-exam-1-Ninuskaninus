// Get form and input elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Get error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Add event listener for keyup on form
form.addEventListener('keyup', (event) => {
  const input = event.target;

  if (input === nameInput) {
    validateName();
  } else if (input === emailInput) {
    validateEmail();
  } else if (input === subjectInput) {
    validateSubject();
  } else if (input === messageInput) {
    validateMessage();
  }
});

function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 5) {
    nameError.textContent = 'Name must be at least 5 characters long.';
  } 
  if (name.length > 5){
    nameError.style.display = 'none';
    
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Invalid email address.';
    emailError.style.color = 'red';
    emailInput.style.borderColor = 'red';
  } else {
    emailError.textContent = '';
    emailError.style.color = 'green';
    emailInput.style.borderColor = 'green';
  }
}

function validateSubject() {
  const subject = subjectInput.value.trim();
  if (subject.length < 15) {
    subjectError.textContent = 'Subject must be at least 15 characters long.';
    subjectError.style.color = 'red';
    subjectInput.style.borderColor = 'red';
  } else {
    subjectError.textContent = '';
    subjectError.style.color = 'green';
    subjectInput.style.borderColor = 'green';
  }
}

function validateMessage() {
  const message = messageInput.value.trim();
  if (message.length < 25) {
    messageError.textContent = 'Message must be at least 25 characters long.';
    messageError.style.color = 'red';
    messageInput.style.borderColor = 'red';
  } else {
    messageError.textContent = '';
    messageError.style.color = 'green';
    messageInput.style.borderColor = 'green';
  }
}
