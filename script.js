// Get references to the HTML elements
const searchInput = document.getElementById('searchInput');
const breweryContainer = document.getElementById('breweryContainer');

// Function to display brewery information
function displayBrewery(brewery) {
  const breweryInfo = document.createElement('div');
  breweryInfo.classList.add('brewery');
  breweryInfo.innerHTML = `
    <h2>${brewery.name}</h2>
    <p class="brewery-type"><strong>Type:</strong> ${brewery.brewery_type}</p>
    <div class="address">
      <p>${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.country}</p>
    </div>
    <p class="website"><strong>Website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
    <p class="phone"><strong>Phone:</strong> ${brewery.phone}</p>
  `;
  breweryContainer.appendChild(breweryInfo);
}

// Function to fetch and process the API data
async function fetchBreweries() {
  try {
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    const data = await response.json();
    
    // Clear previous results
    breweryContainer.innerHTML = '';

    // Filter breweries based on search input
    const searchValue = searchInput.value.toLowerCase();
    const filteredBreweries = data.filter(brewery => brewery.name.toLowerCase().includes(searchValue));

    // Display brewery information
    filteredBreweries.forEach((brewery, index) => {
      displayBrewery(brewery);

      // Apply different colors to text based on index
      const breweryElements = breweryContainer.getElementsByClassName('brewery');
      const currentBreweryElement = breweryElements[index];
      const colors = ['red', 'blue', 'green', 'orange', 'purple'];
      currentBreweryElement.style.color = colors[index % colors.length];
    });
  } catch (error) {
    console.log('Error:', error);
  }
}

// Event listener for search input
searchInput.addEventListener('input', fetchBreweries);

// Initial fetch to display all breweries
fetchBreweries();
