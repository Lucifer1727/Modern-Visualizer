"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import ArrayVisualizer from "@/components/array-visualizer"
import StackVisualizer from "@/components/stack-visualizer"
import QueueVisualizer from "@/components/queue-visualizer"
import LinkedListVisualizer from "@/components/linked-list-visualizer"

export default function DataStructureVisualizer() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("array")

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Data Structure Operations</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <Tabs defaultValue="array" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="array">Array</TabsTrigger>
          <TabsTrigger value="stack">Stack</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="linkedlist">Linked List</TabsTrigger>
        </TabsList>

        <TabsContent value="array">
          <ArrayVisualizer />
        </TabsContent>

        <TabsContent value="stack">
          <StackVisualizer />
        </TabsContent>

        <TabsContent value="queue">
          <QueueVisualizer />
        </TabsContent>

        <TabsContent value="linkedlist">
          <LinkedListVisualizer />
        </TabsContent>
      </Tabs>
    </div>
  )
}

