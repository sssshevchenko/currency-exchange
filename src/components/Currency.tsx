import { FC } from 'react';
import { ICurrency } from '../types/ICurrency';

interface CurrencyProps {
    currency: ICurrency[];
    onChangeCurr: (e: string) => void;
    currencyValue: string;
    inputValue: number;
    onChangeInput: (e: number) => void;
}

const Currency: FC<CurrencyProps> = ({
    currency, onChangeCurr, currencyValue, inputValue, onChangeInput
}) => {

    return (
        <div className="currency">
            <div className="currency__select">
                <h2>Select currency - </h2>
                <select 
                    value={currencyValue} 
                    onChange={e => onChangeCurr(e.target.value)} 
                    className='select'
                >
                    {currency.map(item => 
                        <option key={item.r030}>{item.cc}</option>    
                    )}
                </select>
            </div>
            <div className="currency__input">
                <input
                    type="number" 
                    value={inputValue === 0 ? '' : inputValue}
                    onChange={e => onChangeInput(+e.target.value)}
                />
            </div>
        </div>
    );
};

export default Currency;