import { useContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import MyContext from '../hooks/MyContext';

export type IOptions = {
  label: string;
  value: string;
};
type selectType = {
  name: string;
  control: any;
  label: string;
  defaultValue: number | string;
  placeholder: string;
  options: IOptions | any;
  onChange?: any;
};

const SelectOptions = ({
  name,
  control,
  label,
  options,
  defaultValue,
  onChange,
  placeholder = 'Select...',
}: selectType) => {
  const { theme } = useContext(MyContext);

  let currentColor: string;
  useEffect(() => {
    currentColor = theme == 'dark' ? '#fff' : '#000';
  }, []);

  const customStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#3cb7ed' : '#3d4d60',
      borderRadius: '10px',
      height: 'full',
      padding: '5px',
      backgroundColor: 'transparent',
      color: currentColor,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3cb7ed' : 'white',
      color: state.isSelected ? '#3d4d60' : 'black',
      '&:hover': {
        backgroundColor: '#2E3A47',
        color: 'white',
      },
    }),
  };
  return (
    <div>
      <label className="mt-2 mb-1 block   dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={options[defaultValue]}
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
            options={options}
            placeholder={placeholder}
            onChange={(value) => {
              field.onChange(value);
              onChange && onChange(value); // call the prop onChange if provided
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                neutral80: `{${currentColor}}`,
              },
            })}
          />
        )}
      />
    </div>
  );
};

export default SelectOptions;
