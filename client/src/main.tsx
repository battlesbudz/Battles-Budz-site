import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureCampaignAttribution } from "./lib/campaign-attribution";

captureCampaignAttribution();
createRoot(document.getElementById("root")!).render(<App />);
