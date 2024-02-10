import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import "../Styles/Generator.css";

function Generator() {
  const [qr, setQR] = useState("");
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("gray");
  const [success, setSuccess] = useState(false);

  function handleActive() {
    if (input === "") {
      setActive(false);
      setSuccess(false);
    } else {
      setActive(true);
      setColor("green");
    }
  }


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    handleActive();
  }, [input]);

  function handleGenerateQR() {
    setQR(input);
    setSuccess(true);
    
  }

  return (
    <div className="wrapper">
      <div className="input">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter your value here"
        />

        <button onClick={handleGenerateQR} style={{ backgroundColor: color }}>
          Generate QR
        </button>
      </div>

      <div className="qr-code">
        <QRCode value={qr} size={200} />
      </div>

     

      <div className="message-container">
      <div className={`message ${success ? 'show' : ''}`}>
        {success && <h4>QR Code created successfully</h4>}
      </div>
    </div>

    </div>
  );
}

export default Generator;
