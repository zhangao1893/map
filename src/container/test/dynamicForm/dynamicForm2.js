import React, { useEffect } from 'react';
import { Form, Input, Button, Space, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Demo = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    // 默认要一个
    form.setFieldsValue({ big1: [{}] });
  }, []);

  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form form={form} onFinish={onFinish} autoComplete="off">
      <Form.List name="big1">
        {(fields, { add, remove }) => {
          console.log(fields);
          return (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => {
                return (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <PlusOutlined onClick={() => add()} />
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      label="前"
                      fieldKey={[fieldKey, 'first']}
                      rules={[{ required: true, message: '请输入' }]}>
                      <TimePicker />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'last']}
                      label="后"
                      fieldKey={[fieldKey, 'last']}
                      rules={[{ required: true, message: '请输入' }]}>
                      <Input placeholder="请输入" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                );
              })}
              {/* <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item> */}
            </>
          );
        }}
      </Form.List>

      <Form.Item label="姓名" name="xm">
        <Input style={{ width: '10vw' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
