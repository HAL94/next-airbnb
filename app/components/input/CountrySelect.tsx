'use client';
import { useCountries } from '@/app/hooks/use-countries';
import Select from 'react-select';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect: React.FC<Props> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div className="">
      <Select
        value={value}
        onChange={(value: any) => onChange(value as CountrySelectValue)}
        placeholder="Anywhere"
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>{option.label}</div>
            <div className="text-neutral-500 ml-1">{option.region}</div>
          </div>
        )}
        isClearable
        options={getAll()}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme: any) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
