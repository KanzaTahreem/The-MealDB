// pop-up  class: Handles pop-up comments tasks

export default class popup {
  static displayPopup() {
    const modal = document.querySelector('.popuphidden');
    const closeModal = document.getElementById('closeModal');
    modal.style.display = 'block';
    closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
}
