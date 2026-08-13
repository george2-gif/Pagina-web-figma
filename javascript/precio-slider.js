/* Control del rango de precios (compartido por vista9.html y vista10.html). */
const priceSlider = document.querySelector('.price-slider');
const maximumPrice = priceSlider.querySelector('.price-max');
const maximumLabel = priceSlider.parentElement.querySelector('[data-price-max]');

function updatePriceRange() {
  const maximum = Number(maximumPrice.value);
  const maximumPosition = ((maximum - 20) / 80) * 100;
  priceSlider.style.setProperty('--max-position', `${maximumPosition}%`);
  maximumLabel.textContent = maximum === 100 ? '$100+' : `$${maximum}`;
  maximumPrice.setAttribute('aria-valuetext', maximum === 100 ? '$100+' : `$${maximum}`);
}

maximumPrice.addEventListener('input', updatePriceRange);