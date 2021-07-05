import { FC, ReactElement } from 'react';

import './Counter.scss';

interface CounterProps {
  value: number | string;
  heading?: string;
}

const Counter: FC<CounterProps> = ({ value, heading }): ReactElement => {
  return (
    <div className="counter">
      <div className="counter__heading">{heading}</div>
      <div className="counter__value">{value}</div>
    </div>
  );
};

export default Counter;
