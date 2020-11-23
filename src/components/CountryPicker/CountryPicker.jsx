import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api'

 const CountryPicker = ({ handleCountryChange }) => {

    const [ fetchedCountries, setFetchedCountries ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }

        fetchAPI();
    }, [setFetchedCountries]) // country picker will change/activate only is setFetchedCountries changes
                             // or else it will run endlessly 
    return (
        <FormControl className={styles.formControl} >
            <NativeSelect default='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="" >Global</option>
                {fetchedCountries.map((country, i) => <option value={country} key={i} > {country} </option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;