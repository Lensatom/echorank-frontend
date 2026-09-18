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
import { text } from 'stream/consumers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ResultSectionChartProps {
  sectionResult: Record<string, Record<string, string>>,
  sectionData: any
}

function ResultSectionChart({
  sectionResult,
  sectionData
}: ResultSectionChartProps) {

  console.log('Section result data:', sectionResult)
  console.log('Section data:', sectionData)

  const sectionId:string = Object.keys(sectionResult)[0]
  const rankIds = Object.keys(sectionResult[sectionId])

  const chartData = rankIds.map(rankId => {
    return {
      optionId: rankId,
      name: sectionData.options.find((opt: any) => opt.optionId === rankId)?.name || `Option ${rankId}`,
      votes: sectionResult[sectionId][rankId]
    }
  })

  const data = {
    labels: chartData.map(opt => opt.name),
    datasets: [
      {
        label: 'Rank Index',
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
    indexAxis: 'x' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default ResultSectionChart