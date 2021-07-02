import { FC, ReactElement } from 'react';

import './Counter.scss';

interface CounterProps {
  value: number;
}

const Counter: FC<CounterProps> = (): ReactElement => {
  return <div>123</div>;
};

export default Counter;
