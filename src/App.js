import './App.css';
import { userName } from "./components/Data";
import { useState, React } from 'react';
import Loading from './components/Loading'; 
import confetti from "canvas-confetti";

function App() {
  const [users, setUsers] = useState(userName);
  const [winner, setWinner] = useState([]);

  const [uiProps, setUiProps] = useState({
    buttonDisable: false,
    progressBar: false,
  });

  function randomUser() {
    if (users.length === 0) {
      return null; // No users left to select
    }
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }

  const handleSearch = () => {
    setUiProps({ buttonDisable: true, progressBar: true });
    setTimeout(() => {
      const random = randomUser();
      if (random) {
        setWinner([...winner, random]); 
        const updatedUsers = users.filter((user) => user !== random); 
        setUsers(updatedUsers); 
        console.log(`Winner Selected: ${random}`);
      } else {
        console.log("No more users left to select as winners.");
      }
      confetti({
        particleCount: 700, // Number of confetti particles
        spread: 400, // Spread angle
        origin: { x: 0.5, y: 0.5 }, // Start from center of the screen
        zIndex: 1000, // Ensure it appears above all elements
      });
      setUiProps({ buttonDisable: false, progressBar: false });
    }, 4000);
  };

  return (
    <div className="App">
      
        
        <ul className="winner">
        {winner.length > 0 && <h3 style={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', margin: '20px 0'}}>Winner Selected</h3>}
          {winner.map((winner, index) => (
            <li key={index} className="winner-item">{winner}</li>
          ))}
        </ul>
        {uiProps.progressBar && <Loading />}
        <button onClick={handleSearch} disabled={uiProps.buttonDisable}>
          Click Here to get the Winner
        </button>
        <ul className="username">
          {users.map((user, index) => (
            <li key={index} className="username-list-item">{user}</li>
          ))}
        </ul>
    
    </div>
  );
}

export default App;
