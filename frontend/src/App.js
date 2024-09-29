import React, { useEffect, useState } from "react";
import { fetchMessage } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      const data = await fetchMessage();
      setMessage(data.message);
    };

    getMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
