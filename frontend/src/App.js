import React, { useEffect, useState } from "react";
import { fetchMessage } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      const { message } = await fetchMessage();
      setMessage(message);
    };

    getMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!!message ? message : "Loading"}</p>
      </header>
    </div>
  );
}

export default App;
