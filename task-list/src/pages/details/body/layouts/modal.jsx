import React from 'react'
import { Modal } from 'antd'

function ModalRow({ openRow, setOpenRow, record }) {
  console.log(record.owner)

  return (
    <Modal title={<p>{record?.name}</p>} open={openRow} onCancel={() => setOpenRow(false)}>
      {record &&
        Object.keys(record).map((key, i) => {
          return (
            <p key={i}>
              {key === 'owner'
                ? Object.keys(record[key]).map((item) => record[key][item].toString() + '---')
                : record[key].toString()}
            </p>
          )
        })}
    </Modal>
  )
}

export default ModalRow
