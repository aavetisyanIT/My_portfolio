let themeDots = document.getElementsByClassName('theme-dot');

for (let i = 0; themeDots.length > i; i++) {
	themeDots[i].addEventListener('click', () => {
		let mode = themeDots[i].dataset.mode;
		setTheme(mode);
	});
}

const setTheme = (mode) => {
	if (mode == 'light') {
		document.getElementById('theme-style').href = 'index.css';
	} else if (mode == 'blue') {
		document.getElementById('theme-style').href = 'blue.css';
	} else if (mode == 'green') {
		document.getElementById('theme-style').href = 'green.css';
	} else if (mode == 'purple') {
		document.getElementById('theme-style').href = 'purple.css';
	} else {
		document.getElementById('theme-style').href = 'index.css';
	}

	localStorage.setItem('theme', mode);
};

let theme = localStorage.getItem('theme');

if (theme === null) {
	setTheme('light');
} else {
	setTheme(theme);
}

//toast message
const Toast = {
	init() {
		this.hideTimeout = null;

		this.elm = document.createElement('div');
		this.elm.className = 'toast';
		document.body.appendChild(this.elm);
	},
	show(message, state) {
		clearTimeout(this.hideTimeout);

		this.elm.textContent = message;
		this.elm.className = 'toast toast--visible';
		if (state) {
			this.elm.classList.add(`toast--${state}`);
		}
		this.hideTimeout = setTimeout(() => {
			this.elm.classList.remove('toast--visible');
		}, 3000);
	},
};

document.addEventListener('DOMContentLoaded', () => {
	Toast.init();
});

//email JS
(function () {
	emailjs.init('user_kpaeid3BF5jMfYaszgT7D');
})();

window.onload = function () {
	document
		.getElementById('contact-form')
		.addEventListener('submit', function (event) {
			event.preventDefault();
			// generate a five digit ID number for the contact_number variable
			this.contact_number.value = (Math.random() * 100000) | 0;
			// these IDs from the previous steps
			emailjs.sendForm('artur-it', 'my_portfolio', this).then(
				function () {
					let formInputs = document.querySelectorAll('.input-field');
					formInputs.forEach((form) => (form.value = ''));
					Toast.show('Email was sent', 'success');
				},
				function (error) {
					console.log('FAILED...', error);
					Toast.show('Sorry there was a problem', 'Error');
				},
			);
		});
};
