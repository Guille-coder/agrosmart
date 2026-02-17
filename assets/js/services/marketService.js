export async function getMarketData() {
  await new Promise(resolve => setTimeout(resolve, 800));
  const commodities = [
    { name: "Wheat", base: 6.42 },
    { name: "Corn", base: 4.85 },
    { name: "Rice", base: 14.12 },
    { name: "Soybeans", base: 12.77 }
  ];

  return commodities.map(item => {
    const variation = (Math.random() * 0.6 - 0.3).toFixed(2);
    const price = (item.base + parseFloat(variation)).toFixed(2);

    return {
      name: item.name,
      price,
      change: variation,
      updated: new Date().toLocaleTimeString()
    };
  });
}