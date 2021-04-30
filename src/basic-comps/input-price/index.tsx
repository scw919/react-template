/**
 * 自定义表单组件的案例
 */
import React, { memo, useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;
export type Currency = 'rmb' | 'dollar';
export interface PriceValue {
  number?: number;
  currency?: Currency;
}
/**
 * 自定义表单组件必须是这两个参数
 * value: { number:'',  currency:''}
 * onChange: ()=>{}
 */
export interface InputPriceProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

// 定义组件
const InputPrice: React.FC<InputPriceProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState<Currency>('rmb');

  const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
    onChange?.({ number, currency, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };
  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

// memo 是性能优化（浅层比较更新组件）
export default memo(InputPrice);
