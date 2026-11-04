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
    "You will see and hear instructions to pop a ball with a specific word. Each ball also has a corresponding picture.",
    <strong>Please make sure your computer volume is on.</strong>,
    "Click the arrow to begin!"
  ];

  const navigate = useNavigate();

  // Handle start game action
  const handleStartGame = () => {
    console.log("Starting Scrambled Script Round 3...");
    navigate(`/scrambled-script-play/game/3`);
  };

  return (
    <InstructionPage
      title="Scrambled Script - Round 3/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/scrambledScript/scrambledScriptRound3.svg"} 
      onStartGame={handleStartGame}
    />
  );
}

export default ScrambledScriptInstructionPage;
