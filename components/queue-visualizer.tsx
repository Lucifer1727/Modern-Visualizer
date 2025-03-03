"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, RotateCcw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40])
  const [inputValue, setInputValue] = useState<string>("")
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [peekActive, setPeekActive] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const { theme } = useTheme()

  const enqueue = () => {
    const value = Number.parseInt(inputValue)
    if (!isNaN(value)) {
      setIsAnimating(true)
      setQueue([...queue, value])
      setInputValue("")
      setMessage(`Enqueued ${value} to the queue`)
      setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => setMessage(null), 2000)
      }, 500)
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      setIsAnimating(true)
      const dequeuedValue = queue[0]
      setQueue(queue.slice(1))
      setMessage(`Dequeued ${dequeuedValue} from the queue`)
      setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => setMessage(null), 2000)
      }, 500)
    } else {
      setMessage("Queue is empty")
      setTimeout(() => setMessage(null), 2000)
    }
  }

  const peek = () => {
    if (queue.length > 0) {
      setPeekActive(true)
      setMessage(`Front element is ${queue[0]}`)
      setTimeout(() => {
        setPeekActive(false)
        setTimeout(() => setMessage(null), 2000)
      }, 1500)
    } else {
      setMessage("Queue is empty")
      setTimeout(() => setMessage(null), 2000)
    }
  }

  const resetQueue = () => {
    setIsAnimating(true)
    setQueue([10, 20, 30, 40])
    setMessage("Queue reset to default")
    setTimeout(() => {
      setIsAnimating(false)
      setTimeout(() => setMessage(null), 2000)
    }, 500)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 order-2 md:order-1">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-6 h-64 flex items-center justify-center">
            <div className="w-full flex justify-center items-center relative h-32">
              <AnimatePresence>
                {queue.map((value, index) => (
                  <motion.div
                    key={`${index}-${value}-${queue.length}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: peekActive && index === 0 ? 1.05 : 1,
                      boxShadow:
                        peekActive && index === 0 ? "0 0 15px rgba(56, 189, 248, 0.8)" : "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.5,
                    }}
                    className={`w-16 h-16 mx-1 rounded-md flex items-center justify-center text-white font-medium
                      ${
                        peekActive && index === 0
                          ? "bg-orange-500 dark:bg-orange-600 z-10"
                          : "bg-sky-500 dark:bg-sky-600"
                      }`}
                    style={{
                      position: "relative",
                      zIndex: queue.length - index,
                    }}
                  >
                    {value}
                    {index === 0 && (
                      <div className="absolute -bottom-8 text-xs text-slate-600 dark:text-slate-400 font-normal">
                        Front ↑
                      </div>
                    )}
                    {index === queue.length - 1 && (
                      <div className="absolute -bottom-8 text-xs text-slate-600 dark:text-slate-400 font-normal">
                        Rear ↑
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Direction arrows */}
              <div className="absolute -top-8 left-0 right-0 flex justify-center">
                <div className="flex items-center text-slate-500 dark:text-slate-400">
                  <span className="text-xs mr-2">Dequeue</span>
                  <svg width="100" height="20" className="text-slate-400">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                    <line
                      x1="0"
                      y1="10"
                      x2="100"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </svg>
                  <span className="text-xs ml-2">Enqueue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 order-1 md:order-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Queue Operations</h3>

            {message && (
              <Alert className="mb-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter a value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={enqueue} disabled={isAnimating || inputValue === ""}>
                  <Plus className="mr-2 h-4 w-4" /> Enqueue
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={dequeue}
                  disabled={isAnimating || queue.length === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <Minus className="mr-2 h-4 w-4" /> Dequeue
                </Button>
                <Button
                  onClick={peek}
                  disabled={isAnimating || queue.length === 0}
                  variant="secondary"
                  className="flex-1"
                >
                  <Eye className="mr-2 h-4 w-4" /> Peek
                </Button>
              </div>

              <Button onClick={resetQueue} disabled={isAnimating} variant="outline" className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-slate-800 dark:text-white mb-2">About Queues</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A queue is a linear data structure that follows the First In, First Out (FIFO) principle. Elements are
                added at the rear and removed from the front of the queue.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Size</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">{queue.length}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Front Element</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">
                    {queue.length > 0 ? queue[0] : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

