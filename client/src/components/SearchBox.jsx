
import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearch } from '@/helpers/RouteName'

const Searchbox = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('') 

  const getInput = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = (query || '').trim();
    if (!q) return;

    const route = RouteSearch(encodeURIComponent(q));
    navigate(route);

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        onInput={getInput}
        placeholder="Search here..."
        className="h-9 rounded-full bg-gray-50"
      />
    </form>
  )
}

export default Searchbox
