'use client'

import { useState, useEffect } from "react"

export default function MyCode() {
    const [dogUrl, setDogUrl] = useState<string>('')
    const [dogCount, setDogCount] = useState<number>(0)
    const [error, setError] = useState<string>('')
    const [timestamp, setTimestamp] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchDog = async () => {
        setIsLoading(true)
        setError('')
        
        try {
            // This code only works if a server is running in your 3000, :3
            const response = await fetch('http://localhost:3000/random-dogs/1')
            
            if (!response.ok) throw new Error('Failed to fetch')
            const [newDogUrl] = await response.json()
            
            setDogUrl(newDogUrl)
            setTimestamp(new Date().toLocaleTimeString())
            setDogCount(prev => prev + 1)
            
        } catch (error) {
            console.error("⚠️ Error:", error)
            setError('Failed to fetch dog. Try again!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div className="header">
                <h1 className="title highlight">🐶 Random Dog Generator</h1>
                <p id="subtitle">Click below to fetch a dog!</p>
            </div>
            
            <button 
                onClick={fetchDog}
                disabled={isLoading}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1
                }}
                aria-label="Fetch new dog"
            >
                {isLoading ? 'Loading...' : 'Get Dog!'}
            </button>
            
            <div id="dogContainer" style={{ marginTop: '20px' }}>
                {error ? (
                    <div>
                        <p style={{ color: 'red' }}>{error}</p>
                        <p>You probably haven't started the server yet. Check the readme. :P</p>
                    </div>
                ) : dogUrl && (
                    <div>
                        <img 
                            src={dogUrl} 
                            alt="Random Dog"
                            style={{
                                maxWidth: '400px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                        <p className="timestamp" style={{ marginTop: '10px', color: '#666' }}>
                            Fetched at: {timestamp}
                        </p>
                    </div>
                )}
            </div>
            
            <div className="dog-stats" style={{ marginTop: '20px' }}>
                <p>Dogs fetched: <span id="counter" style={{ fontWeight: 'bold' }}>{dogCount}</span></p>
            </div>
        </div>
    )
}
