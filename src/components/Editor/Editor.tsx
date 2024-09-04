// Editor.tsx
import './Editor.scss';
import React, { useState, useEffect } from 'react';
import Node from '../Node/Node';
import Connection from '../Connection/Connection';
import { generateUUID } from '../../utils/uuid';

const initialNodes = [
  {
    id: generateUUID(),
    header: {
      title: 'Event Start',
      color: 'red'
    },
    width: 150,
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
    header: {
      title: 'Node 1',
      color: 'blue',
      description: 'This is a description for Node 1',
    },
    width: 150,
    top: 50,
    left: 300,
    inputs: [
      {
        id: generateUUID(),
        type: 'connection',
      }
    ],
    outputs: [
      {
        id: generateUUID(),
        type: 'connection',
      }
    ]
  },
  {
    id: generateUUID(),
    header: {
      title: 'Node 2',
      color: 'green',
      description: 'This is a description for Node 2',
    },
    width: 150,
    top: 50,
    left: 550,
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
  },
  {
    id: generateUUID(),
    from: {
      id: initialNodes[1].id,
      port: initialNodes[1].outputs[0].id,
    },
    to: {
      id: initialNodes[2].id,
      port: initialNodes[2].inputs[0].id,
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
  }, [nodes, connections, handleNodeMove]);

  // Função para exportar os dados
  const exportData = () => {
    const data = {
      nodes,
      connections
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nodes-connections.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Função para importar os dados
  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      setNodes(data.nodes);
      setConnections(data.connections);
    };
    reader.readAsText(file);
  };

  // Função de tratamento para upload de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      importData(e.target.files[0]);
    }
  };

  return (
    <div className="Editor">
      <div className="export-options">
        <button onClick={exportData}>Exportar</button>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
      
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
          width={node.width}
          height={node.height}
          top={node.top}
          left={node.left}
          header={node.header}
          inputs={node.inputs}
          outputs={node.outputs}
          onMove={handleNodeMove}
        />
      ))}
    </div>
  );
}

export default Editor;
