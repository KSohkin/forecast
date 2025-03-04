async function fetchData(apiUrl, location) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayWeatherData(data, location);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayWeatherData(data, location) {
    const weatherContainer = document.getElementById('weatherContainer');
    const locationHeader = document.createElement('h2');
    locationHeader.textContent = location;
    weatherContainer.appendChild(locationHeader);
  
    // Group data by date
    const groupedData = groupDataByDate(data.hourly.time, data.hourly.temperature_2m);
  
    for (const date in groupedData) {
      const dateHeader = document.createElement('h3');
      dateHeader.textContent = date;
      weatherContainer.appendChild(dateHeader);
  
      const list = document.createElement('ul');
      groupedData[date].forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `Time: ${entry.time}, Temperature: ${entry.temperature}`;
        list.appendChild(listItem);
      });
      weatherContainer.appendChild(list);
    }
  }
  
  function groupDataByDate(times, temperatures) {
    return times.reduce((groupedData, time, index) => {
      const date = time.split('T')[0];
      const timeOfDay = time.split('T')[1];
  
      if (!groupedData[date]) groupedData[date] = [];
      groupedData[date].push({ time: timeOfDay, temperature: temperatures[index] });
  
      return groupedData;
    }, {});
  }
  
  // Fetch weather data for different locations
  
  fetchData('https://api.open-meteo.com/v1/forecast?latitude=59.436962&longitude=24.753574&hourly=temperature_2m&timezone=auto', 'Tallinn');
  