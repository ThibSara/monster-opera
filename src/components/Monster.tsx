"use client";

import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import * as Tone from "tone";

const Monster = ({ onLoad }: { onLoad?: (splineApp: any) => void }) => {
  // Références pour Spline et l'objet Monster
  const splineRef = useRef<any>(null);
  const monsterRef = useRef<any>(null);

  // États
  const [isSinging, setIsSinging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Synthétiseur pour le son
  const synthRef = useRef(new Tone.Synth().toDestination());

  // Fonctions de gestion du son
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

  // Gestion du chargement de Spline
  const handleLoad = (splineApp: any) => {
    splineRef.current = splineApp;
    const monster = splineApp.findObjectByName("Monster");

    if (monster) {
      monsterRef.current = monster;

      // Événements de clic pour chanter
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

  // Gestion du chant via bouton
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
      </div>
    </div>
  );
};

export default Monster;
