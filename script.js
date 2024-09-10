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
				option.value = country.cca2; // Use country code as the value
				option.textContent = country.name.common; // Display country name
				dropdown.appendChild(option);
			});
		})
		.catch((error) => {
			console.error('Error fetching countries:', error);
		});

	// Show some of the list in the directed projects

	let startingIndex = 0;

	const videos = [
		{
			title: 'Fortnight (feat Post Malone)',
			description: 'Description of Video 1',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Fortnight (feat Post Malone)',
			description: 'Description of Video 2',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
		{
			title: 'Fortnight (feat Post Malone)',
			description: 'Description of Video 3',
			url: 'https://www.youtube.com/embed/CLQ5TSQlA08?si=eQ0sNCoOyl_oIUbp',
		},
	];

	// Get the container where videos will be appended
	const videosContainer =
		document.getElementsByClassName('videos-container')[0];

	// Loop through the first three videos and append them
	videos.slice(0, 3).forEach((video) => {
		// Create a div to wrap each video
		const videoDiv = document.createElement('div');
		videoDiv.classList.add('video-wrapper');

		// Create an iframe element
		const iframe = document.createElement('iframe');
		iframe.src = video.url;
		iframe.width = '350';
		iframe.height = '315';
		iframe.allowFullscreen = true;

		// Append the iframe to the video div
		videoDiv.appendChild(iframe);

		// Optionally, create title and description elements
		const title = document.createElement('p');
		title.textContent = video.title;
		videoDiv.appendChild(title);
		videosContainer.appendChild(videoDiv);
	});
});
