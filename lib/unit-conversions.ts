export type LengthUnit =
  | "millimeter" | "centimeter" | "meter" | "kilometer"
  | "inch" | "foot" | "yard" | "mile" | "nauticalMile"

export type WeightUnit =
  | "milligram" | "gram" | "kilogram" | "ton"
  | "ounce" | "pound" | "stone"

export type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin"

export type AreaUnit =
  | "squareMeter" | "squareKilometer"
  | "squareFoot" | "squareMile" | "acre" | "hectare"

export type VolumeUnit =
  | "milliliter" | "liter"
  | "fluidOunce" | "cup" | "pint" | "quart" | "gallon"

export type TimeUnit =
  | "second" | "minute" | "hour" | "day" | "week" | "month" | "year"

export type SpeedUnit = "metersPerSecond" | "kilometersPerHour" | "milesPerHour" | "knots"

export type DataSizeUnit = "bit" | "byte" | "kilobyte" | "megabyte" | "gigabyte" | "terabyte" | "petabyte"

export const lengthUnits: { value: LengthUnit; label: string; abbr: string }[] = [
  { value: "millimeter", label: "Millimeter", abbr: "mm" },
  { value: "centimeter", label: "Centimeter", abbr: "cm" },
  { value: "meter", label: "Meter", abbr: "m" },
  { value: "kilometer", label: "Kilometer", abbr: "km" },
  { value: "inch", label: "Inch", abbr: "in" },
  { value: "foot", label: "Foot", abbr: "ft" },
  { value: "yard", label: "Yard", abbr: "yd" },
  { value: "mile", label: "Mile", abbr: "mi" },
  { value: "nauticalMile", label: "Nautical Mile", abbr: "nmi" },
]

export const weightUnits: { value: WeightUnit; label: string; abbr: string }[] = [
  { value: "milligram", label: "Milligram", abbr: "mg" },
  { value: "gram", label: "Gram", abbr: "g" },
  { value: "kilogram", label: "Kilogram", abbr: "kg" },
  { value: "ton", label: "Metric Ton", abbr: "t" },
  { value: "ounce", label: "Ounce", abbr: "oz" },
  { value: "pound", label: "Pound", abbr: "lb" },
  { value: "stone", label: "Stone", abbr: "st" },
]

export const temperatureUnits: { value: TemperatureUnit; label: string; abbr: string }[] = [
  { value: "celsius", label: "Celsius", abbr: "°C" },
  { value: "fahrenheit", label: "Fahrenheit", abbr: "°F" },
  { value: "kelvin", label: "Kelvin", abbr: "K" },
]

export const areaUnits: { value: AreaUnit; label: string; abbr: string }[] = [
  { value: "squareMeter", label: "Square Meter", abbr: "m²" },
  { value: "squareKilometer", label: "Square Kilometer", abbr: "km²" },
  { value: "squareFoot", label: "Square Foot", abbr: "ft²" },
  { value: "squareMile", label: "Square Mile", abbr: "mi²" },
  { value: "acre", label: "Acre", abbr: "ac" },
  { value: "hectare", label: "Hectare", abbr: "ha" },
]

export const volumeUnits: { value: VolumeUnit; label: string; abbr: string }[] = [
  { value: "milliliter", label: "Milliliter", abbr: "ml" },
  { value: "liter", label: "Liter", abbr: "L" },
  { value: "fluidOunce", label: "Fluid Ounce", abbr: "fl oz" },
  { value: "cup", label: "Cup", abbr: "cup" },
  { value: "pint", label: "Pint", abbr: "pt" },
  { value: "quart", label: "Quart", abbr: "qt" },
  { value: "gallon", label: "Gallon", abbr: "gal" },
]

export const timeUnits: { value: TimeUnit; label: string; abbr: string }[] = [
  { value: "second", label: "Second", abbr: "s" },
  { value: "minute", label: "Minute", abbr: "min" },
  { value: "hour", label: "Hour", abbr: "hr" },
  { value: "day", label: "Day", abbr: "d" },
  { value: "week", label: "Week", abbr: "wk" },
  { value: "month", label: "Month", abbr: "mo" },
  { value: "year", label: "Year", abbr: "yr" },
]

export const speedUnits: { value: SpeedUnit; label: string; abbr: string }[] = [
  { value: "metersPerSecond", label: "Meters per Second", abbr: "m/s" },
  { value: "kilometersPerHour", label: "Kilometers per Hour", abbr: "km/h" },
  { value: "milesPerHour", label: "Miles per Hour", abbr: "mph" },
  { value: "knots", label: "Knots", abbr: "kn" },
]

export const dataSizeUnits: { value: DataSizeUnit; label: string; abbr: string }[] = [
  { value: "bit", label: "Bit", abbr: "b" },
  { value: "byte", label: "Byte", abbr: "B" },
  { value: "kilobyte", label: "Kilobyte", abbr: "KB" },
  { value: "megabyte", label: "Megabyte", abbr: "MB" },
  { value: "gigabyte", label: "Gigabyte", abbr: "GB" },
  { value: "terabyte", label: "Terabyte", abbr: "TB" },
  { value: "petabyte", label: "Petabyte", abbr: "PB" },
]

const lengthToMeters: Record<LengthUnit, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
  nauticalMile: 1852,
}

const weightToKilograms: Record<WeightUnit, number> = {
  milligram: 0.000001,
  gram: 0.001,
  kilogram: 1,
  ton: 1000,
  ounce: 0.0283495,
  pound: 0.453592,
  stone: 6.35029,
}

const areaToSquareMeters: Record<AreaUnit, number> = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareFoot: 0.092903,
  squareMile: 2589988.11,
  acre: 4046.86,
  hectare: 10000,
}

const volumeToLiters: Record<VolumeUnit, number> = {
  milliliter: 0.001,
  liter: 1,
  fluidOunce: 0.0295735,
  cup: 0.236588,
  pint: 0.473176,
  quart: 0.946353,
  gallon: 3.78541,
}

const timeToSeconds: Record<TimeUnit, number> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629800,
  year: 31557600,
}

const speedToMetersPerSecond: Record<SpeedUnit, number> = {
  metersPerSecond: 1,
  kilometersPerHour: 0.277778,
  milesPerHour: 0.44704,
  knots: 0.514444,
}

const dataSizeToBits: Record<DataSizeUnit, number> = {
  bit: 1,
  byte: 8,
  kilobyte: 8000,
  megabyte: 8000000,
  gigabyte: 8000000000,
  terabyte: 8000000000000,
  petabyte: 8000000000000000,
}

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  const meters = value * lengthToMeters[from]
  return meters / lengthToMeters[to]
}

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  const kilograms = value * weightToKilograms[from]
  return kilograms / weightToKilograms[to]
}

export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) return value

  let celsius = value
  if (from === "fahrenheit") {
    celsius = (value - 32) * (5 / 9)
  } else if (from === "kelvin") {
    celsius = value - 273.15
  }

  if (to === "celsius") return celsius
  if (to === "fahrenheit") return celsius * (9 / 5) + 32
  if (to === "kelvin") return celsius + 273.15

  return value
}

export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  const squareMeters = value * areaToSquareMeters[from]
  return squareMeters / areaToSquareMeters[to]
}

export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  const liters = value * volumeToLiters[from]
  return liters / volumeToLiters[to]
}

export function convertTime(value: number, from: TimeUnit, to: TimeUnit): number {
  const seconds = value * timeToSeconds[from]
  return seconds / timeToSeconds[to]
}

export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  const metersPerSecond = value * speedToMetersPerSecond[from]
  return metersPerSecond / speedToMetersPerSecond[to]
}

export function convertDataSize(value: number, from: DataSizeUnit, to: DataSizeUnit): number {
  const bits = value * dataSizeToBits[from]
  return bits / dataSizeToBits[to]
}

export function getConversionFormula(
  category: string,
  from: string,
  to: string,
  value: number
): string {
  switch (category) {
    case "length":
      return getLengthFormula(value, from as LengthUnit, to as LengthUnit)
    case "weight":
      return getWeightFormula(value, from as WeightUnit, to as WeightUnit)
    case "temperature":
      return getTemperatureFormula(value, from as TemperatureUnit, to as TemperatureUnit)
    case "area":
      return getAreaFormula(value, from as AreaUnit, to as AreaUnit)
    case "volume":
      return getVolumeFormula(value, from as VolumeUnit, to as VolumeUnit)
    case "time":
      return getTimeFormula(value, from as TimeUnit, to as TimeUnit)
    case "speed":
      return getSpeedFormula(value, from as SpeedUnit, to as SpeedUnit)
    case "dataSize":
      return getDataSizeFormula(value, from as DataSizeUnit, to as DataSizeUnit)
    default:
      return ""
  }
}

function getLengthFormula(value: number, from: LengthUnit, to: LengthUnit): string {
  const ratio = lengthToMeters[from] / lengthToMeters[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}

function getWeightFormula(value: number, from: WeightUnit, to: WeightUnit): string {
  const ratio = weightToKilograms[from] / weightToKilograms[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}

function getTemperatureFormula(value: number, from: TemperatureUnit, to: TemperatureUnit): string {
  if (from === to) return `${value} = ${value}`

  if (from === "celsius" && to === "fahrenheit") {
    return `(${value} × 9/5) + 32 = ${(value * 9 / 5 + 32).toFixed(2)}`
  }
  if (from === "fahrenheit" && to === "celsius") {
    return `(${value} - 32) × 5/9 = ${((value - 32) * 5 / 9).toFixed(2)}`
  }
  if (from === "celsius" && to === "kelvin") {
    return `${value} + 273.15 = ${(value + 273.15).toFixed(2)}`
  }
  if (from === "kelvin" && to === "celsius") {
    return `${value} - 273.15 = ${(value - 273.15).toFixed(2)}`
  }
  if (from === "fahrenheit" && to === "kelvin") {
    return `((${value} - 32) × 5/9) + 273.15 = ${(((value - 32) * 5 / 9) + 273.15).toFixed(2)}`
  }
  if (from === "kelvin" && to === "fahrenheit") {
    return `(${value} - 273.15) × 9/5 + 32 = ${((value - 273.15) * 9 / 5 + 32).toFixed(2)}`
  }

  return ""
}

function getAreaFormula(value: number, from: AreaUnit, to: AreaUnit): string {
  const ratio = areaToSquareMeters[from] / areaToSquareMeters[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}

function getVolumeFormula(value: number, from: VolumeUnit, to: VolumeUnit): string {
  const ratio = volumeToLiters[from] / volumeToLiters[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}

function getTimeFormula(value: number, from: TimeUnit, to: TimeUnit): string {
  const ratio = timeToSeconds[from] / timeToSeconds[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}

function getSpeedFormula(value: number, from: SpeedUnit, to: SpeedUnit): string {
  const ratio = speedToMetersPerSecond[from] / speedToMetersPerSecond[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}

function getDataSizeFormula(value: number, from: DataSizeUnit, to: DataSizeUnit): string {
  const ratio = dataSizeToBits[from] / dataSizeToBits[to]
  return `${value} × ${ratio.toExponential(4)} = ${(value * ratio).toFixed(4)}`
}
