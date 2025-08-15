(function initChart() {
    const canvas = document.getElementById('salesChart');
    const ctx = canvas.getContext('2d');
  
    // Create a vertical gradient for the line fill
    function makeGradient(ctx) {
      const { height } = ctx.canvas;
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, 'rgba(112, 214, 255, 0.45)'); // top
      g.addColorStop(1, 'rgba(112, 214, 255, 0.00)'); // bottom transparent
      return g;
    }
  
    // Dummy data
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data = [12, 19, 15, 22, 28, 24, 30, 34, 29, 26, 31, 37];
  
    const gradientFill = makeGradient(ctx);
  
    // Build chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Sales (k)',
          data,
          borderColor: '#70d6ff',
          backgroundColor: gradientFill,
          tension: 0.32,
          fill: true,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointHitRadius: 12
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Use CSS height
        plugins: {
          legend: {
            labels: { color: '#d8e0f0' }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}k`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#a5b0c4' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: {
              color: '#a5b0c4',
              callback: (v) => v + 'k'
            }
          }
        },
        animation: {
          duration: 900,
          easing: 'easeOutQuart'
        }
      }
    });
  
    // Optional: re-create gradient on resize (in case canvas height changes)
    window.addEventListener('resize', () => {
      // Chart.js handles layout, but if you want to keep gradient proportional:
      // (Rebuild gradient + update dataset background)
      const newGrad = makeGradient(ctx);
      const chart = Chart.getChart(canvas);
      if (chart) {
        chart.data.datasets[0].backgroundColor = newGrad;
        chart.update('none');
      }
    });
  })();
  