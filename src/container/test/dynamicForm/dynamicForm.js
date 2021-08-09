import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
};

const DynamicFieldSet = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <Form.List
        name="listName"
        rules={[
          {
            validator: async (_, names) => {
              console.log(_);
              console.log(names); // 数组，每个的值
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            }
          }
        ]}>
        {(fields, { add, remove }, { errors }) => {
          console.log(fields);
          return (
            <>
              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Form.Item
                    {...field}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field."
                      }
                    ]}
                    noStyle>
                    <Input placeholder="passenger name" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                  Add field
                </Button>
                <Button
                  type="dashed"
                  onClick={() => {
                    add('我加的默认值', 1); // defaultValue,insertIndex
                  }}
                  style={{ width: '60%', marginTop: '20px' }}
                  icon={<PlusOutlined />}>
                  可以指定在队列某个位置插入一项
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicFieldSet;
