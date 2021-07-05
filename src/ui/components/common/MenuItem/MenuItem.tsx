import { FC, ReactElement } from 'react';

interface MenuItemProps {
  heading: string;
}

const MenuItem: FC<MenuItemProps> = ({ heading }): ReactElement => {
  return <div className="big blue">{heading}</div>;
};

export default MenuItem;
