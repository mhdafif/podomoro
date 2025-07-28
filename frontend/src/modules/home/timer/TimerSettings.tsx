import { Settings } from "lucide-react";

import UseTimer from "./UseTimer";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TimerSettings = () => {
  /*======================== Props ======================== */

  // const { timerState } = props;
  const { timerSetting, timerState, handleSetting, toggleAutoStart } =
    UseTimer();

  /*======================== Return ======================== */

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          disabled={timerState === "running"}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-slate-700 bg-slate-800 text-white">
        <div className="space-y-4">
          <h3 className="font-medium">Settings</h3>

          <div className="flex items-center justify-between">
            <label className="text-sm">Auto-start next session</label>
            <div className="flex items-center">
              {/* <input
                type="checkbox"
                checked={timerSetting.autoStart}
                onChange={toggleAutoStart}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              /> */}
              <Checkbox
                checked={timerSetting.autoStart}
                onCheckedChange={toggleAutoStart}
                className="size-5"
              />
            </div>
          </div>

          <div className="border-t border-slate-600 pt-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Work Duration</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetting("work", timerSetting.work - 5)}
                    disabled={timerSetting.work <= 5}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{timerSetting.work}m</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetting("work", timerSetting.work + 5)}
                    disabled={timerSetting.work >= 60}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Short Break Duration</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleSetting("shortBreak", timerSetting.shortBreak - 1)
                    }
                    disabled={timerSetting.shortBreak <= 5}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">
                    {timerSetting.shortBreak}m
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleSetting("shortBreak", timerSetting.shortBreak + 1)
                    }
                    disabled={timerSetting.shortBreak >= 15}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Long Break Duration</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleSetting("longBreak", timerSetting.longBreak - 5)
                    }
                    disabled={timerSetting.longBreak <= 20}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">
                    {timerSetting.longBreak}m
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleSetting("longBreak", timerSetting.longBreak + 5)
                    }
                    disabled={timerSetting.longBreak >= 60}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimerSettings;
