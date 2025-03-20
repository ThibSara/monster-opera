"use client";
import React, { useState } from "react";
import * as Tone from "tone";

const StepSequencer = () => {
  const [bpm, setBpm] = useState(100);
  const [kickSequence, setKickSequence] = useState(Array(16).fill(false));
  const [snareSequence, setSnareSequence] = useState(Array(16).fill(false));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Synthétiseurs
  const kick = new Tone.MembraneSynth().toDestination();
  const snare = new Tone.NoiseSynth({ volume: -10 }).toDestination();

  // Fonction pour activer/désactiver une case de la séquence
  const toggleBeat = (
    sequenceSetter: React.Dispatch<React.SetStateAction<boolean[]>>,
    index: number
  ) => {
    sequenceSetter((prevSequence) =>
      prevSequence.map((beat, i) => (i === index ? !beat : beat))
    );
  };

  // Fonction pour démarrer la séquence
  const startSequencer = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = bpm;

    let step = 0;

    Tone.Transport.scheduleRepeat((time) => {
      setCurrentStep(step);

      if (kickSequence[step]) {
        kick.triggerAttackRelease("C1", "8n", time);
      }
      if (snareSequence[step]) {
        snare.triggerAttackRelease("16n", time);
      }

      step = (step + 1) % 16;
    }, "16n");

    Tone.Transport.start();
    setIsPlaying(true);
  };

  // Fonction pour arrêter la séquence
  const stopSequencer = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="bg-[#28282c] p-10 text-white text-center">
      <h1 className="text-xl mb-4">Step Sequencer</h1>

      {/* KICK ROW */}
      <p className="text-lg mb-2">KICK</p>
      <div className="flex justify-center space-x-2">
        {kickSequence.map((beat, index) => (
          <button
            key={`kick-${index}`}
            onClick={() => toggleBeat(setKickSequence, index)}
            className={`w-10 h-10 rounded-md border-2 transition ${
              beat
                ? "bg-blue-500 border-blue-700"
                : "bg-gray-700 border-gray-500"
            } ${index === currentStep ? "border-white scale-105" : ""}`}
          />
        ))}
      </div>

      {/* SNARE ROW */}
      <p className="text-lg mt-4 mb-2">SNARE</p>
      <div className="flex justify-center space-x-2">
        {snareSequence.map((beat, index) => (
          <button
            key={`snare-${index}`}
            onClick={() => toggleBeat(setSnareSequence, index)}
            className={`w-10 h-10 rounded-md border-2 transition ${
              beat ? "bg-red-500 border-red-700" : "bg-gray-700 border-gray-500"
            } ${index === currentStep ? "border-white scale-105" : ""}`}
          />
        ))}
      </div>

      {/* CONTROLS */}
      <div className="mt-6">
        <button
          className="bg-green-500 px-4 py-2 rounded-md mr-4"
          onClick={isPlaying ? stopSequencer : startSequencer}
        >
          {isPlaying ? "STOP" : "PLAY"}
        </button>
      </div>
    </div>
  );
};

export default StepSequencer;
