import { useState } from "react";
import "./App.css";

function App() {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!crop.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: crop,
        }),
      });

      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      setResult("Error connecting to server.");
    }

    setLoading(false);
  }

  return (
    <div className="bg">
      <div className="container">

        <header className="header">
          <h1>🌾 Crop Water Advisor</h1>
          <p>Enter a crop to analyze water suitability</p>
        </header>

        <div className="glass-card">

          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="e.g. wheat, rice, corn"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            />

            <button type="submit">
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>

          {result && (
            <div className="result">
              {result}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;