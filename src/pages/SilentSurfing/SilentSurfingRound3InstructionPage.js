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

  // Instruction content for Round 3
  const instructions = [
    "In this round, you will pop red and green balloons.",
    "The audio will be enabled, and the instruction below the time will indicate which color to pop.",
    "For this round,please make sure your computer's volume is at least 50%.",
    "Click the arrow to begin!"
  ];

  // Handle start game action
  const handleStartGame = () => {
    navigate('/silent-surfing-play/game/3');
  };

  return (
    <InstructionPage
      title="Silent Surfing - Round 3/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/silentSurfing/silentSurfingRound3.png"}
      onStartGame={handleStartGame}
    />
  );
}

export default SilentSurfingInstructionPage;
