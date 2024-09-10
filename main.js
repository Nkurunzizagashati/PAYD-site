document.addEventListener('DOMContentLoaded', () => {
	// ===================================================================================

	// INFO CARDS

	const infoCardsData = [
		{
			imgSrc: './assets/book.jpg',
			title: 'The Tortured Poets Department Vinyl + Bonus Track “The Manuscript”',
			buttonText: 'Buy',
		},
		{
			imgSrc: './assets/book.jpg',
			title: 'The Tortured Poets Department CD + Bonus Track “The Manuscript”',
			buttonText: 'Buy',
		},
		{
			imgSrc: './assets/book.jpg',
			title: 'The Tortured Poets Department Cassette + Bonus Track “The Manuscript”',
			buttonText: 'Buy',
		},
	];

	const heroInfoContainer = document.querySelector('.hero.info');
	let currentIndex = 0;
	let numberOfCardsToShow = 3;
	let cardWidth = 450;

	const renderInfoCards = () => {
		heroInfoContainer.innerHTML = ''; // Clear existing content
		const endIndex = Math.min(
			currentIndex + numberOfCardsToShow,
			infoCardsData.length
		);
		infoCardsData
			.slice(currentIndex, endIndex)
			.forEach((cardData) => {
				const cardDiv = document.createElement('div');
				cardDiv.classList.add('hero', 'info-card');

				const img = document.createElement('img');
				img.src = cardData.imgSrc;
				img.alt = '';

				const title = document.createElement('h4');
				title.textContent = cardData.title;

				const button = document.createElement('span');
				button.classList.add('hero-btn');
				button.textContent = cardData.buttonText;

				cardDiv.appendChild(img);
				cardDiv.appendChild(title);
				cardDiv.appendChild(button);

				heroInfoContainer.appendChild(cardDiv);
			});

		// Append navigation icons
		if (numberOfCardsToShow < 3) {
			const prevIcon = document.createElement('i');
			prevIcon.classList.add('fa-solid', 'fa-arrow-left');
			const nextIcon = document.createElement('i');
			nextIcon.classList.add('fa-solid', 'fa-arrow-right');
			heroInfoContainer.appendChild(prevIcon);
			heroInfoContainer.appendChild(nextIcon);

			// Add event listeners to icons
			prevIcon.addEventListener('click', () => {
				if (currentIndex > 0) {
					currentIndex -= numberOfCardsToShow;
					renderInfoCards();
				}
			});
			nextIcon.addEventListener('click', () => {
				if (
					currentIndex + numberOfCardsToShow <
					infoCardsData.length
				) {
					currentIndex += numberOfCardsToShow;
					renderInfoCards();
				}
			});
		}
	};

	const updateCardsBasedOnScreenSize = () => {
		const smallScreens = window.matchMedia('(max-width: 768px)');
		const mediumScreens = window.matchMedia('(max-width: 1024px)');

		if (smallScreens.matches) {
			numberOfCardsToShow = 1;
			cardWidth = 300;
		} else if (mediumScreens.matches) {
			numberOfCardsToShow = 2;
			cardWidth = 450;
		} else {
			numberOfCardsToShow = 3;
			cardWidth = 450;
		}

		renderInfoCards();
	};

	updateCardsBasedOnScreenSize();

	// Add event listeners for screen size changes
	window
		.matchMedia('(max-width: 768px)')
		.addEventListener('change', updateCardsBasedOnScreenSize);
	window
		.matchMedia('(max-width: 1024px)')
		.addEventListener('change', updateCardsBasedOnScreenSize);
});
