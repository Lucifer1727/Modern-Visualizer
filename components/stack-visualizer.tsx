"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([40, 30, 20, 10]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [peekActive, setPeekActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { theme } = useTheme();

  const push = () => {
    const value = Number.parseInt(inputValue);
    if (!isNaN(value)) {
      setIsAnimating(true);
      setStack([...stack, value]);
      setInputValue("");
      setMessage(`Pushed ${value} onto the stack`);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setMessage(null), 2000);
      }, 500);
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      setIsAnimating(true);
      const poppedValue = stack[stack.length - 1];
      setStack(stack.slice(0, -1));
      setMessage(`Popped ${poppedValue} from the stack`);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setMessage(null), 2000);
      }, 500);
    } else {
      setMessage("Stack is empty");
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const peek = () => {
    if (stack.length > 0) {
      setPeekActive(true);
      setMessage(`Top element is ${stack[stack.length - 1]}`);
      setTimeout(() => {
        setPeekActive(false);
        setTimeout(() => setMessage(null), 2000);
      }, 1500);
    } else {
      setMessage("Stack is empty");
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const resetStack = () => {
    setIsAnimating(true);
    setStack([40, 30, 20, 10]);
    setMessage("Stack reset to default");
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setMessage(null), 2000);
    }, 500);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 order-2 md:order-1">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-6 h-96 flex flex-col justify-end items-center relative overflow-hidden">
            <div className="w-full max-w-xs flex flex-col-reverse items-center overflow-y-auto max-h-80 pb-2">
              <AnimatePresence>
                {stack.map((value, index) => (
                  <motion.div
                    key={`${index}-${value}-${stack.length}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale:
                        peekActive && index === stack.length - 1 ? 1.05 : 1,
                      boxShadow:
                        peekActive && index === stack.length - 1
                          ? "0 0 15px rgba(56, 189, 248, 0.8)"
                          : "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.5,
                    }}
                    className={`w-full p-4 mb-2 rounded-md flex items-center justify-center text-white font-medium
                      ${
                        peekActive && index === stack.length - 1
                          ? "bg-orange-500 dark:bg-orange-600 z-10"
                          : "bg-sky-500 dark:bg-sky-600"
                      }`}
                    style={{
                      position: "relative",
                      zIndex: stack.length - index,
                    }}
                  >
                    {value}
                    {index === stack.length - 1 && (
                      <div className="absolute -right-20 text-xs text-slate-600 dark:text-slate-400 font-normal">
                        ← Top
                      </div>
                    )}
                    {index === 0 && (
                      <div className="absolute -right-20 text-xs text-slate-600 dark:text-slate-400 font-normal">
                        ← Bottom
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex-1 order-1 md:order-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              Stack Operations
            </h3>

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
                <Button
                  onClick={push}
                  disabled={isAnimating || inputValue === ""}
                >
                  <Plus className="mr-2 h-4 w-4" /> Push
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={pop}
                  disabled={isAnimating || stack.length === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <Minus className="mr-2 h-4 w-4" /> Pop
                </Button>
                <Button
                  onClick={peek}
                  disabled={isAnimating || stack.length === 0}
                  variant="secondary"
                  className="flex-1"
                >
                  <Eye className="mr-2 h-4 w-4" /> Peek
                </Button>
              </div>

              <Button
                onClick={resetStack}
                disabled={isAnimating}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-slate-800 dark:text-white mb-2">
                About Stacks
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A stack is a linear data structure that follows the Last In,
                First Out (LIFO) principle. Elements are added and removed from
                the same end, called the "top" of the stack.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Size
                  </p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">
                    {stack.length}
                  </p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Top Element
                  </p>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">
                    {stack.length > 0 ? stack[stack.length - 1] : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
