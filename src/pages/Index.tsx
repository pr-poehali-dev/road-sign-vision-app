import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Recognition from "@/components/Recognition";
import Database from "@/components/Database";
import Analytics from "@/components/Analytics";
import Settings from "@/components/Settings";
import Calibration from "@/components/Calibration";
import History from "@/components/History";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "recognition":
        return <Recognition />;
      case "database":
        return <Database />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "calibration":
        return <Calibration />;
      case "history":
        return <History />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-tech-dark flex">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Index;
