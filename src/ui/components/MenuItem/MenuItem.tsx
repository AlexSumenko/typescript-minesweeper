import { FC, ReactElement } from 'react';

import './MenuItem.scss';

interface MenuItemProps {
  heading: string;
}

const MenuItem: FC<MenuItemProps> = ({ heading }): ReactElement => {
  return <div className="menu-item">{heading}</div>;
};

export default MenuItem;
