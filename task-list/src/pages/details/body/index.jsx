import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Button, Dropdown } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import ModalRow from './layouts/modal.jsx'
import Table from './layouts/table.jsx'
import DropdownFilter from './layouts/dropdown-filter.jsx'
import Search from '../../../components/search'
import './styles.scss'

function Body() {
  const [api, setApi] = useState([])
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openRow, setOpenRow] = useState(false)
  const [data, setData] = useState()
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

  const dataSource = api.map((data, i) => ({
    key: i + 1,
    name: data.name,
    room: data.room,
    group: data.group,
    startDate: dayjs(data.startDate).isValid() && dayjs(data.startDate).format('DD/MM/YYYY'),
    deadline: dayjs(data.deadline).isValid() && dayjs(data.deadline).format('DD/MM/YYYY'),
    state: data.state,
    status: data.status,
    nameUser: data.nameUser,
  }))

  const fechData = () => {
    fetch('http://localhost:2222/task')
      .then((res) => res.json())
      .then((result) => setApi(result))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fechData()
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
    setOpenDropdown(!openDropdown)
  }

  return (
    <div className="body-layout">
      <div>
        <Dropdown
          open={openDropdown}
          onOpenChange={(visible) => setOpenDropdown(visible)}
          onClick={handleOpenDropdown}
          placement="bottomLeft"
          arrow
          trigger={['click']}
          dropdownRender={() => (
            <DropdownFilter
              api={api}
              dataSource={dataSource}
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
        <Button onClick={fechData}>Reset</Button>
        <Button>+ Tạo mới</Button>
      </div>
      <Table
        api={api}
        searchValue={searchValue}
        setData={setData}
        setOpenRow={setOpenRow}
        dataSource={dataSource}
        filterForm={filterForm}
      />
      <ModalRow openRow={openRow} setOpenRow={setOpenRow} data={data} />
    </div>
  )
}

export default Body
