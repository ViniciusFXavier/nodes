// Connection.tsx
import React from 'react';

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const Connection: React.FC<ConnectionProps> = ({ from, to }) => {
  // Distância reta horizontal inicial e final
  const straightSegment = 10;

  // Calcula a diferença horizontal e vertical entre os pontos
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // Define o ponto inicial da linha reta horizontal
  const startPoint = {
    x: from.x + (straightSegment * Math.sign(dx)),
    y: from.y
  };

  // Define o ponto final da linha reta horizontal
  const endPoint = {
    x: to.x - (straightSegment * Math.sign(dx)),
    y: to.y
  };

  // Define o ponto médio para a curva
  const midX = (startPoint.x + endPoint.x) / 2;
  const midY = (startPoint.y + endPoint.y) / 2;

  // Ajusta o ponto de controle para a curva
  const controlPoint = {
    x: midX,
    y: midY - Math.abs(dy) / 2
  };

  // Define o caminho do arco ou linha reta
  const pathData = `M${from.x},${from.y} H${startPoint.x} C${controlPoint.x},${controlPoint.y} ${controlPoint.x},${controlPoint.y} ${endPoint.x},${endPoint.y} H${to.x}`

  return (
    <svg
      className="Connection"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'  // Permite clicar em elementos abaixo
      }}
    >
      <path d={pathData} stroke="black" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default Connection;
