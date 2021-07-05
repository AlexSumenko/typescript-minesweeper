import { FC, ReactElement } from 'react';

interface CounterProps {
  value: number | string;
  heading?: string;
}

const Counter: FC<CounterProps> = ({ value, heading }): ReactElement => {
  return (
    <div>
      <div>{heading}</div>
      <div className="big blue">{value}</div>
    </div>
  );
};

export default Counter;
