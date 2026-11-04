import React from 'react';
import InstructionPage from '../../components/InstructionPage';
import { useNavigate, useParams } from 'react-router-dom';


/**
 * ColorClashInstructionPage Component
 * Round 1/4 instruction page for Color Clash
 * Uses the reusable InstructionPage component
 */
function ScrambledScriptInstructionPage() {
  // Instruction content for Round 1
  const instructions = [
    "In this round, you will have 30 seconds to pop as many balls as possible.",
    "The words on the balls are rewritten to demonstrate the challenges people with dyslexia can face when reading. Each ball also has a corresponding picture.",
    <strong>Please make sure your computer volume is on.</strong>,
    "Click the arrow to begin!"
  ];

  const navigate = useNavigate();

  // Handle start game action
  const handleStartGame = () => {
    console.log("Starting Scrambled Script Round 4...");
    navigate(`/scrambled-script-play/game/4`);
  };

  return (
    <InstructionPage
      title="Scrambled Script - Round 4/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/scrambledScript/scrambledScriptRound4.svg"} 
      onStartGame={handleStartGame}
    />
  );
}

export default ScrambledScriptInstructionPage;
