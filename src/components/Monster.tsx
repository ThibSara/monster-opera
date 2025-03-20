"use client";

import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import * as Tone from "tone";

const Monster = ({ onLoad }: { onLoad?: (splineApp: any) => void }) => {
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
    <div className="flex flex-col items-center justify-center">
      {/* Arc de cercle + base carrée */}
      <div className="relative w-[300px] h-[400px] flex items-center justify-center">
        {/* Arc de cercle */}
        <div className="absolute top-0 w-full h-[200px] bg-purple-700 rounded-t-full" />
        {/* Base carrée */}
        <div className="absolute bottom-0 w-full h-[200px] bg-purple-700 rounded-b-lg shadow-lg" />

        {/* Spline intégré */}
        <div className="absolute w-[250px] h-[250px]">
          <Spline
            scene="https://prod.spline.design/23hMdeQMRSlQ3qpj/scene.splinecode"
            onLoad={handleLoad}
          />
        </div>
      </div>

      {/*  
      <button
        onClick={toggleSingingMonster}
        className={`mt-6 px-6 py-3 rounded-full text-white font-bold transition-transform duration-200 transform hover:scale-105 shadow-md ${
          isSinging ? "bg-red-500" : "bg-purple-500"
        }`}
        disabled={!isLoaded}
      >
        {isSinging ? "🔇 Stop Singing" : "🎤 Sing"}
      </button>
      */}
    </div>
  );
};

export default Monster;
