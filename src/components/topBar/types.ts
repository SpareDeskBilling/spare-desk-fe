/* eslint-disable no-unused-vars */
import { FC, ReactNode, SVGProps } from 'react';

export type TopBarProps = {
  primaryButtonConfig?: ButtonConfig;
  title?: string;
  middleChild?: {
    left?: ReactNode;
    right?: ReactNode;
  };
};

type ButtonConfig = {
  dataTestId?: string;
  buttonHandler?: () => void;
  showButton?: boolean;
  isDisabled?: boolean;
  buttonLabel?: string;
  showMainViewButton?: boolean;
  icon?: FC<SVGProps<SVGElement>>;
  customClass?: string;
  iconClass?: string;
};
