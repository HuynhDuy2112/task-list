import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Button, Dropdown, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import Table from './layouts/table.jsx'
import DropdownFilter from './layouts/dropdown-filter.jsx'
import Search from '../../../components/search'
import AddField from './layouts/modal-add-field.jsx'
import './styles.scss'

function Body() {
  const [api, setApi] = useState([])
  const [openDropdown, setOpenDropdown] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [checked, setChecked] = useState([false, false, false, false, false, false])
  const [filterForm, setFilterForm] = useState([])
  const filterValues = useRef([
    {
      name: 'rooms',
      value: null,
    },
    {
      name: 'groups',
      value: null,
    },
    {
      name: 'date',
      value: null,
    },
    {
      name: 'state',
      value: null,
    },
    {
      name: 'status',
      value: null,
    },
    {
      name: 'user',
      value: null,
    },
  ])
  const isFiltered = useRef([])

  const fetchData = () => {
    fetch(`http://192.168.1.35:2222/task-list`)
      .then((res) => res.json())
      .then((result) => {
        const formatted = {
          label: Object.fromEntries(
            Object.entries(result.label).map(([key, value]) => [key, String(value).toUpperCase()])
          ),
          task: result.task.map((item) => ({
            ...item,
            startDate:
              dayjs(item.startDate).isValid() && dayjs(item.startDate).format('DD/MM/YYYY'),
            deadline: dayjs(item.deadline).isValid() && dayjs(item.deadline).format('DD/MM/YYYY'),
          })),
        }
        setApi(formatted)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSearch = (e) => {
    setSearchValue(e)
  }

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#A0AEC0',
      }}
    />
  )

  const handleOpenDropdown = () => {
    isFiltered.current = []
    filterValues.current.filter((item, i) => item.value !== null && isFiltered.current.push(i))
    setChecked((prev) => {
      const newChecked = [...prev].fill(false)
      isFiltered.current.forEach((i) => (newChecked[i] = true))
      return newChecked
    })
    setOpenDropdown(true)
  }

  const addFieldRef = useRef()

  return (
    <div className="body-layout">
      <div>
        <Dropdown
          open={openDropdown}
          onClick={handleOpenDropdown}
          placement="bottomLeft"
          arrow
          trigger={['click']}
          dropdownRender={() => (
            <DropdownFilter
              api={api}
              filterForm={filterForm}
              setFilterForm={setFilterForm}
              checked={checked}
              setChecked={setChecked}
              setOpenDropdown={setOpenDropdown}
              filterValues={filterValues}
            />
          )}
        >
          <Button>
            <FontAwesomeIcon icon={faFilter} style={{ color: '#A0AEC0' }} />
          </Button>
        </Dropdown>
        <Search onSearch={onSearch} prefix={prefix} />
        <Button onClick={fetchData}>Reset</Button>
        <Button onClick={() => addFieldRef.current?.showModal()}>+ Tạo mới</Button>
        <AddField ref={addFieldRef} api={api} />
      </div>
      <Table api={api} searchValue={searchValue} filterForm={filterForm} />
    </div>
  )
}

export default Body
