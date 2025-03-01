import React, { useState } from 'react'
import { Modal } from 'antd'

function ModalRow({ openRow, setOpenRow, data }) {
  return (
    <>
      <Modal title={<p>Loading Modal</p>} open={openRow} onCancel={() => setOpenRow(false)}>
        {data && Object.keys(data).map((key) => <p>{data[key]}</p>)}
      </Modal>
    </>
  )
}

export default ModalRow
