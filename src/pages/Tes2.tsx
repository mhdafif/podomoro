"use client";

import {
  GripVertical,
  Music,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings,
  SkipForward,
  Star,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Task {
  id: string;
  title: string;
  status: "not-started" | "in-progress" | "done";
}

interface Playlist {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function PomodoroTaskManager() {
  // Timer and flow state
  const [currentFlow, setCurrentFlow] = useState(1); // 1-4
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timerState, setTimerState] = useState<
    "stopped" | "running" | "paused"
  >("stopped");
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(30);
  const [time, setTime] = useState(workMinutes * 60);
  const [completedFlows, setCompletedFlows] = useState<number[]>([]);

  // Update time when work/break minutes change and timer is stopped
  useEffect(() => {
    if (timerState === "stopped") {
      if (isWorkSession) {
        setTime(workMinutes * 60);
      } else {
        const isLongBreak = currentFlow === 4;
        setTime((isLongBreak ? longBreakMinutes : breakMinutes) * 60);
      }
    }
  }, [
    workMinutes,
    breakMinutes,
    longBreakMinutes,
    isWorkSession,
    currentFlow,
    timerState,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerState === "running" && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0 && timerState === "running") {
      // Timer completed
      if (isWorkSession) {
        // Work session completed
        setCompletedFlows((prev) => [...prev, currentFlow]);
        setIsWorkSession(false);
        const isLongBreak = currentFlow === 4;
        setTime((isLongBreak ? longBreakMinutes : breakMinutes) * 60);
      } else {
        // Break completed
        if (currentFlow < 4) {
          setCurrentFlow((prev) => prev + 1);
          setIsWorkSession(true);
          setTime(workMinutes * 60);
        } else {
          // All flows completed, reset
          setCurrentFlow(1);
          setIsWorkSession(true);
          setCompletedFlows([]);
          setTime(workMinutes * 60);
        }
      }
      setTimerState("stopped");
    }
    return () => clearInterval(interval);
  }, [
    timerState,
    time,
    isWorkSession,
    currentFlow,
    workMinutes,
    breakMinutes,
    longBreakMinutes,
  ]);

  const handleStart = () => {
    if (timerState === "stopped" || timerState === "paused") {
      setTimerState("running");
    } else {
      setTimerState("paused");
    }
  };

  const handleReset = () => {
    setTimerState("stopped");
    setIsWorkSession(true);
    setTime(workMinutes * 60);
  };

  const getStatusText = () => {
    if (timerState === "stopped") {
      return `Flow #${currentFlow}`;
    } else if (isWorkSession) {
      return "Focus";
    } else if (currentFlow === 4) {
      return "Long Break";
    } else {
      return "Break";
    }
  };

  const handleMinuteScroll = (
    type: "work" | "break" | "longBreak",
    delta: number
  ) => {
    if (timerState !== "stopped") return;

    if (type === "work") {
      setWorkMinutes((prev) => Math.max(1, Math.min(60, prev + delta)));
    } else if (type === "break") {
      setBreakMinutes((prev) => Math.max(1, Math.min(30, prev + delta)));
    } else {
      setLongBreakMinutes((prev) => Math.max(1, Math.min(60, prev + delta)));
    }
  };

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Generate project idea", status: "not-started" },
    { id: "2", title: "Develop project", status: "in-progress" },
    { id: "3", title: "Deploy project", status: "done" },
  ]);

  const foundersPicks: Playlist[] = [
    {
      id: "1",
      title: "Lofi programing",
      subtitle: "Best lofi for programers!!!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      title: "Work Music 2024",
      subtitle: "Working &amp; Chill - Office Hits - Clea...",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      title: "Coders' Playlist",
      subtitle: "Tune in with GeeksforGeeks.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  const recommendedPlaylists = [
    {
      id: "4",
      title: "Coding Music",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "5",
      title: "Work Music",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "6",
      title: "Focus Beats",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: "not-started",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  // const moveTask = (taskId: string, newStatus: Task["status"]) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === taskId ? { ...task, status: newStatus } : task
  //     )
  //   );
  // };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h1 className="mb-8 text-center text-2xl font-semibold">
          Pomodoro Task Manager
        </h1>

        {/* Main Content Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Timer Section */}
          <Card className="border-slate-700 bg-slate-800">
            <CardContent className="p-8">
              <div className="flex flex-col items-center">
                {/* Timer Circle with Progress Ring */}
                <div className="relative mb-8 h-64 w-64">
                  {/* Progress Ring SVG */}
                  <svg
                    className="absolute inset-0 h-full w-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgb(71 85 105)"
                      strokeWidth="2"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        isWorkSession ? "rgb(34 197 94)" : "rgb(59 130 246)"
                      }
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (time / (isWorkSession ? workMinutes * 60 : currentFlow === 4 && !isWorkSession ? longBreakMinutes * 60 : breakMinutes * 60))}`}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>

                  {/* Inner content */}
                  <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full border border-slate-600 bg-slate-800/50 backdrop-blur-sm">
                    {/* Editable Timer Display */}
                    <div className="mb-2 font-mono text-4xl font-bold">
                      {timerState === "stopped" && isWorkSession ? (
                        <div className="flex items-center gap-1">
                          <div
                            className="cursor-pointer rounded px-2 py-1 hover:bg-slate-700"
                            onWheel={(e) => {
                              e.preventDefault();
                              handleMinuteScroll("work", e.deltaY > 0 ? -1 : 1);
                            }}
                          >
                            {workMinutes.toString().padStart(2, "0")}
                          </div>
                          <span>:</span>
                          <span>00</span>
                        </div>
                      ) : timerState === "stopped" && !isWorkSession ? (
                        <div className="flex items-center gap-1">
                          <div
                            className="cursor-pointer rounded px-2 py-1 hover:bg-slate-700"
                            onWheel={(e) => {
                              e.preventDefault();
                              const isLongBreak = currentFlow === 4;
                              handleMinuteScroll(
                                isLongBreak ? "longBreak" : "break",
                                e.deltaY > 0 ? -1 : 1
                              );
                            }}
                          >
                            {(currentFlow === 4
                              ? longBreakMinutes
                              : breakMinutes
                            )
                              .toString()
                              .padStart(2, "0")}
                          </div>
                          <span>:</span>
                          <span>00</span>
                        </div>
                      ) : (
                        formatTime(time)
                      )}
                    </div>

                    <div className="mb-3 text-sm tracking-widest text-slate-400">
                      {getStatusText()}
                    </div>

                    {/* Flow indicator dots */}
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((flowNum) => {
                        const isCompleted = completedFlows.includes(flowNum);
                        const isCurrent = flowNum === currentFlow;
                        const isActive = isCurrent && timerState !== "stopped";

                        return (
                          <div
                            key={flowNum}
                            className={`rounded-full transition-all duration-300 ${
                              isCompleted
                                ? "h-2 w-2 bg-green-500"
                                : isActive
                                  ? "h-3 w-3 animate-pulse bg-blue-500"
                                  : isCurrent
                                    ? "h-2 w-2 bg-blue-500"
                                    : "h-1.5 w-1.5 bg-slate-500"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleStart}
                    className="text-slate-400 hover:text-white"
                  >
                    {timerState === "running" ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-white"
                      >
                        <Settings className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 border-slate-700 bg-slate-800 text-white">
                      <div className="space-y-4">
                        <h3 className="font-medium">Timer Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Work Duration</label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMinuteScroll("work", -1)}
                                disabled={timerState !== "stopped"}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center">
                                {workMinutes}m
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMinuteScroll("work", 1)}
                                disabled={timerState !== "stopped"}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Break Duration</label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMinuteScroll("break", -1)}
                                disabled={timerState !== "stopped"}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center">
                                {breakMinutes}m
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMinuteScroll("break", 1)}
                                disabled={timerState !== "stopped"}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">
                              Long Break Duration
                            </label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleMinuteScroll("longBreak", -1)
                                }
                                disabled={timerState !== "stopped"}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center">
                                {longBreakMinutes}m
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleMinuteScroll("longBreak", 1)
                                }
                                disabled={timerState !== "stopped"}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white"
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spotify Section */}
          <Card className="border-slate-700 bg-slate-800">
            <CardContent className="p-6">
              {/* Spotify Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-green-500" />
                  <span className="text-lg font-medium">Spotify Playlists</span>
                </div>
                <Button className="rounded-full bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                  Sign in to Spotify →
                </Button>
              </div>

              {/* Founder's Picks */}
              <div className="mb-6">
                <div className="mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{"Founder's Picks"}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {foundersPicks.map((playlist) => (
                    <div key={playlist.id} className="text-center">
                      <div className="mx-auto mb-2 h-20 w-20 rounded-lg bg-slate-700"></div>
                      <div className="text-xs font-medium">
                        {playlist.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {playlist.subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Playlists */}
              <div className="mb-6">
                <div className="mb-4 font-medium">Recommended Playlists</div>
                <div className="flex gap-3">
                  {recommendedPlaylists.map((playlist) => (
                    <div key={playlist.id} className="text-center">
                      <div className="mb-1 h-16 w-16 rounded-lg bg-slate-700"></div>
                      <div className="text-xs">{playlist.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Playlist URL Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Or paste your Spotify playlist URL"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder-slate-400"
                />
                <Button className="bg-green-600 px-4 text-white hover:bg-green-700">
                  <Music className="mr-1 h-4 w-4" />
                  Load
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Board */}
        <Card className="border-slate-700 bg-slate-800">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Task Board</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="New task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTask()}
                  className="border-slate-600 bg-slate-700 text-white placeholder-slate-400"
                />
                <Button
                  onClick={addTask}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Task Columns */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Not Started */}
              <div>
                <div className="mb-4 text-sm font-medium tracking-wide text-slate-400 uppercase">
                  Not Started
                </div>
                <div className="space-y-3">
                  {getTasksByStatus("not-started").map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-pointer border-slate-600 bg-slate-700 transition-colors hover:bg-slate-600"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{task.title}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* In Progress */}
              <div>
                <div className="mb-4 text-sm font-medium tracking-wide text-slate-400 uppercase">
                  In Progress
                </div>
                <div className="space-y-3">
                  {getTasksByStatus("in-progress").map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-pointer border-slate-600 bg-slate-700 transition-colors hover:bg-slate-600"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{task.title}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Done */}
              <div>
                <div className="mb-4 text-sm font-medium tracking-wide text-slate-400 uppercase">
                  Done
                </div>
                <div className="space-y-3">
                  {getTasksByStatus("done").map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-pointer border-slate-600 bg-slate-700 transition-colors hover:bg-slate-600"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{task.title}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
