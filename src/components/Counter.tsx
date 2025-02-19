import { Button } from '@mui/material'
import React, {useEffect} from 'react'

// interface Props {
//     count: number
//     onIncrement: () => void
//     onDecrement: () => void
//     onReset: () => void
// }


const Counter: React.FC = () => {
    const [count, setCount] = React.useState(0)
    const handleIncrement = () => {
        setCount((c) => c + 1)
    }
    const handleDecrement = () => {
        setCount((c) => c - 1)
    }
    const handleReset = () => {
        setCount(0)
    }
    useEffect(() => {
        // Set the background color based on the count
        document.body.style.background = `linear-gradient(to right, rgba(255, 0, 0, ${count / 100}), rgba(0, 0, 255, ${count / 100}))`;
      }, [count]);

  return (
    <div className='Counter'>
      <p className='text-center text-2xl'>{count}</p>
      <div className='flex'><Button onClick={handleIncrement} variant='outlined'>+</Button><Button onClick={handleReset} variant='contained'>Reset</Button><Button onClick={handleDecrement} variant='outlined'>-</Button></div>
    </div>
  )
}

export default Counter
