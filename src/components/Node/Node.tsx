// Node.tsx
import './Node.scss';
import React, { useRef, useState } from 'react';
import Arrow from '../Common/icons/Arrow';
import Pin from '../Common/icons/Pin';

interface HeaderProps {
  title?: string | null;
  color?: string;
  description?: string | null;
}

interface NodeProps {
  id: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  header?: HeaderProps;
  inputs?: Connection[] | null | Array<null>;
  outputs?: Connection[] | null | Array<null>;
  onMove?: (id: string, top: number, left: number) => void; // Adiciona um callback para movimentar o nó
}

interface Connection {
  id: string;
  type: 'data' | 'connection';
  dataType?: 'string' | 'float' | 'number' | 'boolean' | 'any' | null;
  title?: string | null;
}

const Node: React.FC<NodeProps> = ({
  id,
  width = 250,
  height = 200,
  top = 100,
  left = 100,
  header = {
    color: 'red',
  },
  inputs = [],
  outputs = [],
  onMove, // Recebe a função de movimentação
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startTop, setStartTop] = useState(top);
  const [startLeft, setStartLeft] = useState(left);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault(); // Previne a seleção de texto ao arrastar
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newTop = e.clientY - nodeRef.current!.offsetHeight / 2;
      const newLeft = e.clientX - nodeRef.current!.offsetWidth / 2;
      nodeRef.current!.style.top = `${newTop}px`;
      nodeRef.current!.style.left = `${newLeft}px`;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      const newTop = parseFloat(nodeRef.current!.style.top || `${top}px`);
      const newLeft = parseFloat(nodeRef.current!.style.left || `${left}px`);
      if (onMove) {
        onMove(id, newTop, newLeft);
      }
      setStartTop(newTop);
      setStartLeft(newLeft);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="Node"
      id={id}
      ref={nodeRef}
      style={{
        width,
        height,
        top,
        left,
        position: 'absolute',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="header" style={{ backgroundColor: header.color }}>
        <span className="title">{header.title}</span>
        <span className="description">{header.description}</span>
      </div>
      <div className="content">
        <div className="inputs">
          {inputs && inputs.map((input) => (
            <div key={input.id} className="input">
              <span
                className="socket"
                id={`${id}-input-${input.id}`}
              >
                {input.type === 'connection' && <Arrow />}
                {input.type === 'data' && <Pin />}
              </span>
              <span className="control">
                {input.title}
              </span>
            </div>
          ))}
        </div>
        <div className="outputs">
          {outputs && outputs.map((output) => (
            <div key={output.id} className="output">
              <span
                className="socket"
                id={`${id}-output-${output.id}`}
              >
                {output.type === 'connection' && <Arrow />}
                {output.type === 'data' && <Pin />}
              </span>
              <span className="control">
                {output.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Node;
