import React, {useState, useEffect}from 'react'
import "./Header.css"
import { FormControl, Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from "./axios"
import { useStateValue } from './StateProvider';
import { sortData } from './util';

function Header() {

    const [{currentCountry}, dispatch] = useStateValue()

    const [countries, setCountries] = useState([])

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get('/v3/covid-19/countries')
            const countriesData = response.data.map(dataPoint => {
                return {
                    name: dataPoint.country,
                    value: dataPoint.countryInfo.iso3
                }
            })
            console.log(response.data)
            dispatch({
                type: 'SET_TABLE_DATA',
                item: {
                    tableData: sortData(response.data)
                }
            })
            dispatch({
                type: 'SET_COUNTRIES',
                item: {
                    countries: response.data
                }
            })
            setCountries(countriesData)
            return response
        }

        getData()

    }, [dispatch])

    useEffect(() => {
        const getWorldWideData = async () => {
            const response = await axios.get('/v3/covid-19/all')
            dispatch({
                item: {
                    currentCountry: "worldwide",
                    currentCountryInfo: response.data,
                    mapCenter: [34.80746, -40.4796 ],
                    zoom: 3
                }
            })
        }

        getWorldWideData()
    }, [dispatch])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value
        const response = await axios.get(`/v3/covid-19/${countryCode === "worldwide" ? 'all': 'countries/' + countryCode}`)
        dispatch({
            item: {
                currentCountry: countryCode,
                currentCountryInfo: response.data,
                mapCenter: countryCode !== 'worldwide' ? [ response.data.countryInfo.lat, response.data.countryInfo.long ] : [34.80746, -40.4796 ],
                zoom: countryCode !== 'worldwide' ? 6 : 3
            }
        })

    }

    return (
        <div className="header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="header__dropdown">
            <Select
                variant="outlined"
                value={currentCountry}
                onChange={onCountryChange}
            >
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map(country => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
            </FormControl>
        </div>
    )
}

export default Header
