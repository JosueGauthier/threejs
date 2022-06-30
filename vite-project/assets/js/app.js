//!TOGGLE NAVIGATION MENU AND ICONS

const menuToggleBtn = document.querySelector('.menu-toggle-button');
const menuElmt = document.querySelector('.menu');


const toggleMenu = () => {

    menuElmt.classList.toggle('active');
    menuToggleBtn.classList.toggle('active');

};

menuToggleBtn.addEventListener('click', toggleMenu);

// !REMOVE ACTIVE CLASS FROM AND ICON ON LINK CLICK

const removeActiveLinkClass = e => {
    if (e.target.classList.contains('list-link')) {

        menuElmt.classList.remove('active');
        menuToggleBtn.classList.remove('active');

    } else {

        console.log('Does not have the list link class');
    }
};

document.addEventListener('click', removeActiveLinkClass);

// !TOGGLE THEME AND STORE SELECTION WITHIN LOCAL STORAGE

const themeToggleBtn = document.querySelector('.theme-toggle-button');
const bodyElmt = document.body;
const currentTheme = localStorage.getItem('darkTheme');

if (currentTheme) {
    bodyElmt.classList.add('dark-theme');

};

const toggleTheme = () => {
    bodyElmt.classList.toggle('dark-theme');

    if (bodyElmt.classList.contains('dark-theme')) {
        localStorage.setItem('darkTheme', 'active');

    } else {

        localStorage.removeItem('darkTheme');

    }
};

themeToggleBtn.addEventListener('click', toggleTheme);

// !SCROLL REVEAL


const sr = ScrollReveal(
    {
        distance: '50px',
        duration: 1500,
        easing: 'cubic-bezier(0.68,-0.55,0.265,1.55)'
    }
);

sr.reveal('.main-title', { origin: 'top' });
sr.reveal('.scroll-reveal-left', { origin: 'left' });
sr.reveal('.scroll-reveal-right', { origin: 'right' });
sr.reveal('.tech-stack-item', { interval: 250 });

sr.reveal(`.section-title, .section-subtitle-container`, {
    origin: 'top',
    interval: 250
});

sr.reveal('.portfolio-card', { interval:550 });

sr.reveal(`.form-container, .footer`, {
    origin: 'bottom',
    interval: 250
});
