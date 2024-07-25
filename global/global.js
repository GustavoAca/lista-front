document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.formulario input');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() === '') {
        input.classList.remove('filled');
        input.classList.add('empty');
      } else {
        input.classList.remove('empty');
        input.classList.add('filled');
      }
    });

    input.dispatchEvent(new Event('input'));
  });
});
