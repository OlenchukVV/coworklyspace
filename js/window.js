// Функція для налаштування модального вікна
export function setupModal() {
  const modal = document.getElementById('modal');
  const closeBtn = modal?.querySelector('.modal-close');

  if (!modal || !closeBtn) return console.error('Не знайдено елементів для модального вікна');

  closeBtn.onclick = () => (modal.style.display = 'none');
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}

// Функція для відкриття модального вікна з даними
export function openModal(data) {
  const getEl = id => document.getElementById(id);
  const modal = getEl('modal');

  const elements = {
    title: getEl('modalTitle'),
    desc: getEl('modalDesc'),
    city: getEl('modalCity'),
    image: getEl('modalImage'),
    price: getEl('modalPrice'),
    features: getEl('modalFeatures'),
    map: getEl('modalMap'),
    bookBtn: getEl('reserveButton'),
    closeBtn: modal?.querySelector('.modal-close'),
  };

  // Перевірка наявності всіх елементів
  if (Object.values(elements).some(el => !el) || !modal) {
    return console.error('Не знайдені необхідні елементи модального вікна');
  }

  // Заповнення даними
  elements.title.textContent = data.name;
  elements.desc.textContent = data.desc;
  elements.city.textContent = capitalize(data.city);
  elements.image.src = data.image;
  elements.price.textContent = `${data.price} грн/день`;
  elements.features.textContent = data.features || 'Немає додаткових зручностей';
  elements.map.href = data.map || '#';


  // Показати модальне вікно
  modal.style.display = 'block';
  localStorage.setItem('recommendedCity', data.city);

  // Закриття по хрестику
  elements.closeBtn.onclick = () => (modal.style.display = 'none');
}

// Допоміжна функція: велика літера
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
