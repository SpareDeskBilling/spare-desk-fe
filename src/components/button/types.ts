import React, { FC, SVGProps } from 'react';

export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  handleKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>;
  label?: string;
  labelClass?: string;
  disableRipple?: boolean;
  rippleClass?: string;
  iconClass?: string;
  Icon?: FC<SVGProps<SVGElement>>;
  disabled?: boolean;
  breakpoint?: number;
  type?: 'button' | 'submit' | 'reset';
  showMainViewButton?: boolean;
  iconStroke?: string;
  dataTestId?: string;
};
