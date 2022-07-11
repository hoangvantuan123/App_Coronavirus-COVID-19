import React from 'react';
export default function test({ countries, value, handleOnChange }) {
    return (
     
            <div className='custom_select'>
                <select
                    value={value}
                    onChange={handleOnChange}
                >
                    {countries.map(({ Country, ISO2 }) => (
                        <option key={ISO2} value={ISO2.toLowerCase()} >
                            {Country}
                        </option>
                    ))}
                </select>
            </div>
      
    );

}








