import React from 'react'
import { useWasm } from './hooks/useWasm'

const App: React.FC = () => {
  const { helloString, isLoading } = useWasm()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '2rem' }}>
        {helloString} 🌍
        {isLoading && <span style={{ fontSize: '0.8em', color: '#666' }}> (from WASM)</span>}
      </h1>
      
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        Welcome to your TypeScript React + WASM app
      </p>
      
      <div style={{ marginTop: '2rem' }}>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          disabled={isLoading}
          onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#007bff')}
          onClick={() => !isLoading && alert(`Message from WASM: ${helloString}`)}
        >
          {isLoading ? 'Loading WASM...' : 'Click Me!'}
        </button>
      </div>
    </div>
  )
}

export default App