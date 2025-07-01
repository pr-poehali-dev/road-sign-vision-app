import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const Analytics = () => {
  const analyticsData = {
    totalDetections: 15847,
    accuracyRate: 96.8,
    avgProcessingTime: 45,
    falsePositives: 3.2,
    performanceData: [
      { hour: "00:00", detections: 23, accuracy: 94.5 },
      { hour: "04:00", detections: 12, accuracy: 97.2 },
      { hour: "08:00", detections: 156, accuracy: 95.8 },
      { hour: "12:00", detections: 201, accuracy: 96.5 },
      { hour: "16:00", detections: 189, accuracy: 97.1 },
      { hour: "20:00", detections: 98, accuracy: 95.9 },
    ],
    signTypeStats: [
      {
        type: "Ограничения скорости",
        count: 5623,
        accuracy: 98.2,
        percentage: 35.5,
      },
      {
        type: "Предупреждающие",
        count: 3456,
        accuracy: 95.8,
        percentage: 21.8,
      },
      { type: "Запрещающие", count: 2890, accuracy: 97.1, percentage: 18.2 },
      { type: "Приоритет", count: 2134, accuracy: 94.6, percentage: 13.5 },
      { type: "Информационные", count: 1744, accuracy: 96.3, percentage: 11.0 },
    ],
    systemHealth: {
      cpuUsage: 67,
      memoryUsage: 43,
      gpuUsage: 89,
      diskUsage: 34,
    },
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "text-tech-success";
    if (accuracy >= 90) return "text-tech-warning";
    return "text-tech-danger";
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "bg-tech-danger";
    if (usage >= 60) return "bg-tech-warning";
    return "bg-tech-success";
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Аналитика системы</h1>
          <p className="text-tech-gray">
            Статистика и производительность распознавания
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-40 bg-tech-dark/50 border-tech-gray/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Последний час</SelectItem>
              <SelectItem value="24h">24 часа</SelectItem>
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Всего распознаний</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData.totalDetections.toLocaleString()}
                </p>
                <p className="text-tech-success text-xs">+12.5% за 24ч</p>
              </div>
              <Icon name="Target" className="text-tech-primary" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Точность</p>
                <p className="text-2xl font-bold text-tech-success">
                  {analyticsData.accuracyRate}%
                </p>
                <p className="text-tech-success text-xs">+0.3% за 24ч</p>
              </div>
              <Icon
                name="CheckCircle"
                className="text-tech-success"
                size={24}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Время обработки</p>
                <p className="text-2xl font-bold text-tech-secondary">
                  {analyticsData.avgProcessingTime}мс
                </p>
                <p className="text-tech-success text-xs">-5мс за 24ч</p>
              </div>
              <Icon name="Clock" className="text-tech-secondary" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Ложные срабатывания</p>
                <p className="text-2xl font-bold text-tech-warning">
                  {analyticsData.falsePositives}%
                </p>
                <p className="text-tech-success text-xs">-0.1% за 24ч</p>
              </div>
              <Icon
                name="AlertTriangle"
                className="text-tech-warning"
                size={24}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">
              Производительность по времени
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.performanceData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-tech-gray text-sm w-12">
                      {data.hour}
                    </span>
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-tech-gray">Обнаружения</span>
                        <span className="text-white">{data.detections}</span>
                      </div>
                      <Progress value={data.detections / 2.5} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${getAccuracyColor(data.accuracy)}`}
                    >
                      {data.accuracy}%
                    </p>
                    <p className="text-tech-gray text-xs">точность</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sign Type Distribution */}
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardHeader>
            <CardTitle className="text-white">
              Распределение по типам знаков
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.signTypeStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{stat.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-tech-gray text-xs">
                        {stat.count}
                      </span>
                      <Badge
                        variant="outline"
                        className={`${getAccuracyColor(stat.accuracy)} border-current`}
                      >
                        {stat.accuracy}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full">
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-tech-gray">
                      {stat.percentage}% от общего числа
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="bg-tech-dark/50 border-tech-gray/20">
        <CardHeader>
          <CardTitle className="text-white">Состояние системы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">CPU</span>
                <span className="text-white text-sm">
                  {analyticsData.systemHealth.cpuUsage}%
                </span>
              </div>
              <Progress
                value={analyticsData.systemHealth.cpuUsage}
                className="h-2"
              />
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${analyticsData.systemHealth.cpuUsage >= 80 ? "bg-tech-danger" : "bg-tech-success"}`}
                ></div>
                <span className="text-xs text-tech-gray">
                  {analyticsData.systemHealth.cpuUsage >= 80
                    ? "Высокая нагрузка"
                    : "Нормально"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">Память</span>
                <span className="text-white text-sm">
                  {analyticsData.systemHealth.memoryUsage}%
                </span>
              </div>
              <Progress
                value={analyticsData.systemHealth.memoryUsage}
                className="h-2"
              />
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${analyticsData.systemHealth.memoryUsage >= 80 ? "bg-tech-danger" : "bg-tech-success"}`}
                ></div>
                <span className="text-xs text-tech-gray">
                  {analyticsData.systemHealth.memoryUsage >= 80
                    ? "Высокая нагрузка"
                    : "Нормально"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">GPU</span>
                <span className="text-white text-sm">
                  {analyticsData.systemHealth.gpuUsage}%
                </span>
              </div>
              <Progress
                value={analyticsData.systemHealth.gpuUsage}
                className="h-2"
              />
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${analyticsData.systemHealth.gpuUsage >= 80 ? "bg-tech-danger" : "bg-tech-success"}`}
                ></div>
                <span className="text-xs text-tech-gray">
                  {analyticsData.systemHealth.gpuUsage >= 80
                    ? "Высокая нагрузка"
                    : "Нормально"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-tech-gray text-sm">Диск</span>
                <span className="text-white text-sm">
                  {analyticsData.systemHealth.diskUsage}%
                </span>
              </div>
              <Progress
                value={analyticsData.systemHealth.diskUsage}
                className="h-2"
              />
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${analyticsData.systemHealth.diskUsage >= 80 ? "bg-tech-danger" : "bg-tech-success"}`}
                ></div>
                <span className="text-xs text-tech-gray">
                  {analyticsData.systemHealth.diskUsage >= 80
                    ? "Высокая нагрузка"
                    : "Нормально"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-tech-dark/50 border-tech-gray/20">
        <CardHeader>
          <CardTitle className="text-white">Последняя активность</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "14:32",
                action: 'Обнаружен знак "Ограничение скорости 60"',
                accuracy: 98.5,
                type: "success",
              },
              {
                time: "14:31",
                action: "Калибровка камеры завершена",
                accuracy: null,
                type: "info",
              },
              {
                time: "14:29",
                action: "Высокая нагрузка на GPU",
                accuracy: null,
                type: "warning",
              },
              {
                time: "14:28",
                action: 'Обнаружен знак "Главная дорога"',
                accuracy: 96.2,
                type: "success",
              },
              {
                time: "14:26",
                action: "Система перезапущена",
                accuracy: null,
                type: "info",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-tech-gray/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={
                      activity.type === "success"
                        ? "CheckCircle"
                        : activity.type === "warning"
                          ? "AlertTriangle"
                          : "Info"
                    }
                    className={
                      activity.type === "success"
                        ? "text-tech-success"
                        : activity.type === "warning"
                          ? "text-tech-warning"
                          : "text-tech-primary"
                    }
                    size={16}
                  />
                  <div>
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-tech-gray text-xs">{activity.time}</p>
                  </div>
                </div>
                {activity.accuracy && (
                  <Badge
                    variant="outline"
                    className="border-tech-success text-tech-success"
                  >
                    {activity.accuracy}%
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
