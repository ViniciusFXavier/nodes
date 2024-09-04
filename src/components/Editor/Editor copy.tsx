import './Editor.scss';
import Node from '../Node/Node';
import Connection from '../Connection/Connection';
import { generateUUID } from '../../utils/uuid';
import React, { useState } from 'react';

const nodeA = {
  id: generateUUID(),
  top: 50,
  left: 50,
  outputs: [
    {
      id: generateUUID(),
      type: 'connection',
    }
  ]
}

const nodeB = {
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

const connections = [
  {
    id: generateUUID(),
    from: {
      id: nodeA.id,
      port: nodeA.outputs[0].id,
    },
    to: {
      id: nodeB.id,
      port: nodeB.inputs[0].id,
    }
  }
]

function Editor() {
  const [nodes, setNodes] = useState([nodeA, nodeB]);

  // Função para encontrar a posição dos nós
  const findNodePosition = (id: string, port: string) => {
    const node = nodes.find(node => node.id === id);
    if (!node) return { x: 0, y: 0 };
    console.log('node: ', node);
    
    // Ajuste a posição conforme a implementação dos seus nós
    console.log('id: ', id);
    const element = document.getElementById(id);
    console.log('element: ', element);
    if (element) {
      const rect = element.getBoundingClientRect();
      console.log('rect: ', rect);
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    
    return { x: 0, y: 0 };
  };

  return (
    <div className="Editor">
      {connections.map((conn) => {
        const fromPos = findNodePosition(conn.from.id, conn.from.port);
        console.log('fromPos: ', fromPos);
        const toPos = findNodePosition(conn.to.id, conn.to.port);
        console.log('toPos: ', toPos);
        return (
          <Connection
            key={conn.id}
            from={fromPos}
            to={toPos}
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
        />
      ))}
    </div>
  );
}

export default Editor;
