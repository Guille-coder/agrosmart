export async function getCurrentWeather() {
  const latitude = -12.05;   // Lima
  const longitude = -77.05;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();
    return data.current_weather;

  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}