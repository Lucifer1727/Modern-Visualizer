"use client";

import DataStructureVisualizer from "@/components/data-structure-visualizer";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";
import { Meteors } from "@/components/magicui/meteors";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4 sm:p-8">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="w-full max-w-6xl ">
        <Meteors number={30} />
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">
          Data Structure Visualizer
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Visualize common data structures with interactive animations
        </p>
        <DataStructureVisualizer />
      </div>
    </main>
  );
}
