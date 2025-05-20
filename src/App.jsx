import './App.css'
import CountDown from './CountDown'

// write a Countdown component which accepts  a duration & timeBeforeUrgent component.
// timeBeforeUrgent changes the color & font weight of the countdown when it reaches a certain time left;
// the text also starts pulsating.

function App() {
    // the component should accept this kind of duration format
  const duration = '1 day 1 hour 1 minute 1 second';
  const timeBeforeUrgent = '1 day 1 hour 30 seconds';
  return (
    <>
      <h1>NineID Countdown</h1>
      <CountDown
        duration={duration}
        timeBeforeUrgent={timeBeforeUrgent}
        />
    </>
  )
}

export default App
