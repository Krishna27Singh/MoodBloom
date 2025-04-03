import React, { useState, useEffect, useRef } from "react";
import "./Breathing.css"; // Import CSS for styling

const breathingTechniques = [
  { name: "Box Breathing", cycle: [4, 4, 4, 4] }, // Inhale 4s, Hold 4s, Exhale 4s, Hold 4s
  { name: "4-7-8 Breathing", cycle: [4, 7, 8, 0] }, // Inhale 4s, Hold 7s, Exhale 8s, No Hold
  { name: "Alternate Nostril Breathing", cycle: [5, 5, 5, 5] }, // Equal 5s for all steps
  { name: "Equal Breathing", cycle: [4, 4, 4, 4] }, // All steps equal
];

export default function Breathing() {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (selectedTechnique && !isPaused) {
      clearInterval(timerRef.current);

      let currentCycle = selectedTechnique.cycle;
      let index = stepIndex;
      let duration = currentCycle[index];
      setCounter(duration);

      timerRef.current = setInterval(() => {
        setCounter((prev) => {
          if (prev > 1) return prev - 1;

          index = (index + 1) % currentCycle.length;
          setStepIndex(index);
          return currentCycle[index];
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [selectedTechnique, isPaused, stepIndex]);

  const handlePauseResume = () => setIsPaused(!isPaused);

  const handleStop = () => {
    clearInterval(timerRef.current);
    setSelectedTechnique(null);
    setStepIndex(0);
    setCounter(0);
    setIsPaused(false);
  };

  const stepNames = ["Inhale", "Hold", "Exhale", "Hold"];

  return (
    <div className="breathing-container">
      <h1 className="title">Breathing Exercises</h1>
      <div className="techniques">
        {breathingTechniques.map((technique, index) => (
          <button
            key={index}
            className={`technique-button ${
              selectedTechnique?.name === technique.name ? "active" : ""
            }`}
            onClick={() => {
              clearInterval(timerRef.current);
              setSelectedTechnique(technique);
              setStepIndex(0);
              setCounter(technique.cycle[0]);
              setIsPaused(false);
            }}
          >
            {technique.name}
          </button>
        ))}
      </div>

      {selectedTechnique && (
        <div className="breathing-box">
          <h2>{selectedTechnique.name}</h2>
          <p className="step">{stepNames[stepIndex]}</p>
          <p className="counter">{counter}s</p>

          <div className="controls">
            <button className="control-button" onClick={handlePauseResume}>
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button className="control-button stop" onClick={handleStop}>
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}