"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoolMode } from "@/components/magicui/cool-mode";

interface ListNode {
  id: string;
  value: number;
}

export default function LinkedListVisualizer() {
  const [list, setList] = useState<ListNode[]>([
    { id: "1", value: 10 },
    { id: "2", value: 20 },
    { id: "3", value: 30 },
    { id: "4", value: 40 },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchIndex, setSearchIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addToHead = () => {
    const value = Number.parseInt(inputValue);
    if (!isNaN(value)) {
      setIsAnimating(true);
      const newNode = { id: Date.now().toString(), value };
      setList([newNode, ...list]);
      setInputValue("");
      setMessage(`Added ${value} to the head`);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setMessage(null), 2000);
      }, 500);
    }
  };

  const addToTail = () => {
    const value = Number.parseInt(inputValue);
    if (!isNaN(value)) {
      setIsAnimating(true);
      const newNode = { id: Date.now().toString(), value };
      setList([...list, newNode]);
      setInputValue("");
      setMessage(`Added ${value} to the tail`);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setMessage(null), 2000);
      }, 500);
    }
  };

  const removeFromHead = () => {
    if (list.length > 0) {
      setIsAnimating(true);
      const removedValue = list[0].value;
      setList(list.slice(1));
      setMessage(`Removed ${removedValue} from the head`);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setMessage(null), 2000);
      }, 500);
    } else {
      setMessage("List is empty");
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const removeFromTail = () => {
    if (list.length > 0) {
      setIsAnimating(true);
      const removedValue = list[list.length - 1].value;
      setList(list.slice(0, -1));
      setMessage(`Removed ${removedValue} from the tail`);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setMessage(null), 2000);
      }, 500);
    } else {
      setMessage("List is empty");
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const searchNode = () => {
    const value = Number.parseInt(searchValue);
    if (!isNaN(value)) {
      setIsAnimating(true);
      const index = list.findIndex((node) => node.value === value);
      setSearchIndex(index);
      if (index !== -1) {
        setMessage(`Found ${value} at position ${index}`);
      } else {
        setMessage(`${value} not found in the list`);
      }
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setSearchIndex(null);
          setMessage(null);
        }, 2000);
      }, 1500);
    }
  };

  const resetList = () => {
    setIsAnimating(true);
    setList([
      { id: "1", value: 10 },
      { id: "2", value: 20 },
      { id: "3", value: 30 },
      { id: "4", value: 40 },
    ]);
    setSearchIndex(null);
    setMessage("List reset to default");
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setMessage(null), 2000);
    }, 500);
  };

  // Calculate the node spacing based on container width and number of nodes
  const getNodeSpacing = () => {
    const nodeWidth = 60; // Width of each node
    const minSpacing = 80; // Minimum space between nodes

    const availableWidth = containerWidth - nodeWidth * list.length;
    const spacing = Math.max(
      minSpacing,
      availableWidth / Math.max(1, list.length - 1)
    );

    return Math.min(spacing, 120); // Cap the spacing at 120px
  };

  const nodeSpacing = getNodeSpacing();

  return (
    <div>
      <div className="mb-8">
        <div
          ref={containerRef}
          className="bg-slate-100 dark:bg-slate-900 rounded-lg p-6 h-64 flex items-center justify-center overflow-x-auto"
        >
          <div className="flex items-center justify-center min-w-max">
            <AnimatePresence>
              {list.map((node, index) => (
                <div
                  key={node.id}
                  className="flex flex-col items-center"
                  style={{
                    marginRight: index < list.length - 1 ? nodeSpacing : 0,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: searchIndex === index ? 1.1 : 1,
                      boxShadow:
                        searchIndex === index
                          ? "0 0 15px rgba(249, 115, 22, 0.8)"
                          : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={`w-14 h-14 rounded-md flex items-center justify-center text-white font-medium relative
                      ${
                        searchIndex === index
                          ? "bg-orange-500 dark:bg-orange-600"
                          : "bg-sky-500 dark:bg-sky-600"
                      }`}
                  >
                    {node.value}
                    {index === 0 && (
                      <div className="absolute -top-8 text-xs text-slate-600 dark:text-slate-400 font-normal whitespace-nowrap">
                        Head
                      </div>
                    )}
                    {index === list.length - 1 && (
                      <div className="absolute -top-8 text-xs text-slate-600 dark:text-slate-400 font-normal whitespace-nowrap">
                        Tail
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>

            {list.length === 0 && (
              <div className="text-slate-500 dark:text-slate-400 italic">
                Empty list
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Tabs defaultValue="add" className="mb-6">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="add">Add Node</TabsTrigger>
              <TabsTrigger value="remove">Remove Node</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter a value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={addToHead}
                  disabled={isAnimating || inputValue === ""}
                  className="flex-1"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add to Head
                </Button>
                <Button
                  onClick={addToTail}
                  disabled={isAnimating || inputValue === ""}
                  variant="secondary"
                  className="flex-1"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add to Tail
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="remove" className="space-y-4">
              <div className="flex gap-2">
                <CoolMode>
                  <Button
                    onClick={removeFromHead}
                    disabled={isAnimating || list.length === 0}
                    variant="outline"
                    className="flex-1"
                  >
                    <Minus className="mr-2 h-4 w-4" /> Remove from Head
                  </Button>
                </CoolMode>
                <CoolMode>
                  <Button
                    onClick={removeFromTail}
                    disabled={isAnimating || list.length === 0}
                    variant="outline"
                    className="flex-1"
                  >
                    <Minus className="mr-2 h-4 w-4" /> Remove from Tail
                  </Button>
                </CoolMode>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={searchNode}
                disabled={
                  isAnimating || searchValue === "" || list.length === 0
                }
                variant="secondary"
              >
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>

            <Button
              onClick={resetList}
              disabled={isAnimating}
              variant="outline"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
            {message && (
              <Alert className="mb-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <h4 className="font-medium text-slate-800 dark:text-white mb-2">
              About Linked Lists
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A linked list is a linear data structure where each element (node)
              contains a value and a reference (or pointer) to the next node.
              Unlike arrays, linked lists don&apos;t require contiguous memory
              allocation, allowing for efficient insertions and deletions.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Length
                </p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">
                  {list.length}
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Head Value
                </p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">
                  {list.length > 0 ? list[0].value : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Operations
              </p>
              <ul className="mt-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                <li>Add to head: O(1) time complexity</li>
                <li>Add to tail: O(1) time complexity</li>
                <li>Remove from head: O(1) time complexity</li>
                <li>Remove from tail: O(n) time complexity</li>
                <li>Search: O(n) time complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
