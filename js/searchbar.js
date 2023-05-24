const searchIcon = document.querySelector('.searchBar img');
const searchBar = document.querySelector('.searchBar input');
const searchLabel = document.querySelector('.searchBar label');
searchIcon.style.visibility = 'hidden';
searchLabel.style.visibility = 'hidden';
searchLabel.style.fontSize = '0px';

searchBar.addEventListener('focus', () => {
    searchIcon.style.visibility = 'visible';
});

searchBar.addEventListener('blur', () => {
    searchIcon.style.visibility = 'hidden';
});

searchIcon.addEventListener('click', () => {
    searchBar.value = '';
    searchIcon.style.visibility = 'hidden';
});

