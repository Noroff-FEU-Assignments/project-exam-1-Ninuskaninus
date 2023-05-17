const searchIcon = document.querySelector('.searchBar img');
const searchBar = document.querySelector('.searchBar input');
searchIcon.style.visibility = 'hidden';

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

