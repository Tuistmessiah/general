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
    
    // Update counter
    document.getElementById('counter').textContent = ++dogCount;
    
    // Add animation
    document.querySelector('#dogContainer img').classList.add('animate');
    
  } catch (error) {
    console.error("⚠️ Error:", error);
    document.getElementById('dogContainer').innerHTML = `
      <p class="error">Failed to fetch dog. Try again!</p>
      <p>You probably haven't started the server yet. Check the readme. :P</p>
    `;
  }
});

// Exercise: Mouse tracker

document.addEventListener('mousemove', (e) => {
  // console.log('mousemove', e);
  const tracker = document.getElementById('mouseTracker');
  tracker.style.opacity = 1;
  console.log(e.clientX, e.clientY);
  tracker.style.transform = `translate(
    ${e.clientX}px, 
    ${e.clientY}px
  )`;
});

// Fade out when mouse leaves window
document.addEventListener('mouseout', () => {
  document.getElementById('mouseTracker').style.opacity = 0;
});