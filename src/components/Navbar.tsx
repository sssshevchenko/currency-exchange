import { FC } from 'react';
import { ICurrency } from '../types/ICurrency';

interface NavbarProps {
    currency: ICurrency[];
}

const Navbar: FC<NavbarProps> = ({currency}) => {
    return (
        <div className='navbar'>
            <h3 className="navbar__logo">
                Currency Exchange
            </h3>
            <div className='navbar__currency'>
                {currency.map(item =>
                    item.cc === 'GBP' || item.cc === 'USD' || item.cc === 'EUR'
                        ? <h3 key={item.r030} className='navbar__currency__item'>1{item.cc}/{item.rate}UAH</h3>
                        : undefined
                )}
            </div>
        </div>
    );
};

export default Navbar;