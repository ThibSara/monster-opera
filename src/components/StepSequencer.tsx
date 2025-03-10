"use client"
import React, { useState } from 'react';
import "./style.css"

const StepSequencer = () => {
  const [bpm, setBpm] = useState(100);
  const [sequence, setSequence] = useState({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hihat: Array(16).fill(false),
    clap: Array(16).fill(false),
    shake: Array(16).fill(false),
    fing: Array(16).fill(false),
    rim: Array(16).fill(false),
    tom: Array(16).fill(false),
  });

  const toggleBeat = (instrument: string, index: number) => {
    setSequence((prevSequence) => {
      return {
        ...prevSequence,
        [instrument]: prevSequence[instrument].map((beat, i) =>
          i === index ? !beat : beat
        ),
      };
    });
  };

  const changeBpm = (increment: boolean) => {
    setBpm((prevBpm) => (increment ? prevBpm + 10 : prevBpm - 10));
  };

  const renderBeats = (instrument: string) => {
    return sequence[instrument].map((beat, index) => (
      <button
        key={`${instrument}-${index}`}
        onClick={() => toggleBeat(instrument, index)}
        className={`w-12 h-12 mx-1 my-1 rounded-lg shadow-md transition-transform transition-color duration-200  ${
          beat ? "bg-blue-500 inset-shadow-blue-100 border-blue-700" : "bg-[#36363c] border-gray-600" 
        } hover:border-white hover:scale-105`}
      />
    ));
  };
  

  return (
    <div style={{ fontFamily: 'Quicksand, sans-serif', textAlign: 'center', color: 'white', backgroundColor: '#28282c' }}>
      <p style={{ position: 'absolute', top: '0px', right: '10px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
        <a href="http://portfolio.planetcode.fr/" target="_blank" title="Samples et programmation par Jean-Eudes Nouaille-Degorce" style={{ textDecoration: 'none', color: 'grey' }}>
          planetcode.fr
        </a>
      </p>

      <section className="sequencer">

        <div className="drums">
          {/* Labels */}
          <div className="label-box-1">
            {['Kick', 'Snare', 'Hihat', 'Clap', 'Shake', 'Fing', 'Rim', 'Tom'].map((label) => (
              <p key={label} className="labels">{label}</p>
            ))}
          </div>

          {/* Drums */}
          {['kick', 'snare', 'hihat', 'clap', 'shake', 'fing', 'rim', 'tom'].map((instrument) => (
            <div key={instrument} className={instrument}>
              {renderBeats(instrument)}
            </div>
          ))}
        </div>

        <button className="control-button" onClick={() => {}}>PLAY</button>
        <button className="control-button" onClick={() => {}}>STOP</button>

        <input
          type="text"
          id="change_bpm"
          placeholder={bpm.toString()}
          className="control-bpm"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />

        <button className="control-button" onClick={() => changeBpm(true)}>BPM+</button>
        <button className="control-button" onClick={() => changeBpm(false)}>BPM-</button>
      </section>
    </div>
  );
};

export default StepSequencer;
