import { useState , useEffect} from "react";
import "./App.css";

function App() {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [drought, setDrought] = useState({ pdsi: "N/A", snowpack_pct: "N/A" });
  const [reservoirs, setReservoirs] = useState([]);

  useEffect(() => {
  async function loadDashboard() {
    try {
      const droughtRes = await fetch("http://localhost:8000/api/drought");
      const droughtData = await droughtRes.json();

      const resRes = await fetch("http://localhost:8000/api/reservoirs");
      const reservoirData = await resRes.json();

      setDrought(droughtData);
      setReservoirs(reservoirData);
    } catch (error) {
      console.log("Dashboard load failed");
    }
  }

  loadDashboard();
}, []);
  
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

          <div className="dashboard">
            <h2>💧 Water Dashboard</h2>

            <p>PDSI: {drought.pdsi}</p>
            <p>Snowpack: {drought.snowpack_pct}%</p>

            <h3>Reservoirs</h3>

          {reservoirs.map((r, index) => (
            <div key={index}>
              {r.name} - {r.fill_pct}%
            </div>
      ))}
          </div>
        <div>
      </div>
    </div>
  );
}

export default App;