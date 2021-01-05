import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const getCountry = async() => {
    let url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    try{
      const replyCountry = await axios.get(url)
      let c = replyCountry.data[0]
      if(c)
        c.found = true
      setCountry(c)
    } catch (error) {
        setCountry({found: false})
      }
  }

  useEffect( () => {
    if(name)
    {
      console.log('name: ' , name )
      getCountry(name)
    }
  }, [name])

  return country
}

const Country = ({ country }) => {

  console.log('country: ' , country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App