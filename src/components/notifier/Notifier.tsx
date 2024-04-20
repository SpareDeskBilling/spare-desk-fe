import React, { useEffect, useState, FC } from 'react';

import { useAppDispatch } from 'store/store';
import { JOB_NOTIFIER, NotifierTypes } from 'constants/common';
import { NotifierProps } from './types';

const Notifier: FC<NotifierProps> = props => {
  const { id, notification, hideNotifier } = props;

  const [progressWidth, setprogressWidth] = useState<number>(0);
  const [animate, setAnimate] = useState<string>(
    'animate-slide-out-from-right'
  );

  const { message, autoHideDisabled, type } = notification;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!autoHideDisabled) {
      setTimeout(() => {
        setprogressWidth(100);
      }, 10);

      setTimeout(() => {
        setAnimate('animate-slide-out-to-left');
      }, 5010);

      setTimeout(() => {
        dispatch(hideNotifier(id));
      }, 5800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotificationIcon = () => {
    switch (type) {
      case NotifierTypes.LINK_ERROR:
      case NotifierTypes.SYNC_ERROR:
      case NotifierTypes.ERROR:
        return '/images/Error.gif';

      case NotifierTypes.LOADING:
        return '/images/Loader.gif';

      case NotifierTypes.DELETE:
        return '/images/Delete.gif';

      case NotifierTypes.SUCCESS:
        return '/images/Success.gif';

      default:
        return '/images/Loader.gif';
    }
  };

  const getNotifierClass = (propertyType: string) => {
    if (
      type === NotifierTypes.LINK_ERROR ||
      type === NotifierTypes.SYNC_ERROR ||
      type === NotifierTypes.ERROR
    ) {
      if (propertyType === 'bg') return 'bg-coralRed';
      if (propertyType === 'border') return 'border-coralRed';
    }

    if (type === NotifierTypes.JOB_QUEUE_LOADING) {
      if (propertyType === 'border') return 'border-pastelOrange';
    }

    if (
      type === NotifierTypes.LOADING ||
      type === NotifierTypes.SUCCESS ||
      type === NotifierTypes.DELETE
    ) {
      if (propertyType === 'bg') return 'bg-greenHaze';
      if (propertyType === 'border') return 'border-greenHaze';
    }
  };


  return (
    <div
      data-testid={id === JOB_NOTIFIER ? `gainOrLoss-${type}` : type}
      className={`flex relative flex-row items-center p-3 mt-2 min-w-[200px]
      min-h-[69px] text-[12px] sm:text-sm bg-white rounded-md border-[2px] sm:min-w-[427px] 
      ${getNotifierClass('border')}
      ${animate}`}>
      <img
        src={getNotificationIcon()}
        alt=""
        className={`w-[31px] h-[31px] mr-[10px] rounded-[50%] ${type === NotifierTypes.JOB_QUEUE_LOADING ? 'animate-rotate' : ''
          }`}
      />
      <div
        className={`flex flex-wrap mr-2 sm:mr-4 break-normal leading-5	w-[210px] sm:w-[336px`}>
        {message}
      </div>

      <>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-md" />
        <div
          id={id}
          style={{ width: `${progressWidth}%` }}
          className={`absolute bottom-0 left-0 h-1 ${getNotifierClass('bg')}
        rounded-md transition-all duration-[5000ms] ease`}
        />
      </>
    </div>
  );
};

export default Notifier;
