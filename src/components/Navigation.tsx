import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Главная", icon: "Monitor" },
    { id: "recognition", label: "Распознавание", icon: "Camera" },
    { id: "database", label: "База данных", icon: "Database" },
    { id: "analytics", label: "Аналитика", icon: "BarChart3" },
    { id: "settings", label: "Настройки", icon: "Settings" },
    { id: "calibration", label: "Калибровка", icon: "Target" },
    { id: "history", label: "История", icon: "History" },
  ];

  return (
    <nav className="bg-tech-dark border-r border-tech-gray/20 w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-tech-gray/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tech-primary rounded-lg flex items-center justify-center">
            <Icon name="Eye" className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">TrafficVision</h1>
            <p className="text-tech-gray text-sm">AI Система v2.1</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 ${
              currentPage === item.id
                ? "bg-tech-primary text-white hover:bg-tech-primary/90"
                : "text-tech-gray hover:text-white hover:bg-tech-gray/10"
            }`}
            onClick={() => onPageChange(item.id)}
          >
            <Icon name={item.icon as any} size={20} />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Status Panel */}
      <div className="p-4 border-t border-tech-gray/20">
        <div className="bg-tech-gray/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-tech-gray text-sm">Статус камеры</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-tech-success rounded-full animate-pulse"></div>
              <span className="text-tech-success text-xs">Активна</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-tech-gray text-sm">FPS</span>
            <span className="text-white text-sm font-mono">30.2</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
