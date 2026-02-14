export async function getExchangeRate() {
  const url = "https://api.frankfurter.app/latest?from=USD&to=PEN";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Exchange rate API request failed");
    }

    const data = await response.json();
    return data.rates.PEN;

  } catch (error) {
    console.error("Exchange fetch error:", error);
    return null;
  }
}