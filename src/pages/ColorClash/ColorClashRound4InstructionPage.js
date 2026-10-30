import React from 'react';
import InstructionPage from '../../components/InstructionPage';
import { useNavigate, useParams } from 'react-router-dom';



/**
 * ColorClashRound4InstructionPage Component
 * Round 4/4 instruction page for Color Clash (Audio Harmony)
 */
function ColorClashRound4InstructionPage() {
  const instructions = [
    "In this round, the game will once again demonstrate red-green color blindness, but with the assistance of last round's labeled balloons.",
    "R=Red, Y=Yellow, and G=Green",
    "Click the arrow to begin!"
  ];

  const navigate = useNavigate();

  // Handle start game action
  const handleStartGame = () => {
    navigate(`/color-clash-play/game/4`);
  };

  return (
    <InstructionPage
      title="Color Clash - Round 4/4"
      instructions={instructions}
      imagePath={process.env.PUBLIC_URL + "/icons/colorClash/colorClashRound4.svg"} // Path to your PNG image
      onStartGame={handleStartGame}
    />
  );
}

export default ColorClashRound4InstructionPage;