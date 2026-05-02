import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import "./App.css";

const rawData = [{"Date":"12/1/25","Snowpack":"65","Precip":"105","Reservoir":"72"},{"Date":"11/1/25","Snowpack":"25","Precip":"95","Reservoir":"75"},{"Date":"10/1/25","Snowpack":"8","Precip":"85","Reservoir":"78"},{"Date":"9/1/25","Snowpack":"3","Precip":"90","Reservoir":"80"},{"Date":"8/1/25","Snowpack":"5","Precip":"95","Reservoir":"83"},{"Date":"7/1/25","Snowpack":"12","Precip":"100","Reservoir":"88"},{"Date":"6/1/25","Snowpack":"40","Precip":"105","Reservoir":"92"},{"Date":"5/1/25","Snowpack":"75","Precip":"110","Reservoir":"94"},{"Date":"4/1/25","Snowpack":"110","Precip":"105","Reservoir":"90"},{"Date":"3/1/25","Snowpack":"120","Precip":"110","Reservoir":"85"},{"Date":"2/1/25","Snowpack":"105","Precip":"115","Reservoir":"80"},{"Date":"1/1/25","Snowpack":"90","Precip":"110","Reservoir":"75"},{"Date":"12/1/24","Snowpack":"60","Precip":"95","Reservoir":"70"},{"Date":"11/1/24","Snowpack":"20","Precip":"85","Reservoir":"72"},{"Date":"10/1/24","Snowpack":"6","Precip":"80","Reservoir":"75"},{"Date":"9/1/24","Snowpack":"3","Precip":"85","Reservoir":"78"},{"Date":"8/1/24","Snowpack":"5","Precip":"90","Reservoir":"80"},{"Date":"7/1/24","Snowpack":"10","Precip":"95","Reservoir":"85"},{"Date":"6/1/24","Snowpack":"35","Precip":"100","Reservoir":"88"},{"Date":"5/1/24","Snowpack":"70","Precip":"105","Reservoir":"90"},{"Date":"4/1/24","Snowpack":"95","Precip":"100","Reservoir":"88"},{"Date":"3/1/24","Snowpack":"105","Precip":"95","Reservoir":"82"},{"Date":"2/1/24","Snowpack":"100","Precip":"90","Reservoir":"78"},{"Date":"1/1/24","Snowpack":"85","Precip":"85","Reservoir":"75"},{"Date":"12/1/23","Snowpack":"75","Precip":"120","Reservoir":"80"},{"Date":"11/1/23","Snowpack":"30","Precip":"115","Reservoir":"82"},{"Date":"10/1/23","Snowpack":"10","Precip":"110","Reservoir":"85"},{"Date":"9/1/23","Snowpack":"5","Precip":"105","Reservoir":"88"},{"Date":"8/1/23","Snowpack":"6","Precip":"100","Reservoir":"90"},{"Date":"7/1/23","Snowpack":"15","Precip":"100","Reservoir":"95"},{"Date":"6/1/23","Snowpack":"50","Precip":"110","Reservoir":"98"},{"Date":"5/1/23","Snowpack":"90","Precip":"120","Reservoir":"100"},{"Date":"4/1/23","Snowpack":"150","Precip":"130","Reservoir":"100"},{"Date":"3/1/23","Snowpack":"170","Precip":"140","Reservoir":"98"},{"Date":"2/1/23","Snowpack":"160","Precip":"150","Reservoir":"95"},{"Date":"1/1/23","Snowpack":"140","Precip":"145","Reservoir":"90"},{"Date":"12/1/22","Snowpack":"50","Precip":"85","Reservoir":"65"},{"Date":"11/1/22","Snowpack":"18","Precip":"80","Reservoir":"67"},{"Date":"10/1/22","Snowpack":"5","Precip":"75","Reservoir":"70"},{"Date":"9/1/22","Snowpack":"3","Precip":"80","Reservoir":"72"},{"Date":"8/1/22","Snowpack":"5","Precip":"85","Reservoir":"75"},{"Date":"7/1/22","Snowpack":"10","Precip":"90","Reservoir":"78"},{"Date":"6/1/22","Snowpack":"30","Precip":"85","Reservoir":"80"},{"Date":"5/1/22","Snowpack":"55","Precip":"80","Reservoir":"78"},{"Date":"4/1/22","Snowpack":"70","Precip":"75","Reservoir":"75"},{"Date":"3/1/22","Snowpack":"65","Precip":"70","Reservoir":"70"},{"Date":"2/1/22","Snowpack":"60","Precip":"65","Reservoir":"68"},{"Date":"1/1/22","Snowpack":"55","Precip":"60","Reservoir":"65"},{"Date":"12/1/21","Snowpack":"45","Precip":"75","Reservoir":"60"},{"Date":"11/1/21","Snowpack":"15","Precip":"70","Reservoir":"62"},{"Date":"10/1/21","Snowpack":"4","Precip":"65","Reservoir":"65"},{"Date":"9/1/21","Snowpack":"3","Precip":"70","Reservoir":"68"},{"Date":"8/1/21","Snowpack":"5","Precip":"75","Reservoir":"70"},{"Date":"7/1/21","Snowpack":"10","Precip":"80","Reservoir":"72"},{"Date":"6/1/21","Snowpack":"25","Precip":"75","Reservoir":"75"},{"Date":"5/1/21","Snowpack":"50","Precip":"70","Reservoir":"70"},{"Date":"4/1/21","Snowpack":"65","Precip":"65","Reservoir":"68"},{"Date":"3/1/21","Snowpack":"60","Precip":"60","Reservoir":"65"},{"Date":"2/1/21","Snowpack":"55","Precip":"55","Reservoir":"63"},{"Date":"1/1/21","Snowpack":"50","Precip":"50","Reservoir":"60"},{"Date":"12/1/20","Snowpack":"55","Precip":"80","Reservoir":"65"},{"Date":"11/1/20","Snowpack":"18","Precip":"75","Reservoir":"68"},{"Date":"10/1/20","Snowpack":"5","Precip":"70","Reservoir":"70"},{"Date":"9/1/20","Snowpack":"3","Precip":"75","Reservoir":"72"},{"Date":"8/1/20","Snowpack":"5","Precip":"80","Reservoir":"75"},{"Date":"7/1/20","Snowpack":"10","Precip":"85","Reservoir":"78"},{"Date":"6/1/20","Snowpack":"30","Precip":"80","Reservoir":"80"},{"Date":"5/1/20","Snowpack":"60","Precip":"75","Reservoir":"78"},{"Date":"4/1/20","Snowpack":"80","Precip":"70","Reservoir":"75"},{"Date":"3/1/20","Snowpack":"85","Precip":"65","Reservoir":"70"},{"Date":"2/1/20","Snowpack":"80","Precip":"60","Reservoir":"68"},{"Date":"1/1/20","Snowpack":"70","Precip":"65","Reservoir":"65"},{"Date":"12/1/19","Snowpack":"65","Precip":"95","Reservoir":"70"},{"Date":"11/1/19","Snowpack":"22","Precip":"90","Reservoir":"72"},{"Date":"10/1/19","Snowpack":"7","Precip":"85","Reservoir":"75"},{"Date":"9/1/19","Snowpack":"3","Precip":"90","Reservoir":"78"},{"Date":"8/1/19","Snowpack":"5","Precip":"95","Reservoir":"80"},{"Date":"7/1/19","Snowpack":"12","Precip":"100","Reservoir":"85"},{"Date":"6/1/19","Snowpack":"45","Precip":"105","Reservoir":"88"},{"Date":"5/1/19","Snowpack":"85","Precip":"110","Reservoir":"90"},{"Date":"4/1/19","Snowpack":"120","Precip":"115","Reservoir":"88"},{"Date":"3/1/19","Snowpack":"130","Precip":"120","Reservoir":"82"},{"Date":"2/1/19","Snowpack":"125","Precip":"115","Reservoir":"78"},{"Date":"1/1/19","Snowpack":"110","Precip":"110","Reservoir":"75"},{"Date":"12/1/18","Snowpack":"60","Precip":"90","Reservoir":"68"},{"Date":"11/1/18","Snowpack":"20","Precip":"85","Reservoir":"70"},{"Date":"10/1/18","Snowpack":"6","Precip":"80","Reservoir":"72"},{"Date":"9/1/18","Snowpack":"3","Precip":"85","Reservoir":"75"},{"Date":"8/1/18","Snowpack":"5","Precip":"90","Reservoir":"78"},{"Date":"7/1/18","Snowpack":"10","Precip":"95","Reservoir":"80"},{"Date":"6/1/18","Snowpack":"35","Precip":"90","Reservoir":"82"},{"Date":"5/1/18","Snowpack":"65","Precip":"85","Reservoir":"80"},{"Date":"4/1/18","Snowpack":"90","Precip":"80","Reservoir":"78"},{"Date":"3/1/18","Snowpack":"95","Precip":"85","Reservoir":"75"},{"Date":"2/1/18","Snowpack":"90","Precip":"80","Reservoir":"72"},{"Date":"1/1/18","Snowpack":"80","Precip":"75","Reservoir":"70"},{"Date":"12/1/17","Snowpack":"60","Precip":"100","Reservoir":"75"},{"Date":"11/1/17","Snowpack":"18","Precip":"95","Reservoir":"78"},{"Date":"10/1/17","Snowpack":"4","Precip":"90","Reservoir":"80"},{"Date":"9/1/17","Snowpack":"3","Precip":"95","Reservoir":"85"},{"Date":"8/1/17","Snowpack":"5","Precip":"100","Reservoir":"90"},{"Date":"7/1/17","Snowpack":"12","Precip":"100","Reservoir":"98"},{"Date":"6/1/17","Snowpack":"45","Precip":"105","Reservoir":"100"},{"Date":"5/1/17","Snowpack":"90","Precip":"110","Reservoir":"100"},{"Date":"4/1/17","Snowpack":"140","Precip":"120","Reservoir":"95"},{"Date":"3/1/17","Snowpack":"165","Precip":"130","Reservoir":"88"},{"Date":"2/1/17","Snowpack":"150","Precip":"140","Reservoir":"78"},{"Date":"1/1/17","Snowpack":"120","Precip":"135","Reservoir":"70"},{"Date":"12/1/16","Snowpack":"55","Precip":"95","Reservoir":"63"},{"Date":"11/1/16","Snowpack":"20","Precip":"90","Reservoir":"68"},{"Date":"10/1/16","Snowpack":"5","Precip":"85","Reservoir":"72"},{"Date":"9/1/16","Snowpack":"3","Precip":"90","Reservoir":"78"},{"Date":"8/1/16","Snowpack":"5","Precip":"95","Reservoir":"82"},{"Date":"7/1/16","Snowpack":"10","Precip":"100","Reservoir":"86"},{"Date":"6/1/16","Snowpack":"40","Precip":"105","Reservoir":"88"},{"Date":"5/1/16","Snowpack":"80","Precip":"110","Reservoir":"85"},{"Date":"4/1/16","Snowpack":"105","Precip":"105","Reservoir":"78"},{"Date":"3/1/16","Snowpack":"110","Precip":"100","Reservoir":"70"},{"Date":"2/1/16","Snowpack":"95","Precip":"105","Reservoir":"62"},{"Date":"1/1/16","Snowpack":"75","Precip":"100","Reservoir":"58"}];

export const agriData = [
  { product: "Almonds", v2022: 4666, v2023: 4361, v2024: 4951, change: 13.5 },
  { product: "Pistachios", v2022: 2207, v2023: 2730, v2024: 2925, change: 7.1 },
  { product: "Dairy", v2022: 3195, v2023: 2613, v2024: 2597, change: -0.6 },
  { product: "Wine", v2022: 1286, v2023: 1085, v2024: 1076, change: -0.8 },
  { product: "Walnuts", v2022: 1289, v2023: 922, v2024: 922, change: 0.0 },
  { product: "Tomatoes (Processed)", v2022: 693, v2023: 776, v2024: 915, change: 18.0 },
  { product: "Rice", v2022: 660, v2023: 732, v2024: 809, change: 10.6 },
  { product: "Table Grapes", v2022: 657, v2023: 616, v2024: 720, change: 16.9 },
  { product: "Strawberries", v2022: 482, v2023: 509, v2024: 558, change: 9.7 },
  { product: "Lettuce", v2022: 411, v2023: 359, v2024: 410, change: 14.3 },
  { product: "Beef", v2022: 596, v2023: 471, v2024: 409, change: -13.2 },
  { product: "Cotton", v2022: 543, v2023: 336, v2024: 255, change: -24.1 },
  { product: "Hay", v2022: 398, v2023: 284, v2024: 241, change: -15.0 },
  { product: "Oranges", v2022: 518, v2023: 540, v2024: 555, change: 2.7 },
  { product: "Onions", v2022: 102, v2023: 86, v2024: 104, change: 21.2 },
  { product: "Carrots", v2022: 89, v2023: 90, v2024: 99, change: 9.4 },
  { product: "Blueberries", v2022: 33, v2023: 27, v2024: 37, change: 39.5 },
  { product: "Olives & Olive Oil", v2022: 22, v2023: 28, v2024: 37, change: 29.9 },
  { product: "Wheat", v2022: 29, v2023: 25, v2024: 16, change: -36.8 },
  { product: "Avocados", v2022: 11, v2023: 11, v2024: 15, change: 36.4 },
  { product: "Eggs", v2022: 6, v2023: 7, v2024: 4, change: -40.0 }
];

/* Format → keep only YEAR */
const waterData = rawData
  .map((d) => {
    const [, , y] = d.Date.split("/");

    const fullYear = Number(y) < 50 ? 2000 + Number(y) : 1900 + Number(y);

    return {
      year: String(fullYear),
      snowpack: Number(d.Snowpack),
      precipitation: Number(d.Precip),
      reservoir: Number(d.Reservoir),
    };
  })
  .reverse();

function App() {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [topCrops, setTopCrops] = useState([]);

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
    } catch {
      setResult("Error connecting to server.");
    }

    setLoading(false);
  }

  async function fetchTopCrops() {
    try {
      const res = await fetch("http://localhost:8000/top_crops");
      const data = await res.json();
      setTopCrops(data.crops);
    } catch {
      setTopCrops([]);
    }
  }

  useEffect(() => {
    fetchTopCrops();
  }, []);

  const chartHeight = 260;

  return (
    <div className="app">
      <div className="container">

        <div className="header">
          <h1>Crop Water Advisor</h1>
          <p>AI-powered crop suitability for California water conditions</p>
        </div>

        <div className="grid">

          {/* Reservoir */}
          <div className="card large">
            <h2>Reservoir Levels</h2>

            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="reservoir"
                  name="Reservoir"
                  stroke="#4fc3f7"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Snowpack */}
          <div className="card large">
            <h2>Snowpack</h2>

            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="snowpack"
                  name="Snowpack"
                  stroke="#81c784"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Precipitation */}
          <div className="card large">
            <h2>Precipitation</h2>

            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="precipitation"
                  name="Precipitation"
                  stroke="#ffb74d"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Crops */}
          <div className="card">
            <h2>Top Crops</h2>

            <div className="crop-list">
              {topCrops.map((c, i) => (
                <div className="crop-item" key={i}>
                  <span className="rank">{i + 1}</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis */}
          <div className="card wide">
            <h2>Analyze a Crop</h2>

            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Enter crop (e.g. wheat, rice, corn)"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
              />

              <button disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Crop"}
              </button>
            </form>

            {result && <div className="result">{result}</div>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;