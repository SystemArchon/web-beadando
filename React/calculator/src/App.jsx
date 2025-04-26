import { useState } from 'react'
import './App.css'

function App() {
  function appendToInput(value) {
    setInputValue((prev) => prev + value)
  }
  function clearInput() {
    setInputValue('')
  }
  function calculate() {
    const result = eval(inputValue)
    setInputValue(result.toString())
  }

  function handleButtonClick(value) {
    if (value === '=') {
      calculate()
    } else if (value === 'C') {
      clearInput()
    } else {
      appendToInput(value)
    }
  }

  const [inputValue, setInputValue] = useState('');

  return (
    <div className='calculator'>
      <div className="input-row">
        <span className="input-text">
          {inputValue}
        </span>
        <button className='calc-button' onClick={() => clearInput()}>
          C
          </button>
      </div>
      <div className="calc-buttons">
        <div className="button-row">
          <button className="calc-button" onClick={() => handleButtonClick('7')}>
            7
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('8')}>
            8
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('9')}>
            9
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('*')}>
            *
          </button>
        </div>

        <div className="button-row">
          <button className="calc-button" onClick={() => handleButtonClick('4')}>
            4
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('5')}>
            5
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('6')}>
            6
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('-')}>
            -
          </button>
        </div>

        <div className="button-row">
          <button className="calc-button" onClick={() => handleButtonClick('1')}>
            1
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('2')}>
            2
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('3')}>
            3
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('+')}>
            +
          </button>
        </div>


        <div className="button-row">
          <button className="calc-button" onClick={() => handleButtonClick('/')}>
            /
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('0')}>
            0
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('.')}>
            .
          </button>
          <button className="calc-button" onClick={() => handleButtonClick('=')}>
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
