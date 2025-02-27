import React from 'react'
import { Input } from 'antd'
const Search = ({ placeholder = 'Tìm kiếm ', onSearch, prefix }) => {
  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <Input
      placeholder={placeholder}
      prefix={prefix}
      allowClear
      onSearch={onSearch}
      onChange={handleSearch}
      style={{
        width: 200,
      }}
    />
  )
}

export default Search
