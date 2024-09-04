import './Node.scss';
import React, { useRef } from 'react';
import Arrow from '../Common/icons/Arrow';
import Pin from '../Common/icons/Pin';

interface HeaderProps {
  title?: string | null;
  color: string;
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
  height = 10,
  top = 100,
  left = 100,
  header = {
    title: 'Title',
    color: 'red',
  },
  inputs = [],
  outputs = [],
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

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
    >
      <div className="header" style={{ backgroundColor: header.color }}>
        <span className="title">{header.title}</span>
        <span className="description">{header.description}</span>
      </div>
      <div className="content">
        <div className="inputs">
          {inputs && inputs.map((input) => (
            <div id={input.id} key={input.id} className="input">
              <span className="socket">
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
            <div id={output.id} key={output.id} className="output">
              <span className="control">
                {output.title}
              </span>
              <span className="socket">
                {output.type === 'connection' && <Arrow />}
                {output.type === 'data' && <Pin />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Node;
