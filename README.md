# Weather-app

Detects Your Location on Load When you open the app, it automatically tries to detect your current location using your device's GPS. If permission is granted, it fetches the weather for your current coordinates and displays it on the screen.

Search by City Name You can manually search for the weather in any city by entering its name in the input box. When you click the search button, it fetches the weather data for that city and shows it.

Smart Autocomplete Suggestions As you type a city name, the app gives you suggestions based on what you’ve typed so far. These suggestions come from an external weather API and help you select the correct city, especially when multiple cities have similar names.

Clicking a Suggestion When you click on a suggestion, the app stores the exact location (latitude and longitude) of that city. Then, when you search, it uses those coordinates to get more accurate weather data.

Displaying Weather Details After fetching the data, the app displays:

The city and country name

The temperature in Celsius

A short weather description (like “clear sky” or “light rain”)

Humidity percentage

Wind speed in km/h

A relevant image/icon based on the current weather (like a cloud, sun, or rain icon)

Error Handling If the city name is invalid or the weather data can’t be found, the app shows an error message saying the location was not found.
