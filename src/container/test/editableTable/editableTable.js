import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Form, Button, InputNumber } from 'antd';
import './editableTable.less';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = props => {
  const { title, editable, canEediting, children, dataIndex, inputType, record, handleSave, ...restProps } = props;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (!canEediting) return;
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const inputNode =
    inputType === 'number' ? (
      <InputNumber ref={inputRef} style={{ width: '98%' }} onPressEnter={save} onBlur={save} />
    ) : (
      <Input ref={inputRef} style={{ width: '98%' }} onPressEnter={save} onBlur={save} />
    );
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}>
        {inputNode}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        render: (_, item, index) => `${index + 1}`
        // width: 50
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '30%',
        editable: true
      },
      {
        title: '身份证',
        dataIndex: 'sfz',
        width: '10%',
        editable: true
      },
      {
        title: '职务职级',
        dataIndex: 'address',
        editable: true
      },
      {
        title: '扣发项目',
        children: [
          {
            title: '迟到/早退',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 200
          },
          {
            title: '旷工',
            dataIndex: 'companyName',
            key: 'companyName'
          },
          {
            title: '因私请假',
            dataIndex: 'companyName',
            key: 'companyName'
          },
          {
            title: '扣发金额',
            dataIndex: 'companyName',
            key: 'companyName'
          }
        ]
      }
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0'
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1'
        }
      ],
      count: 2,
      canEediting: false // 控制整个页面能否编辑
    };
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData
    });
  };

  click = () => {
    if (this.state.canEediting) {
      console.log(this.state.dataSource);
    } else {
      this.setState({ canEediting: !this.state.canEediting });
    }
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          canEediting: this.state.canEediting
        })
      };
    });
    return (
      <div className="editableTable">
        <Button onClick={this.click}>{this.state.canEediting ? '保存' : '编辑'}</Button>
        <Table
          style={{ width: '98%', margin: '5vh auto' }}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}
export default EditableTable;
