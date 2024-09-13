const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});
let isDarkMode = false;

const toggleMode = () => {
    const icon = document.querySelector('fa-sun');
    isDarkMode = !isDarkMode;
    console.log('clicked');
    if (isDarkMode) {
        icon.classList.add('light_mode');
        icon.classList.remove('dark_mode');
    } else {
        icon.classList.add('light_mode');
        icon.classList.remove('dark_mode');
    }
};

const modeButton = document.getElementById('mode');
modeButton.addEventListener('click', toggleMode);