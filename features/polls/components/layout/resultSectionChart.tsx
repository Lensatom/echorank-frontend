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
  sectionData: Record<string, Record<string, string>>
}

function ResultSectionChart({ sectionData }: ResultSectionChartProps) {

  console.log('Rendering ResultSectionChart with sectionData:', sectionData)

  const sectionId:string = Object.keys(sectionData)[0]
  const rankIds = Object.keys(sectionData[sectionId])

  const chartData = rankIds.map(rankId => {
    return {
      optionId: rankId,
      name: rankId,
      votes: sectionData[sectionId][rankId]
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
      title: {
        display: true,
        text: sectionId
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className='w-full p-6 flex justify-center items-center'>
      <Bar data={data} options={options} />
    </div>
  )
}

export default ResultSectionChart