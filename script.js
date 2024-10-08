async function fetchIndicators() {
  try {
    const response = await fetch('https://mindicador.cl/api');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function createIndicatorCard(indicator) {
  const card = document.createElement('div');
  card.className = 'indicator-card';

  const name = document.createElement('h2');
  name.textContent = indicator.nombre;

  const value = document.createElement('p');
  value.textContent = `Valor: ${indicator.valor} ${indicator.unidad_medida}`;

  const date = document.createElement('p');
  date.textContent = `Fecha: ${new Date(indicator.fecha).toLocaleDateString()}`;

  card.appendChild(name);
  card.appendChild(value);
  card.appendChild(date);

  return card;
}

async function displayIndicators() {
  const indicators = await fetchIndicators();
  const indicatorsContainer = document.getElementById('indicators');

  for (const key in indicators) {
    if (typeof indicators[key] === 'object' && indicators[key] !== null) {
      const card = createIndicatorCard(indicators[key]);
      indicatorsContainer.appendChild(card);
    }
  }
}

document.addEventListener('DOMContentLoaded', displayIndicators);
