import React, { useState } from 'react'
import { Modal } from 'antd'

function ModalRow({ openRow, setOpenRow, data }) {
  // const [loading, setLoading] = useState(true)

  // Hàm để kích hoạt loading
  /* const showLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false) // Dừng loading sau 1 giây
    }, 1000)
  } */

  return (
    <>
      <Modal
        title={<p>Loading Modal</p>}
        open={openRow}
        onCancel={() => setOpenRow(false)}
        /* afterOpenChange={(visible) => {
          if (visible) showLoading() // Bắt đầu loading khi modal mở
        }} */
      >
        <p>{data?.name}</p>
        <p>{data?.room}</p>
        <p>{data?.group}</p>
        <p>{data?.startDate}</p>
        <p>{data?.nameUser}</p>
      </Modal>
    </>
  )
}

export default ModalRow
