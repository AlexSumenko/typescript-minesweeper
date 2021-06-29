import { FC, ReactElement } from 'react';

import './Footer.scss';

const Footer: FC = (): ReactElement => {
  return (
    <footer className="footer">
      Minesweeper made by{' '}
      <a href="https://github.com/AlexSumenko">Alex Sumenko</a>
    </footer>
  );
};

export default Footer;
