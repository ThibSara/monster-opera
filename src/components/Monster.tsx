"use client";
import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";

const Monster = ({ onLoad }: { onLoad?: (splineApp: any) => void }) => {
  const splineRef = useRef<any>(null);
  const monsterRef = useRef<any>(null);
  const [isSinging, setIsSinging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (splineApp: any) => {
    splineRef.current = splineApp;

    const monster = splineApp.findObjectByName("Monster");
    if (monster) {
      monsterRef.current = monster;
    }

    setIsLoaded(true);

    if (onLoad) {
      onLoad(splineApp);
    }
  };

  const removeMonster = () => {
    if (monsterRef.current) {
      splineRef.current.emitEvent("keyUp", "Monster");
    }
  };

  const walkingAnimation = () => {
    if (monsterRef.current) {
      splineRef.current.emitEvent("keyDown", "Monster");
    }
  };

  const toggleSingingMonster = () => {
    if (monsterRef.current) {
      if (isSinging) {
        splineRef.current.emitEvent("mouseUp", "Monster");
      } else {
        splineRef.current.emitEvent("mouseDown", "Monster");
      }
      setIsSinging(!isSinging);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Spline
        scene="https://prod.spline.design/23hMdeQMRSlQ3qpj/scene.splinecode"
        onLoad={handleLoad}
      />
      <div>
        <button
          onClick={toggleSingingMonster}
          className={`mt-10 p-4 rounded-sm text-white ${
            isSinging ? "bg-red-500" : "bg-purple-500"
          }`}
          disabled={!isLoaded}
        >
          {isSinging ? "🔇 Stop Singing" : "🎤 Sing"}
        </button>
        <button
          onClick={removeMonster}
          className="mx-4 p-4 bg-purple-500 rounded-sm text-white mt-4"
          disabled={!isLoaded}
        >
          Remove Monster
        </button>
        <button
          onClick={walkingAnimation}
          className="mx-4 p-4 bg-purple-500 rounded-sm text-white mt-4"
          disabled={!isLoaded}
        >
          Walking Animation
        </button>
      </div>
    </div>
  );
};

export default Monster;
