import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

import { Notifier } from 'components';
import { RootState } from 'store/reducers';
import { hideNotifier } from 'reducers/appReducer';

const NotifierStack = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.rootReducer.app
  );

  const notifierRootElement = document.getElementById('notifier-root');

  const PortalWrapper = useCallback(({ children: portalChildren }) => {
    return ReactDOM.createPortal(portalChildren, notifierRootElement);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PortalWrapper>
      <div className="overflow-y-auto fixed bottom-2 left-2 max-h-screen customTransparentScroll">
        {notifications?.length > 0 &&
          notifications?.map(message => {
            return (
              <Notifier
                key={message?.id}
                id={message?.id}
                notification={{
                  ...message
                }}
                hideNotifier={hideNotifier}
              />
            );
          })}
      </div>
    </PortalWrapper>
  );
};

export default NotifierStack;
