import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./App.css";

// sample water trend data
const waterData = [
  { month: "Jan", reservoir: 58, snowpack: 75 },
  { month: "Feb", reservoir: 62, snowpack: 95 },
  { month: "Mar", reservoir: 70, snowpack: 110 },
  { month: "Apr", reservoir: 78, snowpack: 105 },
  { month: "May", reservoir: 85, snowpack: 75 },
  { month: "Jun", reservoir: 88, snowpack: 40 },
];

function App() {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [topCrops, setTopCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!crop.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop }),
      });

      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      setResult("Error connecting to server.");
    }

    setLoading(false);
  }

  // 🌾 NEW: fetch top crops
  async function fetchTopCrops() {
    setLoadingCrops(true);

    try {
      const res = await fetch("http://localhost:8000/top_crops", {
        method: "GET",
      });

      const data = await res.json();
      setTopCrops(data.crops); // expects: { crops: ["wheat", "corn", "barley"] }
    } catch (err) {
      setTopCrops([]);
    }

    setLoadingCrops(false);
  }

  return (
    <div className="bg">
      <div className="container">

        <header className="header">
          <h1>🌾 Crop Water Advisor</h1>
          <p>Analyze crop suitability using California water data</p>
        </header>

        {/* 📊 GRAPH */}
        <div className="glass-card">
          <h2>📊 Water Trends</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="reservoir"
                stroke="#4fc3f7"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="snowpack"
                stroke="#81c784"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🌾 TOP CROPS TABLE */}
        <div className="glass-card" style={{ marginTop: "20px" }}>
          <h2>🌱 Top 3 Recommended Crops</h2>

          <button
            className="form-button"
            onClick={fetchTopCrops}
          >
            {loadingCrops ? "Loading..." : "Get Top Crops"}
          </button>

          {topCrops.length > 0 && (
            <table className="crop-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Crop</th>
                </tr>
              </thead>
              <tbody>
                {topCrops.map((c, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* FORM */}
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

          {result && <div className="result">{result}</div>}
        </div>

      </div>
    </div>
  );
}

export default App;