const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

const login = event => {
  event.preventDefault();
  if (userNameInput.value.length > 0) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    addMessageForm.classList.add('show');
  } else {
    alert('Enter your username');
  }
};

const sendMessage = event => {
  event.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', (event) => login(event));
addMessageForm.addEventListener('submit', (event) => sendMessage(event));