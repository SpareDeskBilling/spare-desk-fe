/* eslint-disable no-unused-vars */
import React, { FC, KeyboardEvent } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';
import { isEmpty } from 'lodash';

// import { InfoIconGrey } from '@assets/icons';
import { removeInvalidNumericCharactersOnInput } from 'utils/generalUtils';
import { CustomTextFieldProps } from './types';
import COLORS from 'constants/colors';

const CustomInputField = styled(TextField)({
  '& input.MuiOutlinedInput-input': {
    padding: '15px 14px 16px'
  },
  '& label': {
    width: '80%'
  },
  '& label.Mui-focused': {
    color: COLORS.PRIMARY_COLOR,
    width: 'auto'
  },
  '& .MuiInputLabel-shrink': {
    color: COLORS.BLACK_GREEN,
    width: 'auto'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: COLORS.GREY_CLOUD,
      borderRadius: '5px',
      borderWidth: '1px'
    },
    '&:hover fieldset': {
      borderColor: COLORS.GREY_CLOUD
    },
    '&.Mui-disabled fieldset': {
      borderColor: COLORS.GREY_CLOUD
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.PRIMARY_COLOR,
      borderRadius: '5px',
      borderWidth: '1px'
    }
  }
});

const startAdornmentSx = {
  '& input.MuiOutlinedInput-input': {
    padding: '15px 14px 16px 73px'
  },
  '& label': {
    width: '70%',
    marginLeft: '55px',
    color: COLORS.SLATE_GREY
  },
  '& .MuiInputLabel-shrink': {
    color: COLORS.BLACK_GREEN,
    backgroundColor: COLORS.WHITE,
    width: 'auto',
    marginLeft: '0px'
  }
};

const CustomTextField: FC<CustomTextFieldProps & TextFieldProps> = props => {
  const {
    isControlledField = false,
    control,
    autoComplete = '',
    name,
    onKeyDown = () => null,
    placeholder,
    rows,
    multiline,
    type = 'text',
    errors,
    onCut = () => {},
    onCopy = () => {},
    onPaste = () => {},
    isDisabled = false,
    wrapperClass = ''
  } = props;

  // seperating out customClass from props, because MUI textField doesn't support customClass as a prop
  const {
    customClass = {},
    testid = 'text-field',
    showStartAdornment = false,
    startAdornment,
    showErrorMessage = false,
    ...remainingProps
  } = props;

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (type === 'number') {
      removeInvalidNumericCharactersOnInput(e);
    }
  };

  return isControlledField ? (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`relative ${wrapperClass}`}>
          <CustomInputField
            name={name}
            autoComplete={autoComplete}
            label={placeholder}
            rows={rows}
            multiline={multiline}
            error={Boolean(!isEmpty(errors) && errors[name]?.message)}
            onCut={onCut}
            onCopy={onCopy}
            onPaste={onPaste}
            className="w-full"
            inputProps={{ 'data-testid': testid }}
            onKeyPress={handleKeyPress}
            type={type}
            disabled={isDisabled}
            sx={{ ...(startAdornment && startAdornmentSx), ...customClass }}
            {...field}
          />
          {showStartAdornment && (
            <div className="flex absolute top-0 justify-center items-center px-4 h-[54px] border-r border-greyCloud">
              {startAdornment}
            </div>
          )}
          {!isEmpty(errors) && errors[name]?.message && (
            <p className="mt-[4px] text-xs text-red-500">
              {errors[name]?.message}
            </p>
          )}
        </div>
      )}
    />
  ) : (
    <div className={`relative ${wrapperClass}`}>
      <CustomInputField
        className="w-full"
        {...remainingProps}
        InputProps={{
          ...{
            ...remainingProps.InputProps,
            autoComplete: 'off',
            'data-testid': testid
          }
        }}
        onKeyPress={onKeyDown}
        sx={{ ...(startAdornment && startAdornmentSx), ...customClass }}
        error={Boolean(!isEmpty(errors) && errors[name]?.message)}
      />
      {showErrorMessage && !isEmpty(errors) && errors[name]?.message && (
        <p className="mt-[4px] text-xs text-red-500">{errors[name]?.message}</p>
      )}
      {showStartAdornment && (
        <div className="flex absolute top-0 justify-center items-center px-4 h-[54px] border-r border-greyCloud">
          {startAdornment}
        </div>
      )}
    </div>
  );
};

export default CustomTextField;
