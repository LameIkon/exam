import { useEffect, useState } from 'react'; 
import './App.css'

function App() { 
  const [msg, setMsg] = useState(''); 

  useEffect(() => { 
    fetch('/api/contacts') 
      .then(res => res.json()) 
      .then(data => setMsg(JSON.stringify(data))); 
  }, []); 

  return ( 
    <div> 
      <h1>Server says:</h1> 
      <p>{msg}</p> 
    </div> 
  ); 
}

export default App
