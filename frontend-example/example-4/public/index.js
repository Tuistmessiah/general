function showSection(id) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }
  
  function validate() {
    const input = document.getElementById("name");
    const pattern = new RegExp(input.dataset.format);
    const value = input.value;
    if (!pattern.test(value)) {
      alert(input.dataset.errorMessage);
    } else {
      alert("Valid!");
    }
  }
  