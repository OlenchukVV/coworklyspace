// window.js
export function setupModal() {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h2 id="modalTitle"></h2>
      <p id="modalDesc"></p>
      <p><strong>Місто:</strong> <span id="modalCity"></span></p>
      <button id="reserveButton">Забронювати</button>
    </div>
  `;
  document.body.appendChild(modal);

  const backdrop = modal.querySelector('.modal-backdrop');
  const close = modal.querySelector('.modal-close');

  close.addEventListener('click', () => modal.style.display = 'none');
  backdrop.addEventListener('click', () => modal.style.display = 'none');
}

export function openModal(coworking) {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  document.getElementById('modalTitle').textContent = coworking.name;
  document.getElementById('modalDesc').textContent = coworking.desc;
  document.getElementById('modalCity').textContent = coworking.city.charAt(0).toUpperCase() + coworking.city.slice(1);
}
