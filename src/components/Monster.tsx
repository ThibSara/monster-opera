"use client";

import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import * as Tone from "tone";
import { PlayIcon } from "@heroicons/react/24/solid";

const Monster = ({
  splineScene,
  primaryColor,
  secondaryColor,
  onLoad,
}: {
  splineScene: string;
  primaryColor: string;
  secondaryColor: string;
  onLoad?: (splineApp: any) => void;
}) => {
  const splineRef = useRef<any>(null);
  const monsterRef = useRef<any>(null);
  const [isSinging, setIsSinging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const synthRef = useRef(new Tone.Synth().toDestination());

  const startSinging = async () => {
    if (!isSinging) {
      await Tone.start();
      synthRef.current.triggerAttack("C4");
      setIsSinging(true);
    }
  };

  const stopSinging = () => {
    synthRef.current.triggerRelease();
    setIsSinging(false);
  };

  const handleLoad = (splineApp: any) => {
    splineRef.current = splineApp;
    const monster = splineApp.findObjectByName("Monster");
    if (monster) {
      monsterRef.current = monster;
      splineApp.addEventListener("mouseDown", (e: any) => {
        if (e.target.name === "Monster") startSinging();
      });
      splineApp.addEventListener("mouseUp", (e: any) => {
        if (e.target.name === "Monster") stopSinging();
      });
    }
    setIsLoaded(true);
    onLoad?.(splineApp);
  };

  const toggleSingingMonster = () => {
    if (monsterRef.current) {
      isSinging ? stopSinging() : startSinging();
      splineRef.current.emitEvent(
        isSinging ? "mouseUp" : "mouseDown",
        "Monster"
      );
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Conteneur avec un dégradé fluide */}
      <div
        className="relative w-[300px] h-[400px] rounded-t-full rounded-b-lg shadow-lg overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${primaryColor}AA,${secondaryColor}DD , ${primaryColor})`,
        }}
      >
        {/* Spline intégré */}
        <div className="absolute bottom-0 w-[300px] h-[350px]">
          <Spline
            scene="https://prod.spline.design/23hMdeQMRSlQ3qpj/scene.splinecode"
            onLoad={handleLoad}
          />
        </div>
      </div>

      <button
        onClick={toggleSingingMonster}
        className={`mt-6 px-3 py-3 rounded-full flex ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-transform duration-200 transform hover:scale-105 items-center justify-center`}
        disabled={!isLoaded}
      >
        <PlayIcon
          className={`w-6 h-6  ${
            isSinging ? "text-gray-500" : "text-gray-300"
          }`}
        />
      </button>
    </div>
  );
};

export default Monster;
