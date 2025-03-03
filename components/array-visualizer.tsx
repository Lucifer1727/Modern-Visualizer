"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Search, Shuffle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

export default function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([25, 45, 10, 85, 30, 60, 15, 70])
  const [inputValue, setInputValue] = useState<string>("")
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchIndex, setSearchIndex] = useState<number | null>(null)
  const [animationSpeed, setAnimationSpeed] = useState<number>(50)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const { theme } = useTheme()

  // Reset search highlight when array changes
  useEffect(() => {
    setSearchIndex(null)
  }, [])

  const addElement = () => {
    const value = Number.parseInt(inputValue)
    if (!isNaN(value)) {
      setIsAnimating(true)
      setArray([...array, value])
      setInputValue("")
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const removeElement = () => {
    if (array.length > 0) {
      setIsAnimating(true)
      setArray(array.slice(0, -1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const searchElement = () => {
    const value = Number.parseInt(searchValue)
    if (!isNaN(value)) {
      setIsAnimating(true)
      const index = array.indexOf(value)
      setSearchIndex(index)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const shuffleArray = () => {
    setIsAnimating(true)
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    setArray(newArray)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const resetArray = () => {
    setIsAnimating(true)
    setArray([25, 45, 10, 85, 30, 60, 15, 70])
    setTimeout(() => setIsAnimating(false), 500)
  }

  const bubbleSort = async () => {
    setIsAnimating(true)
    const newArray = [...array]
    const n = newArray.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          ;[newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]
          // Update state to show animation
          setArray([...newArray])
          // Wait for animation
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 10))
        }
      }
    }

    setIsAnimating(false)
  }

  const quickSort = async () => {
    setIsAnimating(true)
    const newArray = [...array]

    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          setArray([...arr])
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 10))
        }
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 10))

      return i + 1
    }

    const sort = async (arr: number[], low: number, high: number) => {
      if (low < high) {
        const pi = await partition(arr, low, high)
        await sort(arr, low, pi - 1)
        await sort(arr, pi + 1, high)
      }
    }

    await sort(newArray, 0, newArray.length - 1)
    setIsAnimating(false)
  }

  const getMaxValue = () => {
    return Math.max(...array, 1)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-lg p-4 flex items-end justify-center gap-2 overflow-hidden">
          <AnimatePresence>
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: `${(value / getMaxValue()) * 100}%`,
                  opacity: 1,
                  backgroundColor:
                    searchIndex === index
                      ? "rgb(249, 115, 22)"
                      : theme === "dark"
                        ? "rgb(56, 189, 248)"
                        : "rgb(14, 165, 233)",
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.5,
                }}
                className={`w-12 rounded-t-md flex items-center justify-center text-white font-medium
                  ${searchIndex === index ? "bg-orange-500" : "bg-sky-500 dark:bg-sky-400"}`}
                whileHover={{ scale: 1.05 }}
                layout
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Tabs defaultValue="modify" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="modify">Modify Array</TabsTrigger>
          <TabsTrigger value="sort">Sort Array</TabsTrigger>
        </TabsList>

        <TabsContent value="modify" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex gap-2">
              <Input
                type="number"
                placeholder="Enter a value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addElement} disabled={isAnimating || inputValue === ""}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            <Button onClick={removeElement} disabled={isAnimating || array.length === 0} variant="outline">
              <Minus className="mr-2 h-4 w-4" /> Remove
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex gap-2">
              <Input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={searchElement} disabled={isAnimating || searchValue === ""} variant="secondary">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={shuffleArray} disabled={isAnimating} variant="outline">
                <Shuffle className="mr-2 h-4 w-4" /> Shuffle
              </Button>
              <Button onClick={resetArray} disabled={isAnimating} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sort" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Animation Speed</span>
                <span className="text-sm font-medium">{animationSpeed}%</span>
              </div>
              <Slider
                value={[animationSpeed]}
                min={1}
                max={100}
                step={1}
                onValueChange={(value) => setAnimationSpeed(value[0])}
                disabled={isAnimating}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={bubbleSort} disabled={isAnimating} variant="secondary">
                Bubble Sort
              </Button>
              <Button onClick={quickSort} disabled={isAnimating}>
                Quick Sort
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
        <h3 className="text-lg font-medium mb-2 text-slate-800 dark:text-white">Array Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Length</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{array.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Min Value</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">
              {array.length > 0 ? Math.min(...array) : "N/A"}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Max Value</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">
              {array.length > 0 ? Math.max(...array) : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

