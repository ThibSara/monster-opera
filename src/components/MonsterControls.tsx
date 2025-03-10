"use client";
import { Howl } from "howler";
import { useState } from "react";

export default function MonsterControls() {
  const [sound] = useState(
    () =>
      new Howl({
        src: ["/bells.mp3"], // Assurez-vous que le fichier est bien dans public/
      })
  );

  const playSound = () => {
    console.log("playSound");
    sound.play();
  };

  return (
    <button
      onClick={playSound}
      className="p-4 bg-purple-500 rounded-sm text-white mt-4"
    >
      🎵 Faire chanter le monstre
    </button>
  );
}
