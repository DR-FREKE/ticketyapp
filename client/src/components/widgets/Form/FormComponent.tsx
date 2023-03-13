import React, { ChangeEventHandler, useState } from 'react';
import { ChangeHandler, Control, Controller } from 'react-hook-form';
import { Fieldset, PassType } from './form.style';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { SignUpErrorState } from '../../../hooks/request-hook';

interface TextFieldProps {
  defaultValue?: string;
  label: string;
  type?: string | 'text';
  control?: Control<any>;
  placeholder?: string;
  name: string;
  onChange: ChangeHandler;
  error?: SignUpErrorState[];
}
type Ref = HTMLInputElement;

export const TextField = React.forwardRef<Ref, TextFieldProps>((props, ref): JSX.Element => {
  return (
    <Fieldset>
      <legend>{props.label}</legend>
      <input ref={ref} type={props.type || 'text'} name={props.name} onChange={props.onChange} className="focus:shadow-outline shadow-sm" />
      {props.error != undefined &&
        props.error.length > 0 &&
        props.error?.map(content =>
          content.field == props.name ? (
            <span key={content.message} className="text-red-400 flex items-center gap-x-[0.15rem] mt-[0.20rem] text-xs">
              <AiOutlineInfoCircle className="text-xs" />
              {content.message}
            </span>
          ) : (
            ''
          )
        )}
    </Fieldset>
  );
});

export const PasswordField = React.forwardRef<Ref, TextFieldProps>((props, ref): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Fieldset>
        <legend>{props.label}</legend>
        <PassType className="shadow-sm focus:shadow-outline">
          <input type={visible ? 'text' : 'password'} name={props.name} onChange={props.onChange} ref={ref} />
          <span onClick={(): void => setVisible(!visible)}>{!visible ? <FiEye /> : <FiEyeOff />}</span>
        </PassType>
        {props.error != undefined &&
          props.error.length > 0 &&
          props.error?.map(content =>
            content.field == props.name ? (
              <span key={content.message} className="text-red-400 flex items-center gap-x-[0.15rem] mt-[0.20rem] text-xs">
                <AiOutlineInfoCircle className="text-xs" />
                {content.message}
              </span>
            ) : (
              ''
            )
          )}
      </Fieldset>
    </>
  );
});

export const PhoneField = React.forwardRef<Ref, TextFieldProps>((props, ref) => {
  return (
    <Fieldset>
      {/* <legend>{props.label}</legend> */}
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { onChange, value } }: { field: { onChange: () => void; value: string } }) => (
          <div className="w-full shadow-sm focus:shadow-outline">
            <PhoneInput country={'ng'} value={value} onChange={onChange} />
          </div>
        )}
      />
      {props.error != undefined &&
        props.error.length > 0 &&
        props.error?.map(content =>
          content.field == props.name ? (
            <span key={content.message} className="text-red-400 flex items-center gap-x-[0.15rem] mt-[0.20rem] text-xs">
              <AiOutlineInfoCircle className="text-xs" />
              {content.message}
            </span>
          ) : (
            ''
          )
        )}
    </Fieldset>
  );
});

// class React2{
//   static forwardRef<R, P>(){
//     return function(props: P, ref: R){

//     }
//   }
// }
