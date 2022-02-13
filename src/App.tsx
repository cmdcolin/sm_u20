import React, { useRef, useState, useEffect } from 'react'
import './App.css'
import text from './room40'

import Typist from 'react-typist'

function App() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ref2 = useRef<HTMLSourceElement>(null)
  const [pos, setPos] = useState(0)
  useEffect(() => {
    requestAnimationFrame(() => setPos(pos + 0.27))
  }, [pos])

  return (
    <div className="container">
      <div
        className="background"
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <canvas ref={ref} />
      <div style={{ position: 'absolute', top: -pos, left: 20 }}>
        <Typist>
          {text.split('\n').map(r => (
            <div>
              {r}

              <Typist.Delay ms={200} />
            </div>
          ))}
        </Typist>
      </div>

      <audio
        controls
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <source
          ref={ref2}
          src="https://s3.us-east-2.amazonaws.com/myloveydove.com/220212_00.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  )
}

export default App
