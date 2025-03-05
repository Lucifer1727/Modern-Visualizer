// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Minus, Search, Shuffle, RotateCcw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useTheme } from "next-themes";

// export default function ArrayVisualizer() {
//   const [array, setArray] = useState<number[]>([
//     25, 45, 10, 85, 30, 60, 15, 70,
//   ]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [searchIndex, setSearchIndex] = useState<number | null>(null);
//   const [animationSpeed, setAnimationSpeed] = useState<number>(50);
//   const [isAnimating, setIsAnimating] = useState<boolean>(false);
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Set mounted to true after the component mounts
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Reset search highlight when array changes
//   useEffect(() => {
//     setSearchIndex(null);
//   }, [array]);

//   const addElement = () => {
//     const value = Number.parseInt(inputValue);
//     if (!isNaN(value)) {
//       setIsAnimating(true);
//       setArray([...array, value]);
//       setInputValue("");
//       setTimeout(() => setIsAnimating(false), 500);
//     }
//   };

//   const removeElement = () => {
//     if (array.length > 0) {
//       setIsAnimating(true);
//       setArray(array.slice(0, -1));
//       setTimeout(() => setIsAnimating(false), 500);
//     }
//   };

//   const searchElement = () => {
//     const value = Number.parseInt(searchValue);
//     if (!isNaN(value)) {
//       const index = array.indexOf(value);
//       setSearchIndex(index !== -1 ? index : null);
//     }
//   };

//   if (!mounted) {
//     return null;
//   }
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
  const [sortExplanation, setSortExplanation] = useState<string | null>(null)
  const [highlightIndices, setHighlightIndices] = useState<number[]>([])
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

    // Initial explanation
    setSortExplanation(
      "Starting Bubble Sort: We'll compare adjacent elements and swap them if they're in the wrong order.",
    )
    await new Promise((resolve) => setTimeout(resolve, 1500))

    for (let i = 0; i < n; i++) {
      setSortExplanation(`Pass ${i + 1}: Moving the largest unsorted element to its correct position.`)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the elements being compared
        setHighlightIndices([j, j + 1])
        setSortExplanation(`Comparing ${newArray[j]} and ${newArray[j + 1]}...`)
        await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

        if (newArray[j] > newArray[j + 1]) {
          // Explain the swap
          setSortExplanation(`${newArray[j]} > ${newArray[j + 1]}, so we'll swap them.`)
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

          // Swap elements
          ;[newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]
          // Update state to show animation
          setArray([...newArray])
          // Wait for animation
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
        } else {
          // Explain why no swap is needed
          setSortExplanation(`${newArray[j]} <= ${newArray[j + 1]}, no swap needed.`)
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
        }
      }

      // Explain the completion of this pass
      setSortExplanation(
        `Pass ${i + 1} complete: The largest ${i + 1} element${i > 0 ? "s are" : " is"} now at the end.`,
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Final explanation
    setSortExplanation("Bubble Sort complete! The array is now sorted.")
    setHighlightIndices([])
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSortExplanation(null)
    setIsAnimating(false)
  }

  const quickSort = async () => {
    setIsAnimating(true)
    const newArray = [...array]

    // Initial explanation
    setSortExplanation("Starting Quick Sort: We'll pick a pivot element and partition the array around it.")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high]
      setSortExplanation(`Partitioning: Using ${pivot} as the pivot element.`)
      await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

      let i = low - 1

      for (let j = low; j < high; j++) {
        // Highlight the current element and pivot
        setHighlightIndices([j, high])
        setSortExplanation(`Comparing ${arr[j]} with pivot ${pivot}...`)
        await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

        if (arr[j] < pivot) {
          i++
          setSortExplanation(`${arr[j]} < ${pivot}, so we'll move it to the left side by swapping with position ${i}.`)
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

          // Highlight the elements being swapped
          setHighlightIndices([i, j])
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          setArray([...arr])
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
        } else {
          setSortExplanation(`${arr[j]} >= ${pivot}, so we'll leave it on the right side.`)
          await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
        }
      }

      // Highlight the pivot and its final position
      setHighlightIndices([i + 1, high])
      setSortExplanation(`Moving pivot ${pivot} to its correct position between smaller and larger elements.`)
      await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

      setSortExplanation(
        `Partition complete: Elements < ${pivot} are on the left, elements > ${pivot} are on the right.`,
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return i + 1
    }

    const sort = async (arr: number[], low: number, high: number) => {
      if (low < high) {
        setSortExplanation(`Sorting subarray from index ${low} to ${high}.`)
        await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))

        const pi = await partition(arr, low, high)

        // Explain the recursive calls
        setSortExplanation(`Now sorting the left subarray (elements < ${arr[pi]}).`)
        await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
        await sort(arr, low, pi - 1)

        setSortExplanation(`Now sorting the right subarray (elements > ${arr[pi]}).`)
        await new Promise((resolve) => setTimeout(resolve, 1000 - animationSpeed * 8))
        await sort(arr, pi + 1, high)
      }
    }

    await sort(newArray, 0, newArray.length - 1)

    // Final explanation
    setSortExplanation("Quick Sort complete! The array is now sorted.")
    setHighlightIndices([])
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSortExplanation(null)
    setIsAnimating(false)
  }

  const getMaxValue = () => {
    return Math.max(...array, 1)
  }

  return (
    <div>
      <div className="mb-8 relative">
        <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-lg p-4 flex items-end justify-center gap-2 overflow-hidden">
          <AnimatePresence>
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: `${(value / getMaxValue()) * 100}%`,
                  opacity: 1,
                  backgroundColor: highlightIndices.includes(index)
                    ? "rgb(249, 115, 22)"
                    : searchIndex === index
                      ? "rgb(249, 115, 22)"
                      : theme === "dark"
                        ? "rgb(56, 189, 248)"
                        : "rgb(14, 165, 233)",
                  scale: highlightIndices.includes(index) ? 1.05 : 1,
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.5,
                }}
                className={`w-12 rounded-t-md flex items-center justify-center text-white font-medium
                  ${
                    highlightIndices.includes(index)
                      ? "bg-orange-500"
                      : searchIndex === index
                        ? "bg-orange-500"
                        : "bg-sky-500 dark:bg-sky-400"
                  }`}
                whileHover={{ scale: 1.05 }}
                layout
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cloud-like explanation bubble */}
        <AnimatePresence>
          {sortExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg max-w-md z-10"
              style={{
                borderRadius: "18px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-slate-700 rotate-45"></div>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{sortExplanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

