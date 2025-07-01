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
import Icon from "@/components/ui/icon";

const Database = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const signDatabase = [
    {
      id: 1,
      name: "Ограничение скорости 60",
      category: "speed",
      description: "Максимальная разрешенная скорость 60 км/ч",
      shape: "круглый",
      color: "красно-белый",
      confidence: 98.5,
      samples: 245,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "Главная дорога",
      category: "priority",
      description: "Обозначение главной дороги",
      shape: "ромб",
      color: "желтый",
      confidence: 96.2,
      samples: 189,
      lastUpdated: "2024-01-12",
    },
    {
      id: 3,
      name: "Стоп",
      category: "regulatory",
      description: "Полная остановка обязательна",
      shape: "восьмиугольник",
      color: "красный",
      confidence: 99.1,
      samples: 312,
      lastUpdated: "2024-01-18",
    },
    {
      id: 4,
      name: "Уступи дорогу",
      category: "priority",
      description: "Уступить дорогу встречному движению",
      shape: "треугольник",
      color: "красно-белый",
      confidence: 94.7,
      samples: 156,
      lastUpdated: "2024-01-10",
    },
    {
      id: 5,
      name: "Поворот направо запрещен",
      category: "prohibition",
      description: "Запрет поворота направо",
      shape: "круглый",
      color: "красно-белый",
      confidence: 92.3,
      samples: 89,
      lastUpdated: "2024-01-08",
    },
    {
      id: 6,
      name: "Пешеходный переход",
      category: "warning",
      description: "Предупреждение о пешеходном переходе",
      shape: "треугольник",
      color: "красно-белый",
      confidence: 97.8,
      samples: 203,
      lastUpdated: "2024-01-16",
    },
  ];

  const categories = [
    { value: "all", label: "Все категории" },
    { value: "speed", label: "Ограничения скорости" },
    { value: "priority", label: "Приоритет движения" },
    { value: "regulatory", label: "Регулирующие" },
    { value: "prohibition", label: "Запрещающие" },
    { value: "warning", label: "Предупреждающие" },
  ];

  const filteredSigns = signDatabase.filter((sign) => {
    const matchesSearch =
      sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || sign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      speed: "bg-tech-primary",
      priority: "bg-tech-secondary",
      regulatory: "bg-red-500",
      prohibition: "bg-red-600",
      warning: "bg-yellow-500",
    };
    return colors[category as keyof typeof colors] || "bg-tech-gray";
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">База данных знаков</h1>
          <p className="text-tech-gray">
            Коллекция дорожных знаков для обучения ИИ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-tech-success text-tech-success"
          >
            {signDatabase.length} знаков
          </Badge>
          <Badge
            variant="outline"
            className="border-tech-primary text-tech-primary"
          >
            {signDatabase.reduce((sum, sign) => sum + sign.samples, 0)} образцов
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-tech-dark/50 border-tech-gray/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Icon
                  name="Search"
                  className="absolute left-3 top-3 text-tech-gray"
                  size={16}
                />
                <Input
                  placeholder="Поиск по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-tech-dark/50 border-tech-gray/30"
                />
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-tech-dark/50 border-tech-gray/30">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Icon name="Grid3x3" size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <Icon name="List" size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Signs Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSigns.map((sign) => (
            <Card
              key={sign.id}
              className="bg-tech-dark/50 border-tech-gray/20 hover:border-tech-primary/50 transition-colors cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">
                      {sign.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={`${getCategoryColor(sign.category)} text-white text-xs`}
                      >
                        {
                          categories.find((c) => c.value === sign.category)
                            ?.label
                        }
                      </Badge>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-tech-gray/20 rounded-lg flex items-center justify-center">
                    <Icon
                      name="AlertTriangle"
                      className="text-tech-primary"
                      size={24}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-tech-gray text-sm">{sign.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-tech-gray">Форма:</span>
                    <p className="text-white">{sign.shape}</p>
                  </div>
                  <div>
                    <span className="text-tech-gray">Цвет:</span>
                    <p className="text-white">{sign.color}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-tech-gray/20">
                  <div className="text-center">
                    <p className="text-tech-success text-sm font-semibold">
                      {sign.confidence}%
                    </p>
                    <p className="text-tech-gray text-xs">Точность</p>
                  </div>
                  <div className="text-center">
                    <p className="text-tech-primary text-sm font-semibold">
                      {sign.samples}
                    </p>
                    <p className="text-tech-gray text-xs">Образцов</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs">{sign.lastUpdated}</p>
                    <p className="text-tech-gray text-xs">Обновлен</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="p-0">
            <div className="divide-y divide-tech-gray/20">
              {filteredSigns.map((sign) => (
                <div
                  key={sign.id}
                  className="p-4 hover:bg-tech-gray/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-tech-gray/20 rounded-lg flex items-center justify-center">
                        <Icon
                          name="AlertTriangle"
                          className="text-tech-primary"
                          size={20}
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{sign.name}</h3>
                        <p className="text-tech-gray text-sm">
                          {sign.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={`${getCategoryColor(sign.category)} text-white text-xs`}
                          >
                            {
                              categories.find((c) => c.value === sign.category)
                                ?.label
                            }
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-tech-success font-semibold">
                          {sign.confidence}%
                        </p>
                        <p className="text-tech-gray text-xs">Точность</p>
                      </div>
                      <div className="text-center">
                        <p className="text-tech-primary font-semibold">
                          {sign.samples}
                        </p>
                        <p className="text-tech-gray text-xs">Образцов</p>
                      </div>
                      <div className="text-center min-w-20">
                        <p className="text-white">{sign.lastUpdated}</p>
                        <p className="text-tech-gray text-xs">Обновлен</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Всего знаков</p>
                <p className="text-2xl font-bold text-white">
                  {signDatabase.length}
                </p>
              </div>
              <Icon name="Database" className="text-tech-primary" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tech-dark/50 border-tech-gray/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tech-gray text-sm">Образцов</p>
                <p className="text-2xl font-bold text-tech-primary">
                  {signDatabase.reduce((sum, sign) => sum + sign.samples, 0)}
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
                <p className="text-tech-gray text-sm">Средняя точность</p>
                <p className="text-2xl font-bold text-tech-success">
                  {(
                    signDatabase.reduce(
                      (sum, sign) => sum + sign.confidence,
                      0,
                    ) / signDatabase.length
                  ).toFixed(1)}
                  %
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
                <p className="text-tech-gray text-sm">Категорий</p>
                <p className="text-2xl font-bold text-tech-secondary">
                  {categories.length - 1}
                </p>
              </div>
              <Icon name="Layers" className="text-tech-secondary" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Database;
