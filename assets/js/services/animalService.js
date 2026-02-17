
/* ===============================
   LOCAL STORAGE
================================= */

export function getAnimals() {
  const data = localStorage.getItem("animals");
  return data ? JSON.parse(data) : [];
}

export function saveAnimals(animals) {
  localStorage.setItem("animals", JSON.stringify(animals));
}

/* ===============================
   EXTERNAL API
================================= */

const API_KEY = "DXiF4yWUIG20VtywBOOxtxFHv8ekow2fYfEGSXOX";

export async function getAnimalInfo(type) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${type}`,
      {
        headers: {
          "X-Api-Key": API_KEY
        }
      }
    );

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Animal API error:", error);
    return null;
  }
}