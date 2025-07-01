import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const Calibration = () => {
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);

  const calibrationSteps = [
    { id: 0, title: "Подготовка", description: "Проверка камеры и системы" },
    { id: 1, title: "Фокус", description: "Настройка фокусировки" },
    { id: 2, title: "Экспозиция", description: "Калибровка освещения" },
    { id: 3, title: "Геометрия", description: "Коррекция искажений" },
    { id: 4, title: "Тестирование", description: "Проверка точности" },
    { id: 5, title: "Завершение", description: "Сохранение настроек" },
  ];

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationProgress(0);
    // Simulate calibration process
    const interval = setInterval(() => {
      setCalibrationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCalibrating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Калибровка камеры</h1>
          <p className="text-tech-gray">
            Настройка параметров для точного распознавания
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-tech-success text-tech-success"
          >
            Последняя калибровка: 15.01.2024
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calibration Steps */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">Этапы калибровки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {calibrationSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    calibrationStep === index
                      ? "bg-tech-primary/20 border border-tech-primary/30"
                      : calibrationStep > index
                        ? "bg-tech-success/10"
                        : "bg-tech-gray/5"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      calibrationStep > index
                        ? "bg-tech-success"
                        : calibrationStep === index
                          ? "bg-tech-primary"
                          : "bg-tech-gray/30"
                    }`}
                  >
                    {calibrationStep > index ? (
                      <Icon name="Check" className="text-white" size={16} />
                    ) : (
                      <span className="text-white text-sm font-semibold">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {step.title}
                    </h4>
                    <p className="text-tech-gray text-xs">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Calibration Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Camera Preview */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Icon name="Camera" size={20} />
                  Предварительный просмотр
                </div>
                <Badge variant={isCalibrating ? "default" : "secondary"}>
                  {isCalibrating ? "Калибровка..." : "Готов"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tech-primary/10 to-tech-secondary/10"></div>

                {/* Calibration grid overlay */}
                <div className="absolute inset-0">
                  <svg
                    width="100%"
                    height="100%"
                    className="text-tech-primary opacity-50"
                  >
                    <defs>
                      <pattern
                        id="calibration-grid"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 60 0 L 0 0 0 60"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#calibration-grid)"
                    />

                    {/* Center crosshair */}
                    <line
                      x1="50%"
                      y1="40%"
                      x2="50%"
                      y2="60%"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="40%"
                      y1="50%"
                      x2="60%"
                      y2="50%"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Calibration points */}
                {!isCalibrating && (
                  <>
                    <div className="absolute top-8 left-8 w-4 h-4 border-2 border-tech-secondary rounded-full"></div>
                    <div className="absolute top-8 right-8 w-4 h-4 border-2 border-tech-secondary rounded-full"></div>
                    <div className="absolute bottom-8 left-8 w-4 h-4 border-2 border-tech-secondary rounded-full"></div>
                    <div className="absolute bottom-8 right-8 w-4 h-4 border-2 border-tech-secondary rounded-full"></div>
                  </>
                )}

                {/* Status overlay */}
                <div className="absolute bottom-4 left-4 bg-tech-dark/80 rounded px-3 py-2">
                  <p className="text-white text-sm">
                    {isCalibrating
                      ? `Калибровка... ${calibrationProgress}%`
                      : "Готов к калибровке"}
                  </p>
                </div>
              </div>

              {isCalibrating && (
                <div className="mt-4">
                  <Progress value={calibrationProgress} className="h-2" />
                  <p className="text-tech-gray text-sm mt-2">
                    Этап {Math.floor(calibrationProgress / 20) + 1} из 5:{" "}
                    {
                      calibrationSteps[Math.floor(calibrationProgress / 20)]
                        ?.title
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="bg-tech-dark/50 border-tech-gray/20">
            <CardHeader>
              <CardTitle className="text-white">
                Управление калибровкой
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={startCalibration}
                  disabled={isCalibrating}
                  className="gap-2"
                >
                  <Icon name="Target" size={16} />
                  {isCalibrating ? "Калибровка..." : "Начать автокалибровку"}
                </Button>
                <Button variant="outline" disabled={isCalibrating}>
                  Ручная калибровка
                </Button>
                <Button variant="outline" disabled={isCalibrating}>
                  Загрузить профиль
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white text-sm">
                    Фокусное расстояние
                  </label>
                  <Slider
                    defaultValue={[85]}
                    max={200}
                    min={50}
                    step={5}
                    disabled={isCalibrating}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm">Диафрагма</label>
                  <Slider
                    defaultValue={[56]}
                    max={110}
                    min={28}
                    step={14}
                    disabled={isCalibrating}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white text-sm">
                    ISO чувствительность
                  </label>
                  <Slider
                    defaultValue={[200]}
                    max={1600}
                    min={100}
                    step={100}
                    disabled={isCalibrating}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm">Выдержка</label>
                  <Slider
                    defaultValue={[60]}
                    max={250}
                    min={30}
                    step={15}
                    disabled={isCalibrating}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calibration Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Точность фокуса</p>
                <p className="text-2xl font-bold text-tech-success">97.8%</p>
              </div>
              <Icon name="Focus" className="text-tech-success" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Коррекция искажений</p>
                <p className="text-2xl font-bold text-tech-primary">2.3%</p>
              </div>
              <Icon name="Grid3x3" className="text-tech-primary" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Качество изображения</p>
                <p className="text-2xl font-bold text-tech-secondary">A+</p>
              </div>
              <Icon name="Star" className="text-tech-secondary" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calibration History */}
      <Card className="bg-tech-dark/50 border-tech-gray/20">
        <CardHeader>
          <CardTitle className="text-white">История калибровок</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                date: "15.01.2024",
                time: "14:30",
                type: "Автоматическая",
                quality: "Отлично",
                accuracy: 97.8,
              },
              {
                date: "12.01.2024",
                time: "09:15",
                type: "Ручная",
                quality: "Хорошо",
                accuracy: 95.2,
              },
              {
                date: "08.01.2024",
                time: "16:45",
                type: "Автоматическая",
                quality: "Отлично",
                accuracy: 98.1,
              },
              {
                date: "05.01.2024",
                time: "11:20",
                type: "Начальная",
                quality: "Удовлетворительно",
                accuracy: 92.7,
              },
            ].map((cal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-tech-gray/5 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Icon
                    name="Calendar"
                    className="text-tech-primary"
                    size={16}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {cal.date} в {cal.time}
                    </p>
                    <p className="text-tech-gray text-xs">
                      {cal.type} калибровка
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white text-sm">{cal.quality}</p>
                    <p className="text-tech-gray text-xs">
                      Точность {cal.accuracy}%
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calibration;
