import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Dashboard = () => {
  const mockRecognitionData = {
    currentSpeed: 60,
    roadType: "Главная дорога",
    lastSign: {
      type: "Ограничение скорости",
      value: "60 км/ч",
      confidence: 97.5,
      detected: "12:34:22",
    },
    stats: {
      processed: 2847,
      accuracy: 98.2,
      fps: 30.2,
    },
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Система распознавания
          </h1>
          <p className="text-tech-gray">
            Мониторинг дорожных знаков в реальном времени
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-tech-success rounded-full animate-pulse"></div>
          <span className="text-tech-success font-medium">Система активна</span>
        </div>
      </div>

      {/* Main Recognition Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Camera Feed */}
        <Card className="lg:col-span-2 bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Icon name="Camera" size={20} />
              Видеопоток камеры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-tech-primary/10 to-tech-secondary/10"></div>
              <div className="text-center z-10">
                <Icon
                  name="Play"
                  className="text-tech-primary mb-2"
                  size={48}
                />
                <p className="text-tech-gray">Имитация видеопотока</p>
                <p className="text-tech-gray text-sm">
                  FPS: {mockRecognitionData.stats.fps}
                </p>
              </div>

              {/* Detection Overlay */}
              <div className="absolute top-4 left-4 bg-tech-dark/80 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-tech-success rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">
                    Распознано
                  </span>
                </div>
                <p className="text-tech-primary text-xs">
                  Знак: {mockRecognitionData.lastSign.type}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <div className="space-y-4">
          {/* Speed Limit */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">
                Текущее ограничение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-tech-primary mb-2">
                  {mockRecognitionData.currentSpeed}
                </div>
                <div className="text-tech-gray text-sm">км/ч</div>
                <Badge
                  variant="outline"
                  className="mt-2 border-tech-success text-tech-success"
                >
                  Активно
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Road Type */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Тип дороги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Icon name="Route" className="text-tech-secondary" size={24} />
                <span className="text-white font-medium">
                  {mockRecognitionData.roadType}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Last Detection */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">
                Последний знак
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">Тип:</span>
                <span className="text-white text-sm">
                  {mockRecognitionData.lastSign.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">Значение:</span>
                <span className="text-tech-primary text-sm font-medium">
                  {mockRecognitionData.lastSign.value}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">Точность:</span>
                <span className="text-tech-success text-sm">
                  {mockRecognitionData.lastSign.confidence}%
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-tech-gray text-sm">Уверенность:</span>
                  <span className="text-white text-sm">
                    {mockRecognitionData.lastSign.confidence}%
                  </span>
                </div>
                <Progress
                  value={mockRecognitionData.lastSign.confidence}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Обработано кадров</p>
                <p className="text-2xl font-bold text-white">
                  {mockRecognitionData.stats.processed.toLocaleString()}
                </p>
              </div>
              <Icon name="Image" className="text-tech-primary" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Точность</p>
                <p className="text-2xl font-bold text-tech-success">
                  {mockRecognitionData.stats.accuracy}%
                </p>
              </div>
              <Icon name="Target" className="text-tech-success" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Производительность</p>
                <p className="text-2xl font-bold text-tech-secondary">
                  {mockRecognitionData.stats.fps} FPS
                </p>
              </div>
              <Icon name="Zap" className="text-tech-secondary" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
