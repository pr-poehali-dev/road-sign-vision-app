import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const Recognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectionSensitivity, setDetectionSensitivity] = useState([75]);
  const [processingMode, setProcessingMode] = useState("realtime");

  const mockDetections = [
    {
      id: 1,
      type: "Ограничение скорости",
      value: "60",
      confidence: 97.5,
      time: "12:34:22",
      x: 120,
      y: 80,
    },
    {
      id: 2,
      type: "Главная дорога",
      value: "",
      confidence: 89.2,
      time: "12:34:18",
      x: 200,
      y: 150,
    },
    {
      id: 3,
      type: "Стоп",
      value: "",
      confidence: 95.8,
      time: "12:34:15",
      x: 300,
      y: 120,
    },
  ];

  const [currentDetection, setCurrentDetection] = useState(mockDetections[0]);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        const randomDetection =
          mockDetections[Math.floor(Math.random() * mockDetections.length)];
        setCurrentDetection({
          ...randomDetection,
          confidence: 85 + Math.random() * 15,
          time: new Date().toLocaleTimeString(),
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Распознавание знаков
          </h1>
          <p className="text-tech-gray">
            Анализ дорожных знаков в реальном времени
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={isRecording ? "destructive" : "default"}
            onClick={() => setIsRecording(!isRecording)}
            className="gap-2"
          >
            {isRecording ? (
              <>
                <Icon name="Square" size={16} />
                Остановить
              </>
            ) : (
              <>
                <Icon name="Play" size={16} />
                Начать
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Camera View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Icon name="Camera" size={20} />
                  Live камера
                </div>
                <Badge
                  variant={isRecording ? "default" : "secondary"}
                  className={isRecording ? "bg-red-500" : ""}
                >
                  {isRecording ? "REC" : "Остановлено"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

                {/* Simulated road scene */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Icon
                      name="Eye"
                      className="text-tech-primary mb-2"
                      size={48}
                    />
                    <p className="text-tech-gray">Имитация дорожной сцены</p>
                  </div>
                </div>

                {/* Detection overlays */}
                {isRecording && (
                  <>
                    <div
                      className="absolute border-2 border-tech-primary bg-tech-primary/10 rounded"
                      style={{
                        left: `${currentDetection.x}px`,
                        top: `${currentDetection.y}px`,
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <div className="absolute -top-8 left-0 bg-tech-primary text-white text-xs px-2 py-1 rounded">
                        {currentDetection.type}
                      </div>
                    </div>

                    {/* Grid overlay for analysis */}
                    <div className="absolute inset-0 opacity-30">
                      <svg
                        width="100%"
                        height="100%"
                        className="text-tech-primary"
                      >
                        <defs>
                          <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 40 0 L 0 0 0 40"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                  </>
                )}

                {/* FPS Counter */}
                <div className="absolute top-4 right-4 bg-tech-dark/80 rounded px-2 py-1">
                  <span className="text-white text-sm font-mono">
                    {isRecording ? "30.2 FPS" : "0 FPS"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="text-white">
                Настройки распознавания
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-tech-gray text-sm">
                  Чувствительность детекции: {detectionSensitivity[0]}%
                </label>
                <Slider
                  value={detectionSensitivity}
                  onValueChange={setDetectionSensitivity}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={
                    processingMode === "realtime" ? "default" : "outline"
                  }
                  onClick={() => setProcessingMode("realtime")}
                  size="sm"
                >
                  Реал-тайм
                </Button>
                <Button
                  variant={
                    processingMode === "accurate" ? "default" : "outline"
                  }
                  onClick={() => setProcessingMode("accurate")}
                  size="sm"
                >
                  Точный
                </Button>
                <Button
                  variant={processingMode === "fast" ? "default" : "outline"}
                  onClick={() => setProcessingMode("fast")}
                  size="sm"
                >
                  Быстрый
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detection Results */}
        <div className="space-y-4">
          {/* Current Detection */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="text-white">
                Текущее распознавание
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isRecording ? (
                <>
                  <div className="text-center p-4 border border-tech-primary/30 rounded-lg">
                    <Icon
                      name="AlertTriangle"
                      className="text-tech-secondary mb-2"
                      size={32}
                    />
                    <h3 className="text-lg font-semibold text-white">
                      {currentDetection.type}
                    </h3>
                    {currentDetection.value && (
                      <p className="text-tech-primary text-xl font-bold">
                        {currentDetection.value} км/ч
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-tech-gray text-sm">
                        Уверенность:
                      </span>
                      <span className="text-white text-sm">
                        {currentDetection.confidence.toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={currentDetection.confidence}
                      className="h-2"
                    />
                  </div>

                  <div className="flex justify-between">
                    <span className="text-tech-gray text-sm">Время:</span>
                    <span className="text-white text-sm font-mono">
                      {currentDetection.time}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-tech-gray">
                  <Icon name="Pause" size={32} className="mb-2 mx-auto" />
                  <p>Распознавание остановлено</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Detections */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="text-white">
                Последние обнаружения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDetections.slice(0, 5).map((detection) => (
                  <div
                    key={detection.id}
                    className="flex items-center justify-between p-2 bg-tech-gray/5 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        name="Target"
                        className="text-tech-primary"
                        size={16}
                      />
                      <div>
                        <p className="text-white text-sm font-medium">
                          {detection.type}
                        </p>
                        <p className="text-tech-gray text-xs">
                          {detection.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-tech-success text-sm">
                        {detection.confidence.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Processing Stats */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="text-white">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-tech-gray text-sm">
                  Обработано кадров:
                </span>
                <span className="text-white text-sm font-mono">
                  {isRecording ? "1,247" : "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-tech-gray text-sm">
                  Обнаружено знаков:
                </span>
                <span className="text-white text-sm font-mono">
                  {isRecording ? "23" : "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-tech-gray text-sm">
                  Средняя задержка:
                </span>
                <span className="text-white text-sm font-mono">
                  {isRecording ? "12ms" : "0ms"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recognition;
