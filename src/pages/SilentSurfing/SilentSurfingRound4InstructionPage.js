import React from 'react';
import InstructionPage from '../../components/InstructionPage';
import { useNavigate } from 'react-router-dom';


/**
 * ColorClashInstructionPage Component
 * Round 1/4 instruction page for Color Clash
 * Uses the reusable InstructionPage component
 */
function SilentSurfingInstructionPage() {
  const navigate = useNavigate();

  // Instruction content for Round 4
  const instructions = [
    "In this round, you will once again play without the audio, but this time you will have the assistance of the instruction text below the time bar.",
    "Click the arrow to begin!"
  ];

  // Handle start game action
  const handleStartGame = () => {
    navigate('/silent-surfing-play/game/4');
  };

  return (
    <InstructionPage
      title="Silent Surfing - Round 4/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/silentSurfing/silentSurfingRound4.png"}
      onStartGame={handleStartGame}
    />
  );
}

export default SilentSurfingInstructionPage;
