"use client"

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ResultSectionChartProps {
  sectionData?: {
    sectionName?: string
    options?: Array<{
      optionId: string
      name: string
      votes?: number
    }>
  }
}

function ResultSectionChart({ sectionData }: ResultSectionChartProps) {
  const chartData = sectionData?.options || [
    { optionId: '1', name: 'Option A', votes: 12 },
    { optionId: '2', name: 'Option B', votes: 19 },
    { optionId: '3', name: 'Option C', votes: 8 },
    { optionId: '4', name: 'Option D', votes: 15 }
  ]

  const data = {
    labels: chartData.map(opt => opt.name),
    datasets: [
      {
        label: 'Votes',
        data: chartData.map(opt => opt.votes || 0),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(249, 115, 22, 0.7)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(168, 85, 247)',
          'rgb(249, 115, 22)'
        ],
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: true,
        text: sectionData?.sectionName || 'Ranking Results'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className='w-full h-96'>
      <Bar data={data} options={options} />
    </div>
  )
}

export default ResultSectionChart