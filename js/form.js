const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submitButton');
const loader = document.querySelector(".loaderContent");
const succsessMessage = document.querySelector(".succsessMessage");

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');


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
  } 
  if (emailRegex.test(email)){
    emailError.style.display = 'none';
  }
  
}

function validateSubject() {
  const subject = subjectInput.value.trim();
  if (subject.length < 15) {
    subjectError.textContent = 'Subject must be at least 15 characters long.';
  } 
  if (subject.length > 15){
    subjectError.style.display = 'none';
  }
}

function validateMessage() {
  const message = messageInput.value.trim();
  if (message.length < 25) {
    messageError.textContent = 'Message must be at least 25 characters long.';
  } 
  if (message.length > 25){
    messageError.style.display = 'none';
  }
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  validateName();
  validateEmail();
  validateSubject();
  validateMessage();
  if (nameError.style.display === 'none' && emailError.style.display === 'none' && subjectError.style.display === 'none' && messageError.style.display === 'none') {
    submitButton.style.display = 'none';
    succsessMessage.style.display = 'flex';
  }
});



