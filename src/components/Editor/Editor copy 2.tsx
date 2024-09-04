// Editor.tsx
import './Editor.scss';
import Node from '../Node/Node';
import Connection from '../Connection/Connection';
import { generateUUID } from '../../utils/uuid';
import React, { useState, useEffect } from 'react';

const initialNodes = [
  {
    id: generateUUID(),
    top: 50,
    left: 50,
    outputs: [
      {
        id: generateUUID(),
        type: 'connection',
      }
    ]
  },
  {
    id: generateUUID(),
    top: 50,
    left: 500,
    inputs: [
      {
        id: generateUUID(),
        type: 'connection',
      }
    ]
  }
];

const initialConnections = [
  {
    id: generateUUID(),
    from: {
      id: initialNodes[0].id,
      port: initialNodes[0].outputs[0].id,
    },
    to: {
      id: initialNodes[1].id,
      port: initialNodes[1].inputs[0].id,
    }
  }
];

function Editor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [connections, setConnections] = useState(initialConnections);
  const [connectionPositions, setConnectionPositions] = useState<{ [key: string]: { from: { x: number; y: number }; to: { x: number; y: number } } }>({});

  const handleNodeMove = (id: string, top: number, left: number) => {
    setNodes(nodes.map(node =>
      node.id === id ? { ...node, top, left } : node
    ));
  };

  const findNodePosition = (id: string, port: string) => {
    const socketId = `${id}-${port}`;
    const element = document.getElementById(socketId);
    if (element) {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    const updatedPositions: { [key: string]: { from: { x: number; y: number }; to: { x: number; y: number } } } = {};

    connections.forEach((conn) => {
      const fromPos = findNodePosition(conn.from.id, `output-${conn.from.port}`);
      const toPos = findNodePosition(conn.to.id, `input-${conn.to.port}`);
      updatedPositions[conn.id] = { from: fromPos, to: toPos };
    });

    setConnectionPositions(updatedPositions);
  }, [nodes, connections]); // Atualiza as conexões quando nodes ou connections mudam

  return (
    <div className="Editor">
      {Object.keys(connectionPositions).map((connId) => {
        const { from, to } = connectionPositions[connId];
        return (
          <Connection
            key={connId}
            from={from}
            to={to}
          />
        );
      })}

      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          width={250}
          height={300}
          top={node.top}
          left={node.left}
          header={{
            title: 'Title',
            color: 'rgba(136, 0, 0, 1)',
            description: 'Teste',
          }}
          inputs={node.inputs}
          outputs={node.outputs}
          onMove={handleNodeMove} // Passa a função de movimentação para o Node
        />
      ))}
    </div>
  );
}

export default Editor;
