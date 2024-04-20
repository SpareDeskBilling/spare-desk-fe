import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type NotifierProps = {
  id: string;
  notification: {
    message: string;
    type: string;
    autoHideDisabled?: boolean;
    id: string;
  };
  hideNotifier: ActionCreatorWithPayload<any, string>;
};
