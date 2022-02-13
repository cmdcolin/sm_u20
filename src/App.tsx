import { useRef, useMemo, useState, useEffect } from 'react'
import './App.css'
import text from './room40'

import Typist from 'react-typist'

const images = [
  '111-SC-001003-ac.resized.jpg',
  '111-SC-001004-ac.resized.jpg',
  '111-SC-001005-ac.resized.jpg',
  '111-SC-001007-ac.resized.jpg',
  '111-SC-001008-ac.resized.jpg',
  '117699990_001.jpg',
  '165-WW-272A-006.resized.jpg',
  '165-WW-273A-081.resized.jpg',
  '165-WW-274B-022.resized.jpg',
  '165-WW-322D-010.resized.jpg',
  '165-WW-328G-007.resized.jpg',
  '165-WW-328G-008.resized.jpg',
  '165-WW-328G-015.resized.jpg',
  '165-WW-330C-002.resized.jpg',
  '165-WW-330C-021.resized.jpg',
  '165-WW-330C-029.resized.jpg',
  '6943087-018-0001.jpg',
  'DM-SILVR-M81a-5_001.resized.jpg',
  'DM-SILVR-M81a-6_001.resized.jpg',
  'DM-SILVR-M81a-9_002.resized.jpg',
  'letter-concerning-the-capture-of-German-subs-pg-1.jpg',
  'M248-46-0498.jpg',
  'original (10).renamed.jpg',
  'original (11).renamed.jpg',
  'original (12).renamed.jpg',
  'original (13).renamed.jpg',
  'original (1).jpg',
  'original (1).renamed.jpg',
  'original (2).jpg',
  'original (2).renamed.jpg',
  'original (3).jpg',
  'original (3).renamed.jpg',
  'original (4).renamed.jpg',
  'original (5).renamed.jpg',
  'original (6).renamed.jpg',
  'original (7).renamed.jpg',
  'original (8).renamed.jpg',
  'original (9).renamed.jpg',
  'original.jpg',
  'original.renamed.jpg',
  'PD-206_German-subs.jpg',
  'Waterloo-lusitania.jpg',
  '3rd-class-ticket-l.jpg',
]

let shuffled = images
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

const timeout = 20 //seconds

function App() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const [curr, setCurr] = useState(0)
  const [pos, setPos] = useState(-200)
  const [shouldTransition, setShouldTransition] = useState(true)

  const lines = useMemo(() => {
    const l = text.split('\n')
    const start = Math.floor(Math.random() * l.length)
    return [...l.slice(start), ...l.slice(0, start)]
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setCurr((curr + 1) % images.length)
      setShouldTransition(false)
    }, timeout * 1000)
  }, [curr])

  useEffect(() => {
    // clearing and resetting it like this helps restart the keyframes
    if (shouldTransition === false) {
      setShouldTransition(true)
    }
  }, [shouldTransition])

  return (
    <div className="container">
      <div
        className="background"
        ref={ref2}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: 'url("./images/resized/' + shuffled[curr] + '")',
          animationDuration: timeout + 's',
          animationName: shouldTransition ? 'zoomin' : '',
        }}
      />
      <canvas ref={ref} />
      <div style={{ position: 'absolute', top: -pos, left: 20, width: 10000 }}>
        <Typist
          stdTypingDelay={50}
          avgTypingDelay={120}
          onLineTyped={() => setPos(pos + 12)}
        >
          {lines.map((r, i) => (
            <div key={r + '_' + i}>
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
          src="https://s3.us-east-2.amazonaws.com/myloveydove.com/220212_00.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  )
}

export default App
