import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const Settings = () => {
  const [settings, setSettings] = useState({
    autoDetection: true,
    soundAlerts: false,
    saveResults: true,
    realTimeProcessing: true,
    confidenceThreshold: [75],
    processingQuality: "high",
    cameraResolution: "1920x1080",
    framerate: "30",
    language: "ru",
    logLevel: "info",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Настройки системы</h1>
          <p className="text-tech-gray">
            Конфигурация параметров распознавания
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Сбросить</Button>
          <Button>Сохранить</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Settings */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">
              Настройки распознавания
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">
                  Автоматическое распознавание
                </Label>
                <p className="text-tech-gray text-sm">
                  Запускать распознавание при обнаружении движения
                </p>
              </div>
              <Switch
                checked={settings.autoDetection}
                onCheckedChange={(checked) =>
                  handleSettingChange("autoDetection", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Звуковые уведомления</Label>
                <p className="text-tech-gray text-sm">
                  Воспроизводить звук при обнаружении знаков
                </p>
              </div>
              <Switch
                checked={settings.soundAlerts}
                onCheckedChange={(checked) =>
                  handleSettingChange("soundAlerts", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Сохранение результатов</Label>
                <p className="text-tech-gray text-sm">
                  Автоматически сохранять историю распознавания
                </p>
              </div>
              <Switch
                checked={settings.saveResults}
                onCheckedChange={(checked) =>
                  handleSettingChange("saveResults", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">
                  Обработка в реальном времени
                </Label>
                <p className="text-tech-gray text-sm">
                  Мгновенная обработка видеопотока
                </p>
              </div>
              <Switch
                checked={settings.realTimeProcessing}
                onCheckedChange={(checked) =>
                  handleSettingChange("realTimeProcessing", checked)
                }
              />
            </div>

            <div className="space-y-3">
              <Label className="text-white">
                Порог уверенности: {settings.confidenceThreshold[0]}%
              </Label>
              <Slider
                value={settings.confidenceThreshold}
                onValueChange={(value) =>
                  handleSettingChange("confidenceThreshold", value)
                }
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
              <p className="text-tech-gray text-sm">
                Минимальная уверенность для принятия результата
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Качество обработки</Label>
              <Select
                value={settings.processingQuality}
                onValueChange={(value) =>
                  handleSettingChange("processingQuality", value)
                }
              >
                <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкое (быстро)</SelectItem>
                  <SelectItem value="medium">Среднее</SelectItem>
                  <SelectItem value="high">Высокое (медленно)</SelectItem>
                  <SelectItem value="ultra">Ультра</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Camera Settings */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">Настройки камеры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Разрешение</Label>
              <Select
                value={settings.cameraResolution}
                onValueChange={(value) =>
                  handleSettingChange("cameraResolution", value)
                }
              >
                <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="640x480">640x480 (VGA)</SelectItem>
                  <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                  <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                  <SelectItem value="2560x1440">2560x1440 (2K)</SelectItem>
                  <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Частота кадров</Label>
              <Select
                value={settings.framerate}
                onValueChange={(value) =>
                  handleSettingChange("framerate", value)
                }
              >
                <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 FPS</SelectItem>
                  <SelectItem value="24">24 FPS</SelectItem>
                  <SelectItem value="30">30 FPS</SelectItem>
                  <SelectItem value="60">60 FPS</SelectItem>
                  <SelectItem value="120">120 FPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Яркость</Label>
                <Slider defaultValue={[50]} max={100} min={0} step={5} />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Контрастность</Label>
                <Slider defaultValue={[50]} max={100} min={0} step={5} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Насыщенность</Label>
                <Slider defaultValue={[50]} max={100} min={0} step={5} />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Резкость</Label>
                <Slider defaultValue={[50]} max={100} min={0} step={5} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сброс
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Download" size={16} className="mr-2" />
                Тест
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">Системные настройки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Язык интерфейса</Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  handleSettingChange("language", value)
                }
              >
                <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Уровень логирования</Label>
              <Select
                value={settings.logLevel}
                onValueChange={(value) =>
                  handleSettingChange("logLevel", value)
                }
              >
                <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Только ошибки</SelectItem>
                  <SelectItem value="warning">Предупреждения</SelectItem>
                  <SelectItem value="info">Информация</SelectItem>
                  <SelectItem value="debug">Отладка</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Путь сохранения данных</Label>
              <div className="flex gap-2">
                <Input
                  value="/var/data/traffic-vision"
                  className="bg-tech-dark/50 border-tech-gray/30 text-white"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  <Icon name="FolderOpen" size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">
                Максимальный размер лога (МБ)
              </Label>
              <Input
                type="number"
                defaultValue="100"
                className="bg-tech-dark/50 border-tech-gray/30 text-white"
              />
            </div>

            <div className="pt-4 border-t border-tech-gray/20 space-y-3">
              <h4 className="text-white font-medium">Действия</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Импорт
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Перезагрузка
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Settings */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">Производительность</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Использование GPU</Label>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span className="text-tech-gray text-sm">
                  Аппаратное ускорение
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Количество потоков CPU: 4</Label>
              <Slider defaultValue={[4]} max={8} min={1} step={1} />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Размер буфера кадров: 30</Label>
              <Slider defaultValue={[30]} max={60} min={10} step={5} />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Память для кэша (МБ): 512</Label>
              <Slider defaultValue={[512]} max={2048} min={128} step={128} />
            </div>

            <div className="pt-4 border-t border-tech-gray/20">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-tech-gray">CPU:</p>
                  <p className="text-white">67% (4 ядра)</p>
                </div>
                <div>
                  <p className="text-tech-gray">Память:</p>
                  <p className="text-white">2.4 GB / 8 GB</p>
                </div>
                <div>
                  <p className="text-tech-gray">GPU:</p>
                  <p className="text-white">89% (NVIDIA RTX)</p>
                </div>
                <div>
                  <p className="text-tech-gray">Диск:</p>
                  <p className="text-white">124 GB свободно</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
