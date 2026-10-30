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

  // Instruction content for Round 1
  const instructions = [
    "In this round, you will play just as you did in the last round, except you will not hear the audio, demonstrating how games that rely only on audio may be difficult for players with auditory impairments.",
    "Click the arrow to begin!"
  ];

  // Handle start game action
  const handleStartGame = () => {
    navigate('/silent-surfing-play/game/2');
  };

  return (
    <InstructionPage
      title="Silent Surfing - Round 2/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/silentSurfing/silentSurfingRound2.svg"}
      onStartGame={handleStartGame}
    />
  );
}

export default SilentSurfingInstructionPage;
