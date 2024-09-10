document.addEventListener('DOMContentLoaded', () => {
	const dropdown = document.getElementById('country-dropdown');

	// Fetch the list of countries from Rest Countries API
	fetch('https://restcountries.com/v3.1/all')
		.then((response) => response.json())
		.then((data) => {
			// Sort countries by name
			const countries = data.sort((a, b) =>
				a.name.common.localeCompare(b.name.common)
			);

			// Populate the dropdown with country names and codes
			countries.forEach((country) => {
				const option = document.createElement('option');
				option.value = country.cca2;
				option.textContent = country.name.common;
				dropdown.appendChild(option);
			});
		})
		.catch((error) => {
			console.error('Error fetching countries:', error);
		});

	let startingIndex = 0;
	let numberOfVideosToShow = 3;
	let videoWidth = '450';

	const smallScreens = window.matchMedia('(max-width: 768px)');
	const ipadScreens = window.matchMedia('(max-width: 1024px)');
	const smallLaptops = window.matchMedia('(max-width: 1280px)');

	if (smallScreens.matches) {
		numberOfVideosToShow = 1;
		videoWidth = '300';
	} else if (ipadScreens.matches) {
		numberOfVideosToShow = 2;
		videoWidth = '350';
	} else if (smallLaptops.matches) {
		videoWidth = '350';
	}

	const videos = [
		{
			title: 'Fortnight (feat Post Malone)',
			description: 'Description of Video 1',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Sikosa (feat Post Malone)',
			description: 'Description of Video 2',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Byakubaho (feat Post Malone)',
			description: 'Description of Video 3',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Eden (feat Post Malone)',
			description: 'Description of Video 4',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Byukuri (feat Post Malone)',
			description: 'Description of Video 5',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Byakubaho (feat Post Malone)',
			description: 'Description of Video 6',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
	];

	const videosContainer = document.querySelector('.videos-container');

	// Function to update the displayed videos without removing icons
	const updateDisplayedVideos = () => {
		// Clear only the video elements, keep the icons
		const videoWrappers =
			videosContainer.querySelectorAll('.video-wrapper');
		videoWrappers.forEach((wrapper) => wrapper.remove());

		// Get the slice of videos to display
		videos
			.slice(startingIndex, startingIndex + numberOfVideosToShow)
			.forEach((video) => {
				const videoDiv = document.createElement('div');
				videoDiv.classList.add('video-wrapper');

				const iframe = document.createElement('iframe');
				iframe.src = video.url;
				iframe.width = videoWidth;
				iframe.height = '315';
				iframe.allowFullscreen = true;

				videoDiv.appendChild(iframe);

				const title = document.createElement('p');
				title.textContent = video.title;
				videoDiv.appendChild(title);

				// Append the video div between the icons
				videosContainer.insertBefore(
					videoDiv,
					document.querySelector('.fa-greater-than')
				);
			});

		console.log('UPDATING');
	};

	// Initial video display
	updateDisplayedVideos();

	const nextVideo = document.querySelector('.video-next');
	const prevVideo = document.querySelector('.video-prev');

	nextVideo.addEventListener('click', () => {
		startingIndex += numberOfVideosToShow;

		if (startingIndex >= videos.length) {
			startingIndex = 0;
		}

		updateDisplayedVideos();
	});

	// Click event listener for sliding the videos to the left
	prevVideo.addEventListener('click', () => {
		// Decrement the starting index based on screen size
		startingIndex -= numberOfVideosToShow;

		// Loop back to the end if we go below 0
		if (startingIndex < 0) {
			startingIndex = videos.length - numberOfVideosToShow;
		}

		// Update the displayed videos
		updateDisplayedVideos();
	});
});
