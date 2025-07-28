'use client'

export default function BeautifulDevelopers() {
  console.log('My client component!');
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Hello <span style={{ color: 'hotpink' }}>Beautiful Developers!</span> 👋</h1>
      <button 
        onClick={() => alert('YOU CLICKED! (React still works)')}
        style={{
          background: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
      >
        Click for Magic
      </button>
    </div>
  )
}