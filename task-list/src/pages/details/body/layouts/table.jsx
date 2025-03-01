import React, { useState } from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: '',
    dataIndex: 'key',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'TÊN CÔNG VIỆC',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'PHÒNG BAN',
    dataIndex: 'room',
    filters: [
      {
        text: 'Cá nhân',
        value: 'Cá nhân',
      },
      {
        text: 'Phòng IT',
        value: 'Phòng IT',
      },
      {
        text: 'Phòng kinh doanh',
        value: 'Phòng kinh doanh',
      },
      {
        text: 'Phòng SEO-Marketing',
        value: 'Phòng SEO-Marketing',
      },
      {
        text: 'Phòng kĩ thuật',
        value: 'Phòng kĩ thuật',
      },
    ],
    onFilter: (value, record) => record.room.indexOf(value) === 0,
  },
  {
    title: 'DỰ ÁN/NHÓM',
    dataIndex: 'group',
    sorter: (a, b) => a.group.localeCompare(b.group), //localeCompare: string1.localeCompare(string2, [locales], [options])
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'NGÀY BẮT ĐẦU',
    dataIndex: 'startDate',
    sorter: (a, b) => {
      const startDateA = a.startDate ? new Date(a.startDate.split('/').reverse().join('-')) : 0
      const startDateB = b.startDate ? new Date(b.startDate.split('/').reverse().join('-')) : 0
      return startDateA - startDateB
    },
  },

  {
    title: 'HẠN HOÀN THÀNH',
    dataIndex: 'deadline',
    sorter: (a, b) => {
      const deadlineA = a.deadline ? new Date(a.deadline.split('/').reverse().join('-')) : 0
      const deadlineB = b.deadline ? new Date(b.deadline.split('/').reverse().join('-')) : 0
      return deadlineA - deadlineB
    },
  },
  {
    title: 'TRẠNG THÁI',
    dataIndex: 'state',
    sorter: (a, b) => a.state.localeCompare(b.state),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'TÌNH TRẠNG',
    dataIndex: 'status',
    filters: [
      {
        text: 'Đã xong đúng hạn',
        value: 'Đã xong đúng hạn',
      },
      {
        text: 'Đã xong trễ hạn',
        value: 'Đã xong trễ hạn',
      },
      {
        text: 'Chưa xong',
        value: 'Chưa xong',
      },
      {
        text: 'Chưa triễn khai',
        value: 'Chưa triễn khai',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'NGƯỜI THỰC HIỆN',
    dataIndex: 'nameUser',
  },
]

function TableLayout({ searchValue, setData, setOpenRow, apiData, filterForm }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const handleRowClick = (record) => {
    setData(record)
    setOpenRow(true)
  }

  const filterFormNotUndefined = () => {
    return filterForm?.length
      ? filterForm?.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      : apiData.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
  }

  const filteredData = () => {
    return filterForm === undefined ? null : filterFormNotUndefined()
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    /* selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          setSelectedRowKeys(newSelectedRowKeys)
        },
      },ko pk
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          setSelectedRowKeys(newSelectedRowKeys)
        },
      },
    ], */
  }

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={filteredData()}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
    />
  )
}

export default TableLayout
