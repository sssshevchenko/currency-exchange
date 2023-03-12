import { useEffect, useState } from 'react';
import './App.css';
import Currency from './components/Currency';
import Navbar from './components/Navbar';
import Arrows from './assets/img/arrows.svg';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCurrency } from './app/asyncThunk/currencyThunk';
import Loader from './components/Loader';

const App = () => {
  const {currency, isLoading} = useAppSelector(state => state.currency)
  const dispatch = useAppDispatch()

  const [selectFromCurrency, setSelectFromCurrency] = useState<string>('USD')  //select currency from
  const [selectToCurrency, setSelectToCurrency] = useState<string>('USD')    //select currency to
  
  const [inputFromValue, setInputFromValue] = useState<number>(0)  //set value from
  const [inputToValue, setInputToValue] = useState<number>(0)   //set value to

  useEffect(() => {
    dispatch(fetchCurrency())
  }, [])

  const inputFromValueHandler = (value: number) => {
    const currFrom = currency.find(v => v.cc === selectFromCurrency)
    const currTo = currency.find(v => v.cc === selectToCurrency)

    const price = value * currFrom!.rate
    const result = price / currTo!.rate

    setInputFromValue(value)
    setInputToValue(+result.toFixed(4))
  }

  const inputToValueHandler = (value: number) => {
    const currFrom = currency.find(v => v.cc === selectFromCurrency)
    const currTo = currency.find(v => v.cc === selectToCurrency)

    const price = currTo!.rate / currFrom!.rate
    const result = price * value

    setInputToValue(value)
    setInputFromValue(+result.toFixed(4))
  }

  if(isLoading) {
    return (
      <div className='app__loader'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='App'>
      <Navbar currency={currency}/>
      <div className="container">
        <div className="main">
          <Currency 
            currency={currency} 
            currencyValue={selectFromCurrency} 
            onChangeCurr={setSelectFromCurrency}
            inputValue={inputFromValue} 
            onChangeInput={inputFromValueHandler}
          />
          <img src={Arrows} alt="Arrows" className='app__img' />
          <Currency
            currency={currency} 
            currencyValue={selectToCurrency} 
            onChangeCurr={setSelectToCurrency} 
            inputValue={inputToValue}
            onChangeInput={inputToValueHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default App;