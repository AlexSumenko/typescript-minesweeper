import React, { FC } from 'react';

import './Footer.scss';

const Footer: FC = () => {
  return (
    <div className="footer">
      Minesweeper made by{' '}
      <a href="https://github.com/AlexSumenko">Alex Sumenko</a>
    </div>
  );
};

export default Footer;
