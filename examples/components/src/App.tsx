import type { MutableRefObject } from 'react'
import { useRef, useState } from 'react'
import { Modal } from '@damilaredev/modals'
import reactLogo from './assets/react.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const roundModal: MutableRefObject<any> = useRef<HTMLDivElement | null>(null)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold">Vite + React</h1>
      <div className="card">
        <button onClick={() => roundModal.current.open()}>
          count is {count}
        </button>
        <Modal
          // customClass="w-11/12 sm:w-6/12 pt-14"
          close={() => roundModal.current.close()}
          ref={roundModal}
          isDismisable={false}
        >
          damilare
        </Modal>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
