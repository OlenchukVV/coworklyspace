// js/window.js
export function setupModal() {
  const modal = document.getElementById('modal');
  const closeBtn = modal.querySelector('.modal-close');

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

export function openModal(data) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCity = document.getElementById('modalCity');
  const modalImage = document.getElementById('modalImage');

  modalTitle.textContent = data.name;
  modalDesc.textContent = data.desc;
  modalCity.textContent = data.city.charAt(0).toUpperCase() + data.city.slice(1);
  modalImage.src = data.image;
  modal.style.display = 'block';
}
