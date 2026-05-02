import { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, AreaChart, Area } from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────
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
  { product: "Wheat", v2022: 29, v2023: 25, v2024: 16, change: -36.8 },
];

// ─── THRESHOLDS (from hackathon spec) ────────────────────────────────────────
const THRESHOLDS = {
  snowpack: [
    { min: 120, label: "Excellent", color: "#86efac", bg: "#86efac18" },
    { min: 90,  label: "Average",   color: "#38bdf8", bg: "#38bdf818" },
    { min: 70,  label: "Below avg", color: "#fbbf24", bg: "#fbbf2418" },
    { min: 0,   label: "Concerning",color: "#ef4444", bg: "#ef444418" },
  ],
  precipitation: [
    { min: 110, label: "Wet",    color: "#86efac", bg: "#86efac18" },
    { min: 90,  label: "Normal", color: "#38bdf8", bg: "#38bdf818" },
    { min: 70,  label: "Dry",    color: "#fbbf24", bg: "#fbbf2418" },
    { min: 0,   label: "Drought signal", color: "#ef4444", bg: "#ef444418" },
  ],
  reservoir: [
    { min: 85, label: "Strong",      color: "#86efac", bg: "#86efac18" },
    { min: 70, label: "Healthy",     color: "#38bdf8", bg: "#38bdf818" },
    { min: 50, label: "Watch level", color: "#fbbf24", bg: "#fbbf2418" },
    { min: 0,  label: "Concern",     color: "#ef4444", bg: "#ef444418" },
  ],
};

function classify(metric, value) {
  const tiers = THRESHOLDS[metric];
  for (const t of tiers) { if (value >= t.min) return t; }
  return tiers[tiers.length - 1];
}

// ─── AUDIENCE CONTEXT ────────────────────────────────────────────────────────
const AUDIENCE = {
  manager: {
    label: "Water Manager",
    icon: "🏛",
    snowpack: "Snowpack is your lead indicator for spring melt timing and summer inflow forecasts. Watch for early melt years — they front-load inflows but leave reservoirs exposed in late summer.",
    precipitation: "Precipitation drives near-term inflows and soil saturation. Atmospheric river events can fill reservoirs quickly but also risk spill if storage is already high.",
    reservoir: "Current storage is your operational buffer. Balance carryover storage against spill risk. Low carryover entering a dry year compresses your options by March.",
    overall: "Use all three signals together. A wet precipitation year with low snowpack and low reservoir means you caught up short-term but remain exposed long-term.",
  },
  farmer: {
    label: "Farmer",
    icon: "🌾",
    snowpack: "Snowpack predicts how much irrigation water will be available in summer. Low snowpack in February means plan for water restrictions by June–August — adjust crop mix now.",
    precipitation: "Good precipitation can reduce early-season irrigation demand but don't substitute it for reliable summer supply. Almonds and pistachios need predictable summer water.",
    reservoir: "Reservoir levels indicate how much water districts can deliver. Watch-level storage often triggers allocation cuts. If reservoirs are low entering spring, expect reduced water orders.",
    overall: "High snowpack + healthy reservoir = full allocations likely. Low snowpack + watch-level reservoir heading into April = prepare for 50–70% allocation and plan your crop mix accordingly.",
  },
  citizen: {
    label: "Resident",
    icon: "🏘",
    snowpack: "The Sierra snowpack is California's natural water tower. More snow in winter means more water flowing into reservoirs through spring and summer — less chance of drought restrictions.",
    precipitation: "Rain helps refill reservoirs and reduces outdoor watering demand. But California's boom-bust rain pattern means one wet month doesn't guarantee a full year of supply.",
    reservoir: "Reservoir levels show how much drinking and agricultural water is stored right now. Below 50% typically triggers conservation notices from water districts.",
    overall: "When snowpack is low, rain is dry, and reservoirs are at watch level all at once — that's when your water district may ask for voluntary or mandatory conservation.",
  },
};

// ─── PARSE DATA ───────────────────────────────────────────────────────────────
const waterData = rawData.map((d) => {
  const parts = d.Date.split("/");
  const month = parseInt(parts[0]);
  const y = parts[2];
  const fullYear = Number(y) < 50 ? 2000 + Number(y) : 1900 + Number(y);
  return { year: fullYear, yearStr: String(fullYear), month, snowpack: Number(d.Snowpack), precipitation: Number(d.Precip), reservoir: Number(d.Reservoir) };
}).reverse();

const allYears = [...new Set(waterData.map(d => d.year))].sort((a, b) => a - b);
const byYear = {};
for (const d of waterData) {
  if (!byYear[d.year]) byYear[d.year] = { snowpack: [], precipitation: [], reservoir: [] };
  byYear[d.year].snowpack.push(d.snowpack);
  byYear[d.year].precipitation.push(d.precipitation);
  byYear[d.year].reservoir.push(d.reservoir);
}
const yearlyData = allYears.map(y => ({
  year: String(y),
  snowpack: Math.round(byYear[y].snowpack.reduce((a, b) => a + b, 0) / byYear[y].snowpack.length),
  precipitation: Math.round(byYear[y].precipitation.reduce((a, b) => a + b, 0) / byYear[y].precipitation.length),
  reservoir: Math.round(byYear[y].reservoir.reduce((a, b) => a + b, 0) / byYear[y].reservoir.length),
}));

const latest = waterData[waterData.length - 1];
const latestReservoir = latest?.reservoir ?? 0;
const latestSnowpack = latest?.snowpack ?? 0;
const latestPrecip = latest?.precipitation ?? 0;
const currentYear = allYears[allYears.length - 1];

// Composite water health score
const droughtScore = Math.round((latestReservoir * 0.45) + (latestSnowpack * 0.35) + (latestPrecip * 0.20));
const droughtLabel = droughtScore >= 85 ? "Excellent" : droughtScore >= 70 ? "Good" : droughtScore >= 55 ? "Moderate" : droughtScore >= 40 ? "Dry" : "Severe Drought";
const droughtColor = droughtScore >= 85 ? "#86efac" : droughtScore >= 70 ? "#38bdf8" : droughtScore >= 55 ? "#fbbf24" : droughtScore >= 40 ? "#f97316" : "#ef4444";

const snowClass = classify("snowpack", latestSnowpack);
const precipClass = classify("precipitation", latestPrecip);
const reservoirClass = classify("reservoir", latestReservoir);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#e2e8f0" }}>
      <div style={{ color: "#94a3b8", marginBottom: 4 }}>{label}</div>
      {payload.map(p => <div key={p.dataKey} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value}%</div>)}
    </div>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "22px 24px", ...style }}>{children}</div>
);

const SL = ({ text }) => (
  <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, fontWeight: 600 }}>{text}</div>
);

const Badge = ({ label, color, bg }) => (
  <span style={{ background: bg, border: `1px solid ${color}55`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color, fontWeight: 700, letterSpacing: "0.04em" }}>{label}</span>
);

const ThresholdBar = ({ metric, value }) => {
  const tiers = THRESHOLDS[metric];
  const boundaries = metric === "snowpack" ? [70, 90, 120] : metric === "precipitation" ? [70, 90, 110] : [50, 70, 85];
  const maxVal = 150;
  return (
    <div>
      <div style={{ display: "flex", height: 6, borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
        {["#ef444488","#fbbf2488","#38bdf888","#86efac88"].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>
      <div style={{ position: "relative", height: 14 }}>
        <div style={{ position: "absolute", left: `${Math.min((value / maxVal) * 100, 100)}%`, transform: "translateX(-50%)", top: 0 }}>
          <div style={{ width: 2, height: 10, background: "#fff", borderRadius: 2, margin: "0 auto" }} />
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1, whiteSpace: "nowrap" }}>{value}%</div>
        </div>
        {boundaries.map((b, i) => (
          <div key={i} style={{ position: "absolute", left: `${(b / maxVal) * 100}%`, top: 0, fontSize: 9, color: "#334155", transform: "translateX(-50%)" }}>{b}</div>
        ))}
      </div>
    </div>
  );
};

const metricColors = { reservoir: "#38bdf8", snowpack: "#86efac", precipitation: "#fbbf24" };
const LABEL = { reservoir: "Reservoir", snowpack: "Snowpack", precipitation: "Precipitation" };
const METRIC_DESC = {
  snowpack: "% of April 1 average · Sierra Nevada",
  precipitation: "% of seasonal average · Statewide",
  reservoir: "% of capacity · Major reservoirs",
};
const METRIC_ROLE = {
  snowpack: "Future water supply",
  precipitation: "Current conditions",
  reservoir: "Supply buffer",
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [topCrops, setTopCrops] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [audience, setAudience] = useState("manager");
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(allYears.length - 1);
  const [compareYear, setCompareYear] = useState(null);
  const [activeMetric, setActiveMetric] = useState("reservoir");
  const [agriSort, setAgriSort] = useState("change");
  const [agriDir, setAgriDir] = useState(-1);

  const filteredYearly = useMemo(() => yearlyData.slice(rangeStart, rangeEnd + 1), [rangeStart, rangeEnd]);

  const yoyData = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const currentRows = waterData.filter(d => d.year === currentYear);
    const compareRows = compareYear ? waterData.filter(d => d.year === compareYear) : [];
    return months.map((m, i) => {
      const cur = currentRows.find(d => d.month === i + 1);
      const cmp = compareRows.find(d => d.month === i + 1);
      const obj = { month: m };
      if (cur) obj[String(currentYear)] = cur[activeMetric];
      if (cmp) obj[String(compareYear)] = cmp[activeMetric];
      return obj;
    });
  }, [compareYear, activeMetric]);

  const sortedAgri = useMemo(() => {
    return [...agriData].sort((a, b) => {
      const key = agriSort === "change" ? "change" : agriSort === "2024" ? "v2024" : agriSort === "2023" ? "v2023" : "v2022";
      return (a[key] - b[key]) * agriDir;
    });
  }, [agriSort, agriDir]);

  function toggleSort(col) {
    if (agriSort === col) setAgriDir(d => d * -1);
    else { setAgriSort(col); setAgriDir(-1); }
  }

  async function handleSubmit() {
    if (!crop.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("http://localhost:8000/predict", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ crop }) });
      const data = await res.json();
      setResult(data.text);
    } catch { setResult("Error connecting to server."); }
    setLoading(false);
  }

  useEffect(() => {
    fetch("http://localhost:8000/top_crops").then(r => r.json()).then(d => setTopCrops(d.crops)).catch(() => setTopCrops([]));
  }, []);

  const ctx = AUDIENCE[audience];
  const tabs = ["overview", "crop values", "crop ai"];

  const alerts = [];
  if (latestReservoir < 50) alerts.push({ label: "Reservoir at concern level (<50%)", color: "#ef4444" });
  if (latestSnowpack < 70) alerts.push({ label: "Snowpack below average (<70%)", color: "#f97316" });
  if (latestPrecip < 70) alerts.push({ label: "Precipitation drought signal (<70%)", color: "#fbbf24" });

  return (
    <div style={{ minHeight: "100vh", background: "#020817", color: "#e2e8f0", fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}>

      {/* ── Top bar ── */}
      <div style={{ borderBottom: "1px solid #1e293b", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, background: "#020817dd", backdropFilter: "blur(8px)", zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#0ea5e9,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💧</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.3px", lineHeight: 1.2 }}>H2O Hackathon</div>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.05em" }}>HACKING THE SUPPLY</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ background: activeTab === t ? "#1e293b" : "transparent", border: "none", color: activeTab === t ? "#e2e8f0" : "#64748b", borderRadius: 8, padding: "6px 16px", fontSize: 13, fontWeight: activeTab === t ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
          ))}
        </nav>
        {/* Audience switcher */}
        <div style={{ display: "flex", gap: 4 }}>
          {Object.entries(AUDIENCE).map(([key, val]) => (
            <button key={key} onClick={() => setAudience(key)} style={{ background: audience === key ? "#1e293b" : "transparent", border: `1px solid ${audience === key ? "#334155" : "transparent"}`, borderRadius: 8, padding: "5px 12px", fontSize: 12, color: audience === key ? "#e2e8f0" : "#475569", cursor: "pointer" }}>
              {val.icon} {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Alerts ── */}
      {alerts.length > 0 && (
        <div style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "10px 32px", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {alerts.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: a.color, fontWeight: 600 }}>
              <span>⚠</span> {a.label}
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "32px 32px 72px", maxWidth: 1200, margin: "0 auto" }}>

        {/* ══ OVERVIEW TAB ══ */}
        {activeTab === "overview" && (
          <>
            {/* Hero */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>California Water Supply Dashboard</div>
              <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-1.5px", margin: "0 0 10px", lineHeight: 1.1, background: "linear-gradient(90deg,#f1f5f9 0%,#94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Three signals.<br />One picture.
              </h1>
              <p style={{ color: "#475569", fontSize: 15, maxWidth: 560, lineHeight: 1.7, margin: 0 }}>
                Snowpack, precipitation, and reservoir storage together reveal California's true water position — past, present, and what's coming next.
              </p>
            </div>

            {/* Metric cards with thresholds */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { key: "snowpack", label: "❄️ Snowpack", value: latestSnowpack, cls: snowClass, desc: "% of April 1 average", role: "Future water supply" },
                { key: "precipitation", label: "🌧 Precipitation", value: latestPrecip, cls: precipClass, desc: "% of seasonal average", role: "Current conditions" },
                { key: "reservoir", label: "🏞 Reservoir", value: latestReservoir, cls: reservoirClass, desc: "% of capacity", role: "Supply buffer" },
              ].map(({ key, label, value, cls, desc, role }) => (
                <div key={key} style={{ background: "linear-gradient(160deg,#1e293b 0%,#0f172a 100%)", border: `1px solid ${cls.color}44`, borderRadius: 18, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -24, right: -24, width: 90, height: 90, borderRadius: "50%", background: `${cls.color}12` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{label}</div>
                    <Badge label={cls.label} color={cls.color} bg={cls.bg} />
                  </div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: cls.color, letterSpacing: "-2px", lineHeight: 1, marginBottom: 4 }}>{value}<span style={{ fontSize: 18, fontWeight: 400, color: cls.color + "88" }}>%</span></div>
                  <div style={{ fontSize: 11, color: "#475569", marginBottom: 16 }}>{desc}</div>
                  <ThresholdBar metric={key} value={value} />
                  <div style={{ marginTop: 16, padding: "12px 14px", background: "#1e293b", borderRadius: 10, fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
                    <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{ctx.icon} For {ctx.label}s</div>
                    {ctx[key]}
                  </div>
                </div>
              ))}
            </div>

            {/* Health score + overview chart */}
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16, marginBottom: 16 }}>
              <Card>
                <SL text="Water health score" />
                <div style={{ textAlign: "center", padding: "10px 0 16px" }}>
                  <div style={{ fontSize: 72, fontWeight: 900, color: droughtColor, letterSpacing: "-4px", lineHeight: 1 }}>{droughtScore}</div>
                  <div style={{ fontSize: 16, color: droughtColor, fontWeight: 700, marginTop: 6, marginBottom: 20 }}>{droughtLabel}</div>
                  <div style={{ textAlign: "left" }}>
                    {[
                      { label: "Reservoir", weight: "45%", val: latestReservoir, color: "#38bdf8", cls: reservoirClass },
                      { label: "Snowpack",  weight: "35%", val: latestSnowpack,  color: "#86efac", cls: snowClass },
                      { label: "Precip",    weight: "20%", val: latestPrecip,    color: "#fbbf24", cls: precipClass },
                    ].map(({ label, weight, val, color, cls }) => (
                      <div key={label} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, marginBottom: 5 }}>
                          <span style={{ color: "#64748b" }}>{label} <span style={{ color: "#334155" }}>({weight})</span></span>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Badge label={cls.label} color={cls.color} bg={cls.bg} />
                            <span style={{ color, fontWeight: 700 }}>{val}%</span>
                          </span>
                        </div>
                        <div style={{ height: 5, background: "#1e293b", borderRadius: 4 }}>
                          <div style={{ height: 5, width: `${Math.min(val, 100)}%`, background: color, borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #1e293b", paddingTop: 14, fontSize: 12, color: "#475569", lineHeight: 1.6 }}>
                  {ctx.overall}
                </div>
              </Card>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <SL text="All three signals — 2016 to 2025" />
                  <div style={{ display: "flex", gap: 16 }}>
                    {["reservoir","snowpack","precipitation"].map(k => (
                      <span key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}>
                        <span style={{ width: 12, height: 3, background: metricColors[k], display: "inline-block", borderRadius: 2 }} />{LABEL[k]}
                      </span>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={yearlyData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 175]} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={100} stroke="#334155" strokeDasharray="5 3" label={{ value: "avg", position: "right", fill: "#334155", fontSize: 10 }} />
                    <Line type="monotone" dataKey="reservoir" name="Reservoir" stroke="#38bdf8" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="snowpack" name="Snowpack" stroke="#86efac" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="precipitation" name="Precipitation" stroke="#fbbf24" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Narrative callout */}
            <Card style={{ borderColor: "#38bdf833" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                {[
                  { icon: "❄️", title: "Snowpack = future water", body: "Snow accumulates in winter and melts slowly through spring, feeding rivers and reservoirs. April 1 is the benchmark for peak snowpack. It's California's most important long-term water indicator." },
                  { icon: "🌧", title: "Precipitation = current signal", body: "Rain refills reservoirs directly and reduces near-term demand. But atmospheric rivers can deliver a year's worth of precipitation in days — making single-season forecasting unreliable." },
                  { icon: "🏞", title: "Reservoir = supply buffer", body: "Storage is the operational safety net. High carryover from a wet year can buffer a dry season. Below 50% capacity, most water agencies enter watch protocols." },
                ].map(({ icon, title, body }) => (
                  <div key={title}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{body}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* ══ CROP VALUES TAB ══ */}
        {activeTab === "crop values" && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 6 }}>Agricultural Production Values</h2>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 24 }}>CA commodity value in $M, 2022–2024. Click any column header to sort.</p>

            <Card style={{ marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e293b" }}>
                    {[["product","Crop"],["v2022","2022 ($M)"],["v2023","2023 ($M)"],["2024","2024 ($M)"],["change","YoY Change"]].map(([col, label]) => (
                      <th key={col} onClick={() => toggleSort(col)} style={{ padding: "10px 12px", textAlign: col === "product" ? "left" : "right", color: agriSort === col ? "#38bdf8" : "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", cursor: "pointer", userSelect: "none" }}>
                        {label}{agriSort === col ? (agriDir === -1 ? " ↓" : " ↑") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedAgri.map((row, i) => {
                    const isUp = row.change > 0, isFlat = row.change === 0;
                    const cc = isFlat ? "#64748b" : isUp ? "#86efac" : "#f87171";
                    return (
                      <tr key={row.product} style={{ borderBottom: "1px solid #1e293b22", background: i % 2 === 0 ? "transparent" : "#ffffff03" }}>
                        <td style={{ padding: "11px 12px", fontWeight: 500, color: "#e2e8f0" }}>{row.product}</td>
                        <td style={{ padding: "11px 12px", textAlign: "right", color: "#64748b" }}>{row.v2022.toLocaleString()}</td>
                        <td style={{ padding: "11px 12px", textAlign: "right", color: "#64748b" }}>{row.v2023.toLocaleString()}</td>
                        <td style={{ padding: "11px 12px", textAlign: "right", color: "#e2e8f0", fontWeight: 600 }}>{row.v2024.toLocaleString()}</td>
                        <td style={{ padding: "11px 12px", textAlign: "right" }}>
                          <span style={{ color: cc, fontWeight: 600 }}>{!isFlat && (isUp ? "▲ " : "▼ ")}{Math.abs(row.change).toFixed(1)}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "Biggest gainers (2024)", items: [...agriData].sort((a, b) => b.change - a.change).slice(0, 4), color: "#86efac" },
                { label: "Biggest decliners (2024)", items: [...agriData].sort((a, b) => a.change - b.change).slice(0, 4), color: "#f87171" },
              ].map(({ label, items, color }) => (
                <Card key={label}>
                  <SL text={label} />
                  {items.map((row, i) => (
                    <div key={row.product} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < items.length - 1 ? "1px solid #1e293b" : "none" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{row.product}</div>
                        <div style={{ fontSize: 11, color: "#475569" }}>${row.v2024.toLocaleString()}M · 2024</div>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 900, color }}>{row.change > 0 ? "+" : ""}{row.change.toFixed(1)}%</div>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </>
        )}

        {/* ══ CROP AI TAB ══ */}
        {activeTab === "crop ai" && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 6 }}>AI Crop Advisor</h2>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>Water-suitability analysis based on current California conditions.</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 24, padding: "12px 16px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, fontSize: 12, color: "#64748b" }}>
              <span>Current conditions:</span>
              <span>❄️ Snowpack <span style={{ color: snowClass.color, fontWeight: 700 }}>{latestSnowpack}% — {snowClass.label}</span></span>
              <span>🌧 Precip <span style={{ color: precipClass.color, fontWeight: 700 }}>{latestPrecip}% — {precipClass.label}</span></span>
              <span>🏞 Reservoir <span style={{ color: reservoirClass.color, fontWeight: 700 }}>{latestReservoir}% — {reservoirClass.label}</span></span>
            </div>
            <Card>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <input type="text" placeholder="Enter a crop (e.g. almonds, rice, cotton, wheat)..." value={crop} onChange={e => setCrop(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", borderRadius: 10, padding: "12px 18px", color: "#e2e8f0", fontSize: 14, outline: "none" }} />
                <button onClick={handleSubmit} disabled={loading} style={{ background: loading ? "#1e293b" : "linear-gradient(135deg,#0ea5e9,#0284c7)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Analyzing…" : "Analyze →"}
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {["Almonds","Pistachios","Rice","Cotton","Strawberries","Wheat","Tomatoes","Wine Grapes","Hay"].map(s => (
                  <button key={s} onClick={() => setCrop(s)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 20, padding: "5px 16px", color: "#94a3b8", fontSize: 12, cursor: "pointer" }}>{s}</button>
                ))}
              </div>
              {result
                ? <div style={{ background: "#1e293b", borderLeft: "3px solid #0ea5e9", borderRadius: "0 10px 10px 0", padding: "18px 20px", fontSize: 14, lineHeight: 1.8, color: "#cbd5e1" }}>{result}</div>
                : <div style={{ textAlign: "center", padding: "32px 0", color: "#334155", fontSize: 13 }}>Enter a crop to receive a water-suitability analysis</div>
              }

              {topCrops.length > 0 && (
                <div style={{ marginTop: 24, borderTop: "1px solid #1e293b", paddingTop: 20 }}>
                  <SL text="Top recommended crops (server)" />
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {topCrops.map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#1e293b", borderRadius: 10, padding: "8px 14px" }}>
                        <span style={{ width: 20, height: 20, borderRadius: 5, background: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7c3c" : "#334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: i < 3 ? "#020817" : "#475569" }}>{i + 1}</span>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </>
        )}

      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #1e293b", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#334155" }}>
        <div>H2O Hackathon · Hacking the Supply · California Water Intelligence Dashboard</div>
        <div style={{ display: "flex", gap: 16 }}>
          <span>❄️ CA DWR Snow Surveys</span>
          <span>🌧 NOAA Climate Normals</span>
          <span>🏞 CDEC Reservoir Storage</span>
        </div>
      </div>
    </div>
  );
}