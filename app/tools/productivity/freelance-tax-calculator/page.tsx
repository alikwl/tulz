"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { DollarSign } from "lucide-react"

export default function FreelanceTaxCalculator() {
  const [income, setIncome] = useState<number>(75000)
  const [expenses, setExpenses] = useState<number>(15000)
  const [taxRate, setTaxRate] = useState<number>(25)

  const netIncome = income - expenses
  const estimatedTax = (netIncome * taxRate) / 100
  const takehome = netIncome - estimatedTax
  const selfEmploymentTax = netIncome * 0.153

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-yellow-500 to-orange-500 py-16 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">
                Productivity
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Freelance Tax Calculator
              </h1>
              <p className="text-lg text-white/90">
                Estimate your taxes and take-home pay as a freelancer
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Income & Expenses</CardTitle>
                  <CardDescription>Enter your financial details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Gross Income: ${income.toLocaleString()}</Label>
                    <Slider
                      value={[income]}
                      onValueChange={(v) => setIncome(v[0])}
                      min={0}
                      max={200000}
                      step={1000}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Business Expenses: ${expenses.toLocaleString()}</Label>
                    <Slider
                      value={[expenses]}
                      onValueChange={(v) => setExpenses(v[0])}
                      min={0}
                      max={50000}
                      step={500}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Estimated Tax Rate: {taxRate}%</Label>
                    <Slider
                      value={[taxRate]}
                      onValueChange={(v) => setTaxRate(v[0])}
                      min={0}
                      max={40}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <DollarSign className="h-5 w-5" />
                      Take-Home Pay
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-green-700 dark:text-green-300">
                      ${takehome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Income</span>
                      <span className="font-semibold">
                        ${netIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Income Tax ({taxRate}%)</span>
                      <span className="font-semibold text-red-600">
                        -${estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Self-Employment Tax (15.3%)</span>
                      <span className="font-semibold text-red-600">
                        -${selfEmploymentTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total Taxes</span>
                        <span className="font-bold text-red-600">
                          -${(estimatedTax + selfEmploymentTax).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> This is an estimate. Consult a tax professional for accurate
                      calculations based on your specific situation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
