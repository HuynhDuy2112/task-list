import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal, DatePicker, Form, Input, Select } from 'antd'
const { RangePicker } = DatePicker

const AddField = forwardRef(({ apiData }, ref) => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    showModal: () => {
      form.resetFields()
      setOpen((prev) => !prev)
    },
    hideModal: () => setOpen((prev) => !prev),
  }))

  console.log(apiData)

  return (
    <Modal
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen((prev) => !prev)}
      title="Tạo Công Việc"
      okText="Tạo công việc"
      cancelText="Hủy"
    >
      <Form
        form={form}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          variant: 'filled',
        }}
        onFinish={(value) => console.log(value)}
      >
        <Form.Item
          label="Input"
          name="Input"
          rules={[
            {
              required: true,
              message: 'Please input!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Select"
          name="Select"
          rules={[
            {
              required: true,
              message: 'Please input!',
            },
          ]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="RangePicker"
          name="RangePicker"
          rules={[
            {
              required: true,
              message: 'Please input!',
            },
          ]}
        >
          <RangePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default AddField
