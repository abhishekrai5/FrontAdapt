import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

// Mock Data
const salesData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 800 },
  { month: "May", value: 500 },
];

const transactionsData = [
  { name: "Completed", count: 120 },
  { name: "Pending", count: 40 },
  { name: "Failed", count: 10 },
];

export default function Insights() {
  const [aiInsight, setAiInsight] = useState(null);

  const generateAIInsight = () => {
    const randomInsights = [
      "Sales have increased 33% compared to last quarter 🚀",
      "Pending transactions are trending down 📉",
      "Customer engagement is highest on weekends 🔥",
    ];
    const pick = randomInsights[Math.floor(Math.random() * randomInsights.length)];
    setAiInsight(pick);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Insights</h1>

      {/* Sales Trend */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transactions Breakdown */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Transactions Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>AI-Generated Insights</CardTitle>
          <Button onClick={generateAIInsight} className="flex gap-2">
            <Sparkles className="w-4 h-4" /> Generate
          </Button>
        </CardHeader>
        <CardContent>
          {aiInsight ? (
            <p className="text-lg font-medium text-gray-800">{aiInsight}</p>
          ) : (
            <p className="text-gray-500">Click "Generate" to see AI insights.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
