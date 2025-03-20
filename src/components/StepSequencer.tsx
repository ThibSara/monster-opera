"use client";
import React, { useState } from "react";
import * as Tone from "tone";
import { PlayIcon, SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";

const StepSequencer = () => {
  const [bpm, setBpm] = useState(100);
  const [kickSequence, setKickSequence] = useState(Array(16).fill(false));
  const [snareSequence, setSnareSequence] = useState(Array(16).fill(false));
  const [tomSequence, setTomSequence] = useState(Array(16).fill(false));
  const [hihatSequence, setHihatSequence] = useState(Array(16).fill(false));

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const kick = new Tone.MembraneSynth().toDestination();
  const snare = new Tone.NoiseSynth({ volume: -10 }).toDestination();
  const tom = new Tone.MembraneSynth().toDestination();
  const hithat = new Tone.MembraneSynth().toDestination();

  const toggleBeat = (
    sequenceSetter: React.Dispatch<React.SetStateAction<boolean[]>>,
    index: number
  ) => {
    sequenceSetter((prevSequence) =>
      prevSequence.map((beat, i) => (i === index ? !beat : beat))
    );
  };

  const startSequencer = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    let step = 0;

    Tone.Transport.scheduleRepeat((time) => {
      setCurrentStep(step);
      if (kickSequence[step]) kick.triggerAttackRelease("C1", "8n", time);
      if (snareSequence[step]) snare.triggerAttackRelease("16n", time);
      if (tomSequence[step]) tom.triggerAttackRelease("C2", "8n", time);
      if (hihatSequence[step]) hithat.triggerAttackRelease("C3", "8n", time);
      step = (step + 1) % 16;
    }, "16n");

    Tone.Transport.start();
    setIsPlaying(true);
  };

  const stopSequencer = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const randomizeSequence = (
    setSequence: React.Dispatch<React.SetStateAction<boolean[]>>
  ): void => {
    const newSequence = Array.from({ length: 16 }, () => Math.random() > 0.5);
    setSequence(newSequence);
  };

  const clearSequence = (
    setSequence: React.Dispatch<React.SetStateAction<boolean[]>>
  ): void => {
    setSequence(Array(16).fill(false));
  };

  return (
    <div className="text-black pb-12 text-center space-y-4 px-8 lg:px-12 flex flex-col items-center justify-center w-full max-w-[914px] mx-auto">
      <div className="flex items-center justify-between w-full">
        <div className="text-3xl bg-red-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🥁
        </div>
        <div className="flex justify-center space-x-2">
          {kickSequence.map((beat, index) => (
            <button
              key={`kick-${index}`}
              onClick={() => toggleBeat(setKickSequence, index)}
              className={`w-10 h-10 rounded-md transition hover:scale-110 ${
                beat
                  ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                  : "bg-gray-200"
              } ${index === currentStep ? "scale-110" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="text-3xl bg-orange-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🪇
        </div>
        <div className="flex justify-center space-x-2">
          {tomSequence.map((beat, index) => (
            <button
              key={`tom-${index}`}
              onClick={() => toggleBeat(setTomSequence, index)}
              className={`w-10 h-10 rounded-md transition hover:scale-110 ${
                beat
                  ? "bg-orange-400 shadow-lg shadow-orange-500/50"
                  : "bg-gray-200"
              } ${index === currentStep ? "scale-110" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="text-2xl bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🎹
        </div>
        <div className="flex justify-center space-x-2">
          {snareSequence.map((beat, index) => (
            <button
              key={`snare-${index}`}
              onClick={() => toggleBeat(setSnareSequence, index)}
              className={`w-10 h-10 rounded-md transition hover:scale-110 ${
                beat
                  ? "bg-purple-500 shadow-lg shadow-purple-500/50"
                  : "bg-gray-200"
              } ${index === currentStep ? "scale-110" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="text-2xl bg-teal-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🎺
        </div>
        <div className="flex justify-center space-x-2">
          {hihatSequence.map((beat, index) => (
            <button
              key={`hithat-${index}`}
              onClick={() => toggleBeat(setHihatSequence, index)}
              className={`w-10 h-10 rounded-md transition hover:scale-110 ${
                beat
                  ? "bg-teal-400 shadow-lg shadow-teal-500/50"
                  : "bg-gray-200"
              } ${index === currentStep ? "scale-110" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full max-w-[860px] mx-auto gap-6 mt-6">
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={isPlaying ? stopSequencer : startSequencer}
            className={`px-3 py-3 rounded-full flex ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-transform duration-200 transform hover:scale-105 items-center justify-center`}
          >
            <PlayIcon
              className={`w-6 h-6 ${
                isPlaying ? "text-green-500" : "text-gray-300"
              }`}
            />
          </button>
          <button
            onClick={() => {
              stopSequencer();
              randomizeSequence(setKickSequence);
              randomizeSequence(setTomSequence);
              randomizeSequence(setSnareSequence);
              randomizeSequence(setHihatSequence);
            }}
            className={`px-3 py-3 rounded-full flex ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-transform duration-200 transform hover:scale-105 items-center justify-center`}
          >
            <SparklesIcon
              className={`w-6 h-6 text-gray-300
              }`}
            />
          </button>
          <button
            onClick={() => {
              stopSequencer();
              clearSequence(setKickSequence);
              clearSequence(setTomSequence);
              clearSequence(setSnareSequence);
              clearSequence(setHihatSequence);
            }}
            className={`px-3 py-3 rounded-full flex ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-transform duration-200 transform hover:scale-105 items-center justify-center`}
          >
            <TrashIcon className={`w-6 h-6 text-gray-300  }`} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="60"
            max="200"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="relative w-[80px] text-center rounded-full px-2 py-1 text-xs text-gray-600 ring-1 ring-gray-900/10">
            {bpm} BPM
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSequencer;
