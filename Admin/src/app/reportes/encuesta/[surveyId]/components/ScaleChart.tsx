'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ChartData,
  ArcElement,
  Legend,
  Tooltip,
} from 'chart.js'
import { ChartProps, Pie } from 'react-chartjs-2'
import { scaleGenerator } from '@/utils/utils'

ChartJS.register(CategoryScale, LinearScale, ArcElement, Legend, Tooltip)

type ScaleChartProps = {
  title: string
  labels: string[]
  data: number[]
  baseColor?: string
}

export default function ScaleChart({
  title,
  labels,
  data,
  baseColor,
}: ScaleChartProps) {
  if (labels.length != data.length) {
    throw new Error('Length of questionOptions and data must be the same')
  }
  const dataConf: ChartData<'pie'> = {
    labels,
    datasets: [
      {
        label: 'Respuestas',
        data,
        backgroundColor: scaleGenerator(baseColor || '#589A74', labels.length),
      },
    ],
  }
  const config: Omit<ChartProps<'pie'>, 'type'> = {
    title,
    data: dataConf,
    options: {
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          position: 'right'
        },
        tooltip: {
          displayColors: false
        }
      },
    },
  }

  return <Pie {...config}></Pie>
}
