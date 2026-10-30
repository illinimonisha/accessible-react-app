import React from 'react';
import InstructionPage from '../../components/InstructionPage';
import { useNavigate, useParams } from 'react-router-dom';


/**
 * ColorClashRound3InstructionPage Component
 * Round 3/4 instruction page for Color Clash (Click-free)
 */
function ColorClashRound3InstructionPage() {
  const instructions = [
    "In this round, you will play just as you did in round one, but each balloon will be labeled with a letter representing its respective color.",
    "R=Red , Y=Yellow, and G=Green",
    "Click the arrow to begin!"
  ];

  const navigate = useNavigate();

  // Handle start game action
  const handleStartGame = () => {
    navigate(`/color-clash-play/game/3`);
  };

  return (
    <InstructionPage
      title="Color Clash - Round 3/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/colorClash/colorClashRound3.svg"} 
      onStartGame={handleStartGame}
    />
  );
}

export default ColorClashRound3InstructionPage;