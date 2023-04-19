import React from "react";

type Props = {
  placeholder?: string;
  value?: string;
  title: string;
  isRequired?: boolean;
  star?: boolean;
  style?: boolean;
  disable?: boolean;
  require?: boolean;
  width?: string;
  type?: string;
  pattern?: string;
  placeholderColor?: string;
  handleFocus?: any;
  maxLength?: number | undefined;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const Input = ({
  placeholder,
  value,
  title,
  isRequired,
  disable,
  star,
  style,
  width,
  require,
  onChange,
  type,
  pattern,
  handleFocus,
  maxLength,
}: Props) => {
  return (
    <div
      className={`flex items-center lg:items-start justify-between px-4 mt-5 ${
        width ? width : "w-full"
      } ${style ? "flex-col" : "lg:flex-col"}`}
    >
      <div
        className={`flex lg:items-start ${
          style ? "w-full" : "w-2/6"
        } lg:mx-1 lg:mb-2`}
      >
        {star && <span className='text-[#FF0000]'>*</span>}
        <span className='lg:w-full'>{title}</span>
      </div>

      {isRequired ? (
        <input
          className='w-full px-3 py-2 border-2 rounded-lg border-grey placeholder-[#b7b7b7] focus:outline-none h-12' //placeholder-[#ebe7e4]
          type={type}
          placeholder={placeholder}
          required={require}
          value={value}
          maxLength={maxLength}
          pattern={pattern}
          disabled={disable}
          onChange={onChange}
          onBlur={handleFocus}
        />
      ) : (
        <textarea
          rows={2}
          className='w-full px-3 min-h-[3rem] max-h-[16rem] py-2 border-2 rounded-lg border-grey placeholder-[#b7b7b7] focus:outline-none'
          placeholder={placeholder}
          disabled={disable}
          value={value}
          onChange={onChange}
          onBlur={handleFocus}
        />
      )}
    </div>
  );
};

export default Input;
