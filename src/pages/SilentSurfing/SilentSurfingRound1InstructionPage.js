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
    "In this round, you will have 30 seconds to pop as many balloons as possible.",
    "You will hear the instructions to pop a specific color of balloon - red, green or yellow.",
    "Popping the correct color increases your score, while popping the incorrect color decreases your score and increases the computer's.",
    "For this round, please make sure your computer's volume is at least 50%.",
    "Click the arrow to begin!"
  ];

  // Handle start game action
  const handleStartGame = () => {
    navigate('/silent-surfing-play/game/1');
  };

  return (
    <InstructionPage
      title="Silent Surfing - Round 1/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/silentSurfing/SSR1.png"}
      onStartGame={handleStartGame}
    />
  );
}

export default SilentSurfingInstructionPage;
