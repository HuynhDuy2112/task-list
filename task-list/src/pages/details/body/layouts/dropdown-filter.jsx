import React, { useState, useEffect } from 'react'
import { Checkbox, Select, DatePicker, Badge, Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)
const { RangePicker } = DatePicker

function DropdownFilter(props) {
  const {
    api,
    dataSource,
    filterForm,
    setFilterForm,
    checked,
    setChecked,
    setOpenDropdown,
    filterValues,
  } = props

  const [label, setLabel] = useState([
    {
      key: 0,
      name: 'room',
      show: true,
      value: 'Phòng ban',
    },
    {
      key: 1,
      name: 'group',
      show: true,
      value: 'Dự án thuộc',
    },
    {
      key: 2,
      name: '',
      show: true,
      value: 'Ngày bắt đầu',
    },
    {
      key: 3,
      name: 'state',
      show: true,
      value: 'Trạng thái',
    },
    {
      key: 4,
      name: 'status',
      show: true,
      value: 'Tình trạng',
    },
    {
      key: 5,
      name: 'nameUser',
      show: true,
      value: 'Người thực hiện',
    },
  ])
  const [, forceRender] = useState(0)

  const formattedNameUser = [...new Set(api.map((item) => item.nameUser.toLowerCase()))].map(
    (str) => {
      return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
  )

  const handleFilterChange = (key, value) => {
    filterValues.current[key].value = value
    forceRender((prev) => prev + 1) //update fake state
  }

  const handleCheckboxChange = (index) => {
    setChecked((prev) => {
      const updateChecked = [...prev]

      updateChecked[index] = !updateChecked[index]
      console.log(updateChecked)
      return updateChecked
    })
  }

  const select = (i, name) => {
    return i === 5
      ? formattedNameUser.map((value) => ({ value: value, label: value }))
      : getUniqueFormattedList(api, name).map((value) => ({
          value: value,
          label: value,
        }))
  }

  const getUniqueFormattedList = (data, key) => {
    return [...new Set(data.map((item) => item[key].toLowerCase()))].map((str) =>
      str === 'phòng it' ? 'Phòng IT' : str.charAt(0).toUpperCase() + str.slice(1)
    )
  }

  const onChangeSearchFilter = (e) => {
    const searchLabel = label.map((item) => ({
      ...item,
      show: item.value.toLowerCase().includes(e.target.value.toLowerCase()),
    }))

    setLabel(searchLabel)
  }

  const onChangeDate = (date) => {
    ;(!date || date.length !== 2) && handleFilterChange(2, null)

    handleFilterChange(2, {
      start: dayjs(date[0]).format('YYYY-MM-DD'),
      end: dayjs(date[1]).format('YYYY-MM-DD'),
    })
  }

  const confirm = () => {
    const [roomFilter, groupFilter, dateFilter, stateFilter, statusFilter, userFilter] =
      filterValues.current

    const normalize = (val) => val?.toLowerCase()

    const filter = api
      .filter(
        ({ room, group, startDate, state, status, nameUser }) =>
          (roomFilter.value === null || normalize(room) === normalize(roomFilter.value)) &&
          (groupFilter.value === null || normalize(group) === normalize(groupFilter.value)) &&
          (dateFilter.value === null ||
            dayjs(startDate).isBetween(
              dayjs(dateFilter.value.start),
              dayjs(dateFilter.value.end),
              null,
              '[]'
            )) &&
          (stateFilter.value === null || normalize(state) === normalize(stateFilter.value)) &&
          (statusFilter.value === null || normalize(status) === normalize(statusFilter.value)) &&
          (userFilter.value === null || nameUser === userFilter.value)
      )
      .map((item) => ({
        ...item,
        startDate: item.startDate ? dayjs(item.startDate).format('DD/MM/YYYY') : null,
        deadline: item.deadline ? dayjs(item.deadline).format('DD/MM/YYYY') : null,
      }))

    setOpenDropdown(false)
    setFilterForm(filter.length ? filter : undefined)
  }

  const cancelFilter = () => {
    filterValues.current = filterValues.current.map((item) =>
      item.value !== null ? { ...item, value: null } : item
    )
    setOpenDropdown(false)
    setFilterForm([])
  }

  const countItems = () => {
    return filterForm?.length ? filterForm?.length : dataSource?.length
  }
  console.log(filterForm)

  return (
    <div style={{ padding: 10, background: 'white', borderRadius: 4 }}>
      <form style={{ width: '315px' }}>
        <div>
          <span>Lọc danh sách</span>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div>
          <Input allowClear={true} placeholder="Tìm kiếm" onChange={onChangeSearchFilter} />
        </div>
        <div>
          <span>Theo danh sách</span>
          <br />
          <Badge count={filterForm === undefined ? 0 : countItems()} showZero>
            <button type="button">Tất cả</button>{' '}
          </Badge>
        </div>
        <div>
          <span>Theo trường</span>
          <br />
          {label.map((item, i) => {
            return (
              <>
                {item.key === i && item.show === true ? (
                  <>
                    <Checkbox key={i} checked={checked[i]} onChange={() => handleCheckboxChange(i)}>
                      {item.value}
                    </Checkbox>
                    <br />
                    {i === 2 && checked[i] && (
                      <>
                        <RangePicker
                          picker="date"
                          format="DD/MM/YYYY"
                          id={{
                            start: 'startInput',
                            end: 'endInput',
                          }}
                          onChange={onChangeDate}
                        />
                      </>
                    )}
                    {i !== 2 && checked[i] && (
                      <>
                        <Select
                          showSearch
                          placeholder={`Chọn ${item.value.toLowerCase()}`}
                          optionFilterProp="label"
                          onChange={(value) => handleFilterChange(i, value)}
                          options={select(i, item.name)}
                        />
                        <br />
                      </>
                    )}
                  </>
                ) : null}
              </>
            )
          })}
        </div>
        <button
          disabled={filterForm?.length || filterForm === undefined ? false : true}
          type="button"
          onClick={cancelFilter}
        >
          Bỏ lọc
        </button>
        <button
          disabled={filterValues.current.some((item) => item.value !== null) ? false : true}
          type="button"
          onClick={confirm}
        >
          Áp dụng
        </button>
      </form>
    </div>
  )
}

export default DropdownFilter
