"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Star,
  Calendar,
  Check,
  ArrowRight,
  ArrowLeftRight,
  Ruler,
  Weight,
  Thermometer,
  Square,
  Droplet,
  Clock,
  Gauge,
  HardDrive,
  Heart,
  Trash2,
  Calculator,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  lengthUnits,
  weightUnits,
  temperatureUnits,
  areaUnits,
  volumeUnits,
  timeUnits,
  speedUnits,
  dataSizeUnits,
  convertLength,
  convertWeight,
  convertTemperature,
  convertArea,
  convertVolume,
  convertTime,
  convertSpeed,
  convertDataSize,
  getConversionFormula,
  type LengthUnit,
  type WeightUnit,
  type TemperatureUnit,
  type AreaUnit,
  type VolumeUnit,
  type TimeUnit,
  type SpeedUnit,
  type DataSizeUnit,
} from "@/lib/unit-conversions"

interface ConversionHistory {
  id: string
  category: string
  value: number
  from: string
  to: string
  result: number
  timestamp: Date
}

interface FavoriteConversion {
  id: string
  category: string
  from: string
  to: string
  label: string
}

export default function UnitConverterPage() {
  const [activeCategory, setActiveCategory] = useState("length")
  const [inputValue, setInputValue] = useState("1")
  const [precision, setPrecision] = useState(4)

  const [lengthFrom, setLengthFrom] = useState<LengthUnit>("meter")
  const [lengthTo, setLengthTo] = useState<LengthUnit>("foot")

  const [weightFrom, setWeightFrom] = useState<WeightUnit>("kilogram")
  const [weightTo, setWeightTo] = useState<WeightUnit>("pound")

  const [tempFrom, setTempFrom] = useState<TemperatureUnit>("celsius")
  const [tempTo, setTempTo] = useState<TemperatureUnit>("fahrenheit")

  const [areaFrom, setAreaFrom] = useState<AreaUnit>("squareMeter")
  const [areaTo, setAreaTo] = useState<AreaUnit>("squareFoot")

  const [volumeFrom, setVolumeFrom] = useState<VolumeUnit>("liter")
  const [volumeTo, setVolumeTo] = useState<VolumeUnit>("gallon")

  const [timeFrom, setTimeFrom] = useState<TimeUnit>("hour")
  const [timeTo, setTimeTo] = useState<TimeUnit>("minute")

  const [speedFrom, setSpeedFrom] = useState<SpeedUnit>("kilometersPerHour")
  const [speedTo, setSpeedTo] = useState<SpeedUnit>("milesPerHour")

  const [dataSizeFrom, setDataSizeFrom] = useState<DataSizeUnit>("megabyte")
  const [dataSizeTo, setDataSizeTo] = useState<DataSizeUnit>("gigabyte")

  const [history, setHistory] = useState<ConversionHistory[]>([])
  const [favorites, setFavorites] = useState<FavoriteConversion[]>([])

  const { toast } = useToast()

  const getConversionResult = () => {
    const value = parseFloat(inputValue) || 0

    switch (activeCategory) {
      case "length":
        return convertLength(value, lengthFrom, lengthTo)
      case "weight":
        return convertWeight(value, weightFrom, weightTo)
      case "temperature":
        return convertTemperature(value, tempFrom, tempTo)
      case "area":
        return convertArea(value, areaFrom, areaTo)
      case "volume":
        return convertVolume(value, volumeFrom, volumeTo)
      case "time":
        return convertTime(value, timeFrom, timeTo)
      case "speed":
        return convertSpeed(value, speedFrom, speedTo)
      case "dataSize":
        return convertDataSize(value, dataSizeFrom, dataSizeTo)
      default:
        return 0
    }
  }

  const getCurrentUnits = () => {
    switch (activeCategory) {
      case "length":
        return { from: lengthFrom, to: lengthTo, units: lengthUnits }
      case "weight":
        return { from: weightFrom, to: weightTo, units: weightUnits }
      case "temperature":
        return { from: tempFrom, to: tempTo, units: temperatureUnits }
      case "area":
        return { from: areaFrom, to: areaTo, units: areaUnits }
      case "volume":
        return { from: volumeFrom, to: volumeTo, units: volumeUnits }
      case "time":
        return { from: timeFrom, to: timeTo, units: timeUnits }
      case "speed":
        return { from: speedFrom, to: speedTo, units: speedUnits }
      case "dataSize":
        return { from: dataSizeFrom, to: dataSizeTo, units: dataSizeUnits }
      default:
        return { from: "", to: "", units: [] }
    }
  }

  const swapUnits = () => {
    switch (activeCategory) {
      case "length":
        setLengthFrom(lengthTo)
        setLengthTo(lengthFrom)
        break
      case "weight":
        setWeightFrom(weightTo)
        setWeightTo(weightFrom)
        break
      case "temperature":
        setTempFrom(tempTo)
        setTempTo(tempFrom)
        break
      case "area":
        setAreaFrom(areaTo)
        setAreaTo(areaFrom)
        break
      case "volume":
        setVolumeFrom(volumeTo)
        setVolumeTo(volumeFrom)
        break
      case "time":
        setTimeFrom(timeTo)
        setTimeTo(timeFrom)
        break
      case "speed":
        setSpeedFrom(speedTo)
        setSpeedTo(speedFrom)
        break
      case "dataSize":
        setDataSizeFrom(dataSizeTo)
        setDataSizeTo(dataSizeFrom)
        break
    }

    toast({
      title: "Swapped",
      description: "Units swapped successfully",
    })
  }

  const addToHistory = () => {
    const value = parseFloat(inputValue) || 0
    const result = getConversionResult()
    const { from, to } = getCurrentUnits()

    const newEntry: ConversionHistory = {
      id: Date.now().toString(),
      category: activeCategory,
      value,
      from: from as string,
      to: to as string,
      result,
      timestamp: new Date(),
    }

    setHistory((prev) => [newEntry, ...prev].slice(0, 20))
  }

  const addToFavorites = () => {
    const { from, to } = getCurrentUnits()
    const fromUnit = getCurrentUnits().units.find((u) => u.value === from)
    const toUnit = getCurrentUnits().units.find((u) => u.value === to)

    const newFavorite: FavoriteConversion = {
      id: Date.now().toString(),
      category: activeCategory,
      from: from as string,
      to: to as string,
      label: `${fromUnit?.label} to ${toUnit?.label}`,
    }

    if (!favorites.some((f) => f.from === from && f.to === to && f.category === activeCategory)) {
      setFavorites((prev) => [...prev, newFavorite])
      toast({
        title: "Saved",
        description: "Conversion saved to favorites",
      })
    }
  }

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
    toast({
      title: "Removed",
      description: "Conversion removed from favorites",
    })
  }

  const loadFavorite = (favorite: FavoriteConversion) => {
    setActiveCategory(favorite.category)

    setTimeout(() => {
      switch (favorite.category) {
        case "length":
          setLengthFrom(favorite.from as LengthUnit)
          setLengthTo(favorite.to as LengthUnit)
          break
        case "weight":
          setWeightFrom(favorite.from as WeightUnit)
          setWeightTo(favorite.to as WeightUnit)
          break
        case "temperature":
          setTempFrom(favorite.from as TemperatureUnit)
          setTempTo(favorite.to as TemperatureUnit)
          break
        case "area":
          setAreaFrom(favorite.from as AreaUnit)
          setAreaTo(favorite.to as AreaUnit)
          break
        case "volume":
          setVolumeFrom(favorite.from as VolumeUnit)
          setVolumeTo(favorite.to as VolumeUnit)
          break
        case "time":
          setTimeFrom(favorite.from as TimeUnit)
          setTimeTo(favorite.to as TimeUnit)
          break
        case "speed":
          setSpeedFrom(favorite.from as SpeedUnit)
          setSpeedTo(favorite.to as SpeedUnit)
          break
        case "dataSize":
          setDataSizeFrom(favorite.from as DataSizeUnit)
          setDataSizeTo(favorite.to as DataSizeUnit)
          break
      }
    }, 100)
  }

  const getAllConversions = () => {
    const value = parseFloat(inputValue) || 0
    const { units, from } = getCurrentUnits()

    return units
      .filter((u) => u.value !== from)
      .map((unit) => {
        let result = 0
        switch (activeCategory) {
          case "length":
            result = convertLength(value, from as LengthUnit, unit.value as LengthUnit)
            break
          case "weight":
            result = convertWeight(value, from as WeightUnit, unit.value as WeightUnit)
            break
          case "temperature":
            result = convertTemperature(value, from as TemperatureUnit, unit.value as TemperatureUnit)
            break
          case "area":
            result = convertArea(value, from as AreaUnit, unit.value as AreaUnit)
            break
          case "volume":
            result = convertVolume(value, from as VolumeUnit, unit.value as VolumeUnit)
            break
          case "time":
            result = convertTime(value, from as TimeUnit, unit.value as TimeUnit)
            break
          case "speed":
            result = convertSpeed(value, from as SpeedUnit, unit.value as SpeedUnit)
            break
          case "dataSize":
            result = convertDataSize(value, from as DataSizeUnit, unit.value as DataSizeUnit)
            break
        }
        return {
          unit: unit.label,
          abbr: unit.abbr,
          value: result.toFixed(precision),
        }
      })
  }

  useEffect(() => {
    if (inputValue && parseFloat(inputValue)) {
      addToHistory()
    }
  }, [lengthFrom, lengthTo, weightFrom, weightTo, tempFrom, tempTo, areaFrom, areaTo, volumeFrom, volumeTo, timeFrom, timeTo, speedFrom, speedTo, dataSizeFrom, dataSizeTo])

  const result = getConversionResult()
  const { from, to } = getCurrentUnits()
  const formula = getConversionFormula(activeCategory, from as string, to as string, parseFloat(inputValue) || 0)

  const categories = [
    { id: "length", label: "Length", icon: Ruler },
    { id: "weight", label: "Weight", icon: Weight },
    { id: "temperature", label: "Temperature", icon: Thermometer },
    { id: "area", label: "Area", icon: Square },
    { id: "volume", label: "Volume", icon: Droplet },
    { id: "time", label: "Time", icon: Clock },
    { id: "speed", label: "Speed", icon: Gauge },
    { id: "dataSize", label: "Data Size", icon: HardDrive },
  ]

  const relatedTools = [
    {
      name: "Currency Converter",
      description: "Convert between currencies",
      icon: DollarSign,
      href: "/tools/finance/currency-converter",
    },
    {
      name: "Calculator",
      description: "Basic calculations",
      icon: Calculator,
      href: "/tools/productivity/calculator",
    },
    {
      name: "Age Calculator",
      description: "Calculate age and dates",
      icon: Calendar,
      href: "/tools/productivity/age-calculator",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Unit Converter Tool",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            description:
              "Free online unit converter for length, weight, temperature, area, volume, time, speed, and data size. Convert between metric and imperial units with real-time results and conversion formulas.",
            url: "https://tulz.net/tools/productivity/unit-converter",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "18234",
            },
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools/productivity">Productivity</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Unit Converter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                <Ruler className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Unit Converter - Length, Weight, Temperature Converter
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Convert between units of length, weight, temperature, area, volume, time, speed,
                  and data size. Supports metric and imperial units with real-time conversion,
                  multiple outputs, and conversion formulas. Perfect for students, engineers, and
                  everyday use.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold">4.8/5</span>
                    <span className="text-sm text-muted-foreground">(18,234 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                    <Ruler className="mr-1 h-3 w-3" />
                    8 Categories
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    Real-time Conversion
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    <Calculator className="mr-1 h-3 w-3" />
                    Formula Display
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Unit Converter</CardTitle>
                    <CardDescription>
                      Convert between different units of measurement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                        {categories.map((cat) => (
                          <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                            <cat.icon className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">{cat.label}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {categories.map((cat) => (
                        <TabsContent key={cat.id} value={cat.id} className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
                            <div className="space-y-2">
                              <Label>From</Label>
                              <Select
                                value={getCurrentUnits().from as string}
                                onValueChange={(value) => {
                                  switch (activeCategory) {
                                    case "length":
                                      setLengthFrom(value as LengthUnit)
                                      break
                                    case "weight":
                                      setWeightFrom(value as WeightUnit)
                                      break
                                    case "temperature":
                                      setTempFrom(value as TemperatureUnit)
                                      break
                                    case "area":
                                      setAreaFrom(value as AreaUnit)
                                      break
                                    case "volume":
                                      setVolumeFrom(value as VolumeUnit)
                                      break
                                    case "time":
                                      setTimeFrom(value as TimeUnit)
                                      break
                                    case "speed":
                                      setSpeedFrom(value as SpeedUnit)
                                      break
                                    case "dataSize":
                                      setDataSizeFrom(value as DataSizeUnit)
                                      break
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {getCurrentUnits().units.map((unit) => (
                                    <SelectItem key={unit.value} value={unit.value}>
                                      {unit.label} ({unit.abbr})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value"
                                className="text-lg font-semibold"
                              />
                            </div>

                            <div className="flex items-end justify-center pb-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={swapUnits}
                                className="h-10 w-10"
                              >
                                <ArrowLeftRight className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label>To</Label>
                              <Select
                                value={getCurrentUnits().to as string}
                                onValueChange={(value) => {
                                  switch (activeCategory) {
                                    case "length":
                                      setLengthTo(value as LengthUnit)
                                      break
                                    case "weight":
                                      setWeightTo(value as WeightUnit)
                                      break
                                    case "temperature":
                                      setTempTo(value as TemperatureUnit)
                                      break
                                    case "area":
                                      setAreaTo(value as AreaUnit)
                                      break
                                    case "volume":
                                      setVolumeTo(value as VolumeUnit)
                                      break
                                    case "time":
                                      setTimeTo(value as TimeUnit)
                                      break
                                    case "speed":
                                      setSpeedTo(value as SpeedUnit)
                                      break
                                    case "dataSize":
                                      setDataSizeTo(value as DataSizeUnit)
                                      break
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {getCurrentUnits().units.map((unit) => (
                                    <SelectItem key={unit.value} value={unit.value}>
                                      {unit.label} ({unit.abbr})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                                <p className="text-3xl font-bold text-primary">
                                  {result.toFixed(precision)}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {
                                    getCurrentUnits().units.find(
                                      (u) => u.value === getCurrentUnits().to
                                    )?.label
                                  }
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={addToFavorites} variant="outline" className="flex-1">
                              <Heart className="mr-2 h-4 w-4" />
                              Save to Favorites
                            </Button>
                            <Select
                              value={precision.toString()}
                              onValueChange={(value) => setPrecision(parseInt(value))}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Precision" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0 decimals</SelectItem>
                                <SelectItem value="2">2 decimals</SelectItem>
                                <SelectItem value="4">4 decimals</SelectItem>
                                <SelectItem value="6">6 decimals</SelectItem>
                                <SelectItem value="8">8 decimals</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {formula && (
                            <div className="rounded-lg border bg-muted/50 p-4">
                              <Label className="text-xs text-muted-foreground mb-2 block">
                                Conversion Formula
                              </Label>
                              <p className="font-mono text-sm">{formula}</p>
                            </div>
                          )}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>All Conversions</CardTitle>
                    <CardDescription>
                      Convert to all available units simultaneously
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {getAllConversions().map((conversion, index) => (
                        <div
                          key={index}
                          className="rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                        >
                          <p className="text-sm text-muted-foreground">{conversion.unit}</p>
                          <p className="text-lg font-semibold">
                            {conversion.value} {conversion.abbr}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Guide</CardTitle>
                    <CardDescription>
                      Understanding unit conversions and common measurements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Common Conversions</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border p-3">
                          <p className="font-medium mb-2">Length</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 1 meter = 3.281 feet</li>
                            <li>• 1 kilometer = 0.621 miles</li>
                            <li>• 1 inch = 2.54 centimeters</li>
                          </ul>
                        </div>
                        <div className="rounded-lg border p-3">
                          <p className="font-medium mb-2">Weight</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 1 kilogram = 2.205 pounds</li>
                            <li>• 1 pound = 16 ounces</li>
                            <li>• 1 ton = 1000 kilograms</li>
                          </ul>
                        </div>
                        <div className="rounded-lg border p-3">
                          <p className="font-medium mb-2">Temperature</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 0°C = 32°F = 273.15K</li>
                            <li>• 100°C = 212°F = 373.15K</li>
                            <li>• Room temp: ~20°C / 68°F</li>
                          </ul>
                        </div>
                        <div className="rounded-lg border p-3">
                          <p className="font-medium mb-2">Volume</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 1 liter = 0.264 gallons</li>
                            <li>• 1 gallon = 3.785 liters</li>
                            <li>• 1 cup = 236.6 milliliters</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Metric vs Imperial</h3>
                      <div className="rounded-lg border p-4 space-y-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Metric System:</strong> Used by most countries worldwide. Based
                          on powers of 10, making conversions straightforward. Units include meter
                          (m), kilogram (kg), liter (L), and Celsius (°C).
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Imperial System:</strong> Primarily used in the United States.
                          Based on historical measurements. Units include foot (ft), pound (lb),
                          gallon (gal), and Fahrenheit (°F).
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Tip:</strong> When converting between systems, always double-check
                          your results, especially for critical applications like cooking, medicine,
                          or engineering.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Using This Tool</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-primary font-bold">1.</span>
                          <span className="text-muted-foreground">
                            Select the category tab for the type of conversion you need (Length,
                            Weight, Temperature, etc.)
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-primary font-bold">2.</span>
                          <span className="text-muted-foreground">
                            Choose your source unit from the "From" dropdown and enter a value
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-primary font-bold">3.</span>
                          <span className="text-muted-foreground">
                            Select your target unit from the "To" dropdown to see the conversion
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-primary font-bold">4.</span>
                          <span className="text-muted-foreground">
                            Use the swap button to quickly reverse the conversion direction
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-primary font-bold">5.</span>
                          <span className="text-muted-foreground">
                            Adjust precision to control decimal places in the result
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-primary font-bold">6.</span>
                          <span className="text-muted-foreground">
                            Save frequently used conversions to favorites for quick access
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Favorites</CardTitle>
                      {favorites.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setFavorites([])}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No favorites yet. Save conversions to access them quickly.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {favorites.map((fav) => (
                          <div
                            key={fav.id}
                            className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors group"
                          >
                            <button
                              onClick={() => loadFavorite(fav)}
                              className="flex-1 text-left"
                            >
                              <p className="text-sm font-medium">{fav.label}</p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {fav.category}
                              </p>
                            </button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromFavorites(fav.id)}
                              className="opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No history yet
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {history.slice(0, 10).map((item) => {
                          const fromUnit = getCurrentUnits().units.find(
                            (u) => u.value === item.from
                          )
                          const toUnit = getCurrentUnits().units.find(
                            (u) => u.value === item.to
                          )
                          return (
                            <div
                              key={item.id}
                              className="rounded-lg border p-3 text-sm hover:bg-muted/50 transition-colors"
                            >
                              <p className="font-medium">
                                {item.value} {fromUnit?.abbr || item.from} ={" "}
                                {item.result.toFixed(precision)} {toUnit?.abbr || item.to}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {item.category} •{" "}
                                {new Date(item.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "8 conversion categories",
                      "50+ unit types",
                      "Real-time conversion",
                      "Swap units instantly",
                      "Multiple outputs view",
                      "Conversion formulas",
                      "Adjustable precision",
                      "Conversion history",
                      "Save favorites",
                      "Metric & Imperial",
                      "100% free",
                      "No registration needed",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md transition-transform group-hover:scale-110">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-primary">
                          Try it now
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
