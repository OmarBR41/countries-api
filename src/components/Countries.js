import React from 'react'
import '../styles/Countries.scss'
import Country from './Country'

export default function Countries({ countries }) {
  return (
    <div className="countries-container">
      {countries.map(country => (
        <Country key={country.alpha3Code} country={country}/>
      ))}
    </div>
  )
}