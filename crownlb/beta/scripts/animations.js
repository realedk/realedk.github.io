document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll('.menu li');
    const modeSwitch = document.getElementById('modeSwitch');
    const body = document.body;

    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.1)';
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
        });
    });

    modeSwitch.addEventListener('change', () => {
        if (modeSwitch.checked) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        }
    });
});
