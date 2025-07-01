import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "@/components/ui/icon";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const historyData = [
    {
      id: 1,
      timestamp: "2024-01-18 14:32:15",
      signType: "Ограничение скорости",
      signValue: "60 км/ч",
      confidence: 98.5,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "confirmed",
    },
    {
      id: 2,
      timestamp: "2024-01-18 14:31:42",
      signType: "Главная дорога",
      signValue: "",
      confidence: 96.2,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "confirmed",
    },
    {
      id: 3,
      timestamp: "2024-01-18 14:29:18",
      signType: "Стоп",
      signValue: "",
      confidence: 99.1,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "confirmed",
    },
    {
      id: 4,
      timestamp: "2024-01-18 14:28:34",
      signType: "Ограничение скорости",
      signValue: "90 км/ч",
      confidence: 87.3,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "manual_review",
    },
    {
      id: 5,
      timestamp: "2024-01-18 14:26:55",
      signType: "Поворот направо запрещен",
      signValue: "",
      confidence: 92.7,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "confirmed",
    },
    {
      id: 6,
      timestamp: "2024-01-18 14:25:11",
      signType: "Пешеходный переход",
      signValue: "",
      confidence: 94.8,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "confirmed",
    },
    {
      id: 7,
      timestamp: "2024-01-18 14:23:47",
      signType: "Уступи дорогу",
      signValue: "",
      confidence: 76.2,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "false_positive",
    },
    {
      id: 8,
      timestamp: "2024-01-18 14:22:03",
      signType: "Ограничение скорости",
      signValue: "70 км/ч",
      confidence: 97.6,
      location: "Московская область, М-1",
      weather: "Ясно",
      temperature: "-2°C",
      status: "confirmed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-tech-success text-white";
      case "manual_review":
        return "bg-tech-warning text-black";
      case "false_positive":
        return "bg-tech-danger text-white";
      default:
        return "bg-tech-gray text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Подтверждено";
      case "manual_review":
        return "Требует проверки";
      case "false_positive":
        return "Ложное срабатывание";
      default:
        return "Неизвестно";
    }
  };

  const filteredData = historyData.filter((item) => {
    const matchesSearch =
      item.signType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.status === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">История сессий</h1>
          <p className="text-tech-gray">
            Журнал всех обнаружений дорожных знаков
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-tech-primary text-tech-primary"
          >
            {historyData.length} записей
          </Badge>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-tech-dark/50 border-tech-gray/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Icon
                  name="Search"
                  className="absolute left-3 top-3 text-tech-gray"
                  size={16}
                />
                <Input
                  placeholder="Поиск по типу знака или локации..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-tech-dark/50 border-tech-gray/30"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="confirmed">Подтверждено</SelectItem>
                <SelectItem value="manual_review">Требует проверки</SelectItem>
                <SelectItem value="false_positive">
                  Ложные срабатывания
                </SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-tech-dark/50 border-tech-gray/30 justify-start"
                >
                  <Icon name="Calendar" className="mr-2" size={16} />
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Сначала новые</SelectItem>
                <SelectItem value="oldest">Сначала старые</SelectItem>
                <SelectItem value="confidence">По уверенности</SelectItem>
                <SelectItem value="type">По типу знака</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="bg-tech-dark/50 border-tech-gray/20">
        <CardHeader>
          <CardTitle className="text-white">Записи обнаружений</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-tech-gray/20">
                <tr className="text-left">
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Время
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Тип знака
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Значение
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Уверенность
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Локация
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Погода
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Статус
                  </th>
                  <th className="p-4 text-tech-gray text-sm font-medium">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tech-gray/20">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-tech-gray/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-white text-sm font-mono">
                        {item.timestamp.split(" ")[1]}
                      </div>
                      <div className="text-tech-gray text-xs">
                        {item.timestamp.split(" ")[0]}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon
                          name="AlertTriangle"
                          className="text-tech-primary"
                          size={16}
                        />
                        <span className="text-white text-sm">
                          {item.signType}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-tech-primary text-sm font-medium">
                        {item.signValue || "—"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-tech-gray/20 rounded-full h-2">
                          <div
                            className="bg-tech-success h-2 rounded-full"
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">
                          {item.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white text-sm">{item.location}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-tech-gray text-sm">
                        {item.weather}, {item.temperature}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`text-xs ${getStatusColor(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Eye" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Download" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Всего записей</p>
                <p className="text-2xl font-bold text-white">
                  {historyData.length}
                </p>
              </div>
              <Icon name="FileText" className="text-tech-primary" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Подтверждено</p>
                <p className="text-2xl font-bold text-tech-success">
                  {
                    historyData.filter((item) => item.status === "confirmed")
                      .length
                  }
                </p>
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
                <p className="text-tech-gray text-sm">Требует проверки</p>
                <p className="text-2xl font-bold text-tech-warning">
                  {
                    historyData.filter(
                      (item) => item.status === "manual_review",
                    ).length
                  }
                </p>
              </div>
              <Icon
                name="AlertTriangle"
                className="text-tech-warning"
                size={24}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Средняя точность</p>
                <p className="text-2xl font-bold text-tech-primary">
                  {(
                    historyData.reduce(
                      (sum, item) => sum + item.confidence,
                      0,
                    ) / historyData.length
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <Icon name="Target" className="text-tech-primary" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
