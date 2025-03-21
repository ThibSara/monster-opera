import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import * as Tone from "tone";
import { PlayIcon, UserIcon } from "@heroicons/react/24/solid";

interface SplineApp {
  findObjectByName: (name: string) => SplineObject | undefined;
  addEventListener: (
    event: "mouseDown" | "mouseUp",
    callback: (e: SplineMouseEvent) => void
  ) => void;
  emitEvent: (event: "mouseDown" | "mouseUp", target: string) => void;
}

interface SplineObject {
  name: string;
}

interface SplineMouseEvent {
  target?: SplineObject;
}

const MonstersData = [
  {
    name: "lightPink",
    splineScene: "https://prod.spline.design/t5rPvTskrn0XcHle/scene.splinecode",
    note: "C4",
  },
  {
    name: "green",
    splineScene: "https://prod.spline.design/Ns459JO31sv0ddXQ/scene.splinecode",
    note: "G3",
  },
  {
    name: "purple",
    splineScene: "https://prod.spline.design/xwHUxlsC29rRs69F/scene.splinecode",
    note: "A4",
  },
  {
    name: "blue",
    splineScene: "https://prod.spline.design/9JoIKqBk9UDhyJgm/scene.splinecode",
    note: "D4",
  },
  {
    name: "orange",
    splineScene: "https://prod.spline.design/23hMdeQMRSlQ3qpj/scene.splinecode",
    note: "C2",
  },
  {
    name: "yellow",
    splineScene: "https://prod.spline.design/23hMdeQMRSlQ3qpj/scene.splinecode",
    note: "A3",
  },
  {
    name: "pink",
    splineScene: "https://prod.spline.design/Th0IJT7LnEKBq2Md/scene.splinecode",
    note: "B3",
  },
];

const Monster = ({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  name,
}: {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  name: string;
}) => {
  const splineRef = useRef<SplineApp | null>(null);
  const monsterRef = useRef<SplineObject | null>(null);
  const [isSinging, setIsSinging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(
    MonstersData.findIndex((monster) => monster.name === name) || 0
  );

  const synthRef = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    synthRef.current = new Tone.Synth().toDestination();

    return () => {
      synthRef.current?.dispose();
    };
  }, []);

  const currentMonster = MonstersData[currentMonsterIndex];
  if (!currentMonster) return null;

  const startSinging = async () => {
    if (!isSinging) {
      await Tone.start();
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      synthRef.current = new Tone.Synth().toDestination();
      synthRef.current.triggerAttack(currentMonster.note);
      setIsSinging(true);
    }
  };

  const stopSinging = () => {
    if (synthRef.current) {
      synthRef.current.triggerRelease();
    }
    setIsSinging(false);
  };

  const handleLoad = (splineApp: SplineApp) => {
    if (!splineApp) return;

    splineRef.current = splineApp;

    const monster = splineApp.findObjectByName("Monster");
    if (monster) {
      monsterRef.current = monster;

      splineApp.addEventListener("mouseDown", (e: SplineMouseEvent) => {
        if (e.target?.name === "Monster") startSinging();
      });

      splineApp.addEventListener("mouseUp", (e: SplineMouseEvent) => {
        if (e.target?.name === "Monster") stopSinging();
      });
    }

    setIsLoaded(true);
  };

  const toggleSingingMonster = () => {
    if (monsterRef.current) {
      if (isSinging) {
        stopSinging();
        splineRef.current?.emitEvent("mouseUp", "Monster");
      } else {
        startSinging();
        splineRef.current?.emitEvent("mouseDown", "Monster");
      }
    }
  };

  const changeScene = () => {
    stopSinging();
    setCurrentMonsterIndex(
      (prevIndex) => (prevIndex + 1) % MonstersData.length
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className="relative w-[300px] h-[400px] rounded-t-full rounded-b-lg shadow-lg overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${primaryColor}AA, ${secondaryColor}DD, ${tertiaryColor})`,
        }}
      >
        <div className="absolute bottom-0 w-[300px] h-[350px]">
          <Spline scene={currentMonster.splineScene} onLoad={handleLoad} />
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <button
          onClick={toggleSingingMonster}
          className={`mt-6 px-3 py-3 rounded-full flex ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-transform duration-200 transform hover:scale-105 items-center justify-center`}
          disabled={!isLoaded}
        >
          <PlayIcon
            className={`w-6 h-6 ${
              isSinging ? "text-gray-500" : "text-gray-300"
            }`}
          />
        </button>
        <button
          onClick={changeScene}
          className={`mt-6 px-3 py-3 rounded-full flex ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-transform duration-200 transform hover:scale-105 items-center justify-center`}
        >
          <UserIcon className="w-6 h-6 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Monster;
