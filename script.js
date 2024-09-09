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
});
