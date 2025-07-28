// Original dog fetching code
let dogCount = 0;

document.getElementById('fetchBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/random-dogs/1');
    
    if (!response.ok) throw new Error('Failed to fetch');
    const [dogUrl] = await response.json();
    
    document.getElementById('dogContainer').innerHTML = `
      <img src="${dogUrl}" alt="Random Dog">
      <p class="timestamp">Fetched at: ${new Date().toLocaleTimeString()}</p>
    `;
    
    document.getElementById('counter').textContent = ++dogCount;
    document.querySelector('#dogContainer img').classList.add('animate');
    
  } catch (error) {
    console.error("⚠️ Error:", error);
    document.getElementById('dogContainer').innerHTML = `
      <p class="error">Failed to fetch dog. Try again!</p>
    `;
  }
});

// 1. Spinny box that follows mouse
document.addEventListener('mousemove', (e) => {
  const spinnyBox = document.getElementById('spinnyBox');
  spinnyBox.style.left = `${e.clientX - 10}px`;
  spinnyBox.style.top = `${e.clientY - 10}px`;
  spinnyBox.style.transform = `rotate(${e.clientX + e.clientY}deg)`;
});

// 2. Color burst when pressing any key
document.addEventListener('keydown', () => {
  const burst = document.getElementById('colorBurst');
  burst.classList.add('color-pop');
  setTimeout(() => burst.classList.remove('color-pop'), 300);
});