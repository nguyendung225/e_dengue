import { Form, FormControl, FormControlProps } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { TextValidatorProps } from './models';
import CustomTooltip from '../../CustomTooltip';
import { TYPE } from '../../../utils/Constant';

const TextValidator = (propsComponent: TextValidatorProps) => {
  const {
    isRequired,
    touched,
    isSearch,
    isTooltip,
    titleTooltip,
    ...props
  } = propsComponent;
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<string | number>("");
  const isPasswordType = props?.type === TYPE.PASSWORD;
  const inputType = isPasswordType ? (!showPassword ? TYPE.PASSWORD : TYPE.TEXT) : props?.type;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.offsetHeight);
    }
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.value?.startsWith(" ")) {
      event.target.value = "";
    }
    props?.onChange && props.onChange(event);
  }

  const handleBlur = () =>{
    props?.onBlur && props?.onBlur()
    if(!props.value && inputRef.current && inputType === TYPE.DATE){
      inputRef.current.value = " "
    } 
  }

  return (
    <div className={`${props?.className || ""} text-validator`}>
      {props?.lable && (
        <span className={`text-lable-input lable`}>
          {props?.lable}
          {isRequired && <span className="color-red"> *</span>}
        </span>
      )}
      <CustomTooltip
        title={
          titleTooltip
            ? titleTooltip
            : touched && props.errors
              ? props.errors?.toString()
              : ""
        }
        placement={props?.placementTooltip}
        delay={props.delayTooltip}
        className={`
          ${(!isTooltip && !titleTooltip) || !(touched && props.errors) ? "hidden" : ""} 
          ${titleTooltip ? "" : "tooltip-error"}
        `}
      >
        <Form.Group className={`position-relative flex-grow-1`}>
          <FormControl
            {...(props as FormControlProps)}
            ref={inputRef}
            placeholder={props?.placeholder || props?.lable || ""}
            type={inputType}
            className={`
                        ${props.errors && touched ? "is-invalid" : ""}
                        ${(props?.isSearch || isPasswordType) ? "background-image-none" : ""}
                        form-control customs-input
                        ${props?.as === TYPE.TEXTAREA ? "spaces py-7 px-12 resize-none" : ""}
                        ${props?.type === TYPE.NUMBER ? "no-spinners" : ""}
                        ${props?.readOnly ? "text-readOnly" : ""}
                        ${isPasswordType && "spaces pr-40"}
                    `}
            onChange={props?.onChange && onChange}
            onBlur={handleBlur}
          />

          {props?.isSearch && (
            <div
              className="searchTextField"
              style={{ height: inputHeight }}
              onClick={props?.isSearch && props?.handleSearch}>
              <i className="bi bi-search"></i>
            </div>
          )}

          {(props?.icon || isPasswordType) && (
            <div
              className="searchTextField icon-eye border-0"
              style={{ height: inputHeight }}
              onClick={isPasswordType
                ? () => setShowPassword(!showPassword)
                : props?.icon
                  ? props?.handleIcon
                  : undefined
              }
            >
              <i
                className={
                  isPasswordType
                    ? `bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`
                    : props?.icon
                }
              ></i>
            </div>
          )}

          {(!isTooltip && !titleTooltip) && touched && props.errors && <div className="invalid-feedback">{props.errors?.toString()}</div>}
        </Form.Group>
      </CustomTooltip>
    </div >
  );
};

export default TextValidator