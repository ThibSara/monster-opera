"use client";
import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { PlayIcon, SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";

const StepSequencer = () => {
  const [bpm, setBpm] = useState(100);
  const [kickSequence, setKickSequence] = useState(Array(16).fill(false));
  const [maracasSequence, setmaracasSequence] = useState(Array(16).fill(false));
  const [pianoSequence, setpianoSequence] = useState(Array(16).fill(false));
  const [trumpetSequence, settrumpetSequence] = useState(Array(16).fill(false));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const kickRef = useRef<Tone.MembraneSynth | null>(null);
  const maracasRef = useRef<Tone.NoiseSynth | null>(null);
  const pianoRef = useRef<Tone.PolySynth | null>(null);
  const trumpetRef = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    kickRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 2,
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.15 },
    }).toDestination();

    maracasRef.current = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.02 },
    }).toDestination();
    const highpass = new Tone.Filter(7000, "highpass").toDestination();
    maracasRef.current.connect(highpass);

    pianoRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.5, release: 0.5 },
    }).toDestination();
    pianoRef.current.volume.value = -3;

    trumpetRef.current = new Tone.Synth({}).toDestination();
  }, []);

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

      if (kickSequence[step] && kickRef.current)
        kickRef.current.triggerAttackRelease("C2", "8n", time);
      if (maracasSequence[step] && maracasRef.current)
        maracasRef.current.triggerAttackRelease("16n", time);
      if (pianoSequence[step] && pianoRef.current)
        pianoRef.current.triggerAttackRelease(["C4"], "8n", time);
      if (trumpetSequence[step] && trumpetRef.current)
        trumpetRef.current.triggerAttackRelease("G4", "8n", time);

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
        <div className="text-3xl bg-purple-500  w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🎹
        </div>
        <div className="flex justify-center space-x-2">
          {pianoSequence.map((beat, index) => (
            <button
              key={`piano-${index}`}
              onClick={() => toggleBeat(setpianoSequence, index)}
              className={`w-10 h-10 rounded-md transition hover:scale-110 ${
                beat
                  ? "bg-purple-400 shadow-lg shadow-purple-500/50"
                  : "bg-gray-200"
              } ${index === currentStep ? "scale-110" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="text-2xl bg-orange-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🪇
        </div>
        <div className="flex justify-center space-x-2">
          {maracasSequence.map((beat, index) => (
            <button
              key={`maracas-${index}`}
              onClick={() => toggleBeat(setmaracasSequence, index)}
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
        <div className="text-2xl bg-teal-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
          🎺
        </div>
        <div className="flex justify-center space-x-2">
          {trumpetSequence.map((beat, index) => (
            <button
              key={`hithat-${index}`}
              onClick={() => toggleBeat(settrumpetSequence, index)}
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
                isPlaying ? "text-gray-500" : "text-gray-300"
              }`}
            />
          </button>
          <button
            onClick={() => {
              stopSequencer();
              randomizeSequence(setKickSequence);
              randomizeSequence(setpianoSequence);
              randomizeSequence(setmaracasSequence);
              randomizeSequence(settrumpetSequence);
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
              clearSequence(setpianoSequence);
              clearSequence(setmaracasSequence);
              clearSequence(settrumpetSequence);
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
            className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#9198EE]"
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
