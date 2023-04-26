const searchSection = document.querySelector('.searchSection');

const searchForm = document.createElement('form');
searchForm.setAttribute('action', 'search');

const label = document.createElement('label');
label.setAttribute('for', 'searchbar');
label.textContent = 'Search';
searchForm.appendChild(label);

const input = document.createElement('input');
input.setAttribute('name', 'searchbar');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Search for what you need');
searchForm.appendChild(input);

const button = document.createElement('button');
button.textContent = 'Search';
searchForm.appendChild(button);

searchSection.appendChild(searchForm);
