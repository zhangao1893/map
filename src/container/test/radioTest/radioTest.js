import React, { useState } from 'react';
import { Form, Checkbox, Radio, Button } from 'antd';

const dataSource = [
  { value: 'a', label: '一' },
  { value: 'b', label: '二' },
  { value: 'c', label: '三' }
];

const dataSource2 = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' }
];
const dataSource3 = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' }
];

export default function radioTest() {
  const [form] = Form.useForm();
  const [arr] = useState([]); // 保存所有多选按钮的名字和值，做成可取消的单选效果

  const onFinish = val => {
    console.log(val);
  };

  const onEventClick = (data, dataArr, name) => {
    if (data.state) {
      form.setFieldsValue({ [name]: undefined });
      dataArr.forEach(item => (item.state = false));
      return;
    }
    data.state = true;
  };

  const checkBoxChange = (name, val) => {
    let flag = true;
    arr.forEach(item => {
      if (item.name === name) flag = false;
    });
    flag && arr.push({ name: name, value: val });
    arr.forEach(item => {
      if (item.name === name) {
        if (val.length === 2) {
          val.splice(val.indexOf(item.value[0]), 1);
          item.value = val;
          form.setFieldsValue({ [name]: val });
        }
      }
    });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="123">
          <Radio.Group>
            {dataSource.map((item, index) => {
              return (
                <Radio value={item.value} key={index} onClick={() => onEventClick(item, dataSource, '123')}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="234">
          <Radio.Group>
            {dataSource2.map((item, index) => {
              return (
                <Radio value={item.value} key={index} onClick={() => onEventClick(item, dataSource2, '234')}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="2222">
          <Checkbox.Group
            onChange={e => {
              checkBoxChange('2222', e);
            }}>
            {dataSource.map((data, index) => {
              return (
                <Checkbox key={index} value={data.value}>
                  {data.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="4444">
          <Checkbox.Group
            onChange={e => {
              checkBoxChange('4444', e);
            }}>
            {dataSource3.map((item, index) => {
              return (
                <Checkbox key={index} value={item.value}>
                  {item.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item>
          <Button size="large" htmlType="submit">
            确认提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
