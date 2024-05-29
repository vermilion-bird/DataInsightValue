"use client"
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import DataTable from "@/components/data/data-table"
import Toolbar from "@/components/explorer/toolbar"
import ReactECharts from 'echarts-for-react';

import { useEffect, useState, useRef } from 'react';

import { getAnalysticDataByLang, generateChartOption, getAnalysticDimension } from '@/app/api/query'
import { genPie, genBar, genStackedLine } from '@/app/lib/chart/chart'
import Sidebar from '@/components/layout/sidebar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { CodeBlock, dracula, github } from "react-code-blocks";
export const runtime = 'nodejs';

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Analystic() {
  interface TableData {
    headers: string[];
    rows: string[][];
    sql: string;
  }
  const [disTabOrChart, setDisTabOrChart] = useState(false)
  const [disCard, setDisCard] = useState(false)
  const [sql, setSQL] = useState("")
  const [dimensions, setDimensions] = useState<string[]>([])
  const [metrics, setMetrics] = useState<string[]>([])

  const dataSourceID = useSelector((state: RootState) => state.keyValue.keyValue.currentDataSource.id)

  const tableData: TableData = {
    headers: [],
    rows: [[]],
    sql: ''
  };
  const [datas, setDatas] = useState(tableData)

  const [naturalLang, setNaturalLang] = useState('')
  const [loading, setLoading] = useState(false)

  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const [chartOption, setChartOption] = useState({}); // Step 1


  const handleCheckboxChange = (dimension: string) => {
    // Check if the dimension is already selected
    const isSelected = selectedDimensions.includes(dimension);
    // If it's selected, remove it; otherwise, add it to the array
    setSelectedDimensions(prevDimensions =>
      isSelected
        ? prevDimensions.filter(dim => dim !== dimension)
        : [...prevDimensions, dimension]
    );
    return selectedDimensions
  };

  const handleCheckboxMetricChange = (dimension: string) => {
    // Check if the dimension is already selected
    const isSelected = selectedMetrics.includes(dimension);
    // If it's selected, remove it; otherwise, add it to the array
    setSelectedMetrics(prevDimensions =>
      isSelected
        ? prevDimensions.filter(dim => dim !== dimension)
        : [...prevDimensions, dimension]
    );
    return selectedMetrics
  };

  async function loadDatas(currentPage: number) {
    if (loading) return
    try {
      setLoading(true)
      const { data } = await getAnalysticDataByLang({ "natural_lang": naturalLang, "database_id": dataSourceID });
      setDatas(data)
      setSQL(data.sql)

      const dims = await getAnalysticDimension({ "columns": data.headers.join(',') })
      console.log(dims)
      setDimensions(dims.data.dimensions)
      setMetrics(dims.data.metrics)
      setDisCard(true)
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setSelectedDimensions([])
      setSelectedMetrics([])
      setLoading(false)
    }
  }

  const getOption = async (chartType: string) => {
    switch (chartType) {
      case 'pieChart':
        setChartOption(genPie(datas, selectedDimensions[0], selectedMetrics[0]))
        break;
      case 'areaChart':
        setChartOption(genBar(datas, selectedDimensions[0], selectedMetrics[0]))
        break;
      case 'lineChart':
        setChartOption(genStackedLine(datas, selectedDimensions[0], selectedMetrics))
        break;
    }
  };


  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      loadDatas(1)
    }
  }

  const handleInputChange = (e: any) => {
    setNaturalLang(e.target.value)
  }
  const [chartType, setChartType] = useState('')

  const handleIconClick = (icon: any) => {
    if (icon == "sheet") {
      setDisTabOrChart(false)
    } else {
      setDisTabOrChart(true)
    }
    setChartType(icon)
    getOption(icon);
    // Additional logic based on the clicked icon can go here
  };

  // render echarts option.
  return (
    <div className='grid grid-cols-12 px-5'>
      {/* <Sidebar className='col-span-1'></Sidebar> */}
      <div className="flex flex-col items-center bg-slate-50 col-span-12 py-10 rounded-2xl border-2 px-3">
        {/* <MyComponent></MyComponent> */}
        <Input
          className="w-full sm:mt-3 lg:mt-10 border-blue-200 p-8 rounded-full"
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
        />
        {loading ? (
          <div className="flex items-center justify-center h-12 w-12 mt-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-safe:animate-spin">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          disCard && (
            <div>
              <Card className="w-[96vw] md:w-[80vw] lg:w-[60vw] my-1 h-60vh">
                {/* <CardHeader>
             <CardTitle>数据探索</CardTitle>
             <CardDescription>AI 数据分析探索</CardDescription>
           </CardHeader> */}
                <CardContent className='max-h-60vh'>
                  {disTabOrChart ? (
                    <div>
                      <ReactECharts
                        notMerge={true}
                        lazyUpdate={true}
                        option={chartOption}
                        style={{ height: '60vh', width: '100%' }}
                      />
                    </div>
                  ) : (
                    <DataTable headers={datas.headers} rows={datas.rows} />
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-center ">
                  <Toolbar
                    onIconClick={handleIconClick}
                    metrics={metrics}
                    dimensions={dimensions}
                    handleCheckboxChange={handleCheckboxChange}
                    handleCheckboxMetricChange={handleCheckboxMetricChange}
                    selectedDimensions={selectedDimensions}
                    selectedMetrics={selectedMetrics}
                  />
                  {/* @copyright */}
                  {/* <Button variant="outline">Cancel</Button> <Button>Deploy</Button> */}
                </CardFooter>
                <CodeBlock
                  text={sql}
                  language="sql"
                  showLineNumbers={true}
                  // startingLineNumber={true}
                  theme={github}
                />
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  )
}
