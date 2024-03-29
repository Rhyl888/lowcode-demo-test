import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import SettingFormItemInput from '../../common/setting-form-item/input';
import { ItemType } from '../../item-type';
import { useComponetsStore } from '../../stores/components';

const componentSettingMap = {
  [ItemType.Button]: [{
    name: 'type',
    label: '按钮类型',
    type: 'select',
    options: [{ label: '主按钮', value: 'primary' }, { label: '次按钮', value: 'default' }],
  }, {
    name: 'text',
    label: '文本',
    type: 'input',
  }],
  [ItemType.Space]: [
    {
      name: 'size',
      label: '间距大小',
      type: 'select',
      options: [
        { label: '大', value: 'large' },
        { label: '中', value: 'middle' },
        { label: '小', value: 'small' },
      ],
    },
  ],
}

const ComponentAttr = () => {

  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentProps } = useComponetsStore();

  useEffect(() => {
    // 初始化表单
    form.setFieldsValue(curComponent?.props);
  }, [curComponent])

  // 监听表单值变化，更新组件属性
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  /**
 * 动态渲染表单元素
 * @param setting 元素配置
 * @returns 
 */
  function renderFormElememt(setting: any) {
    const { type, options } = setting;

    if (type === 'select') {
      return (
        <Select options={options} />
      )
    } else if (type === 'input') {
      return (
        <SettingFormItemInput />
      )
    }
  }

  if (!curComponentId || !curComponent) return null;

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="组件id">
        <Input value={curComponent.id} disabled />
      </Form.Item>
      {(componentSettingMap[curComponent?.name] || []).map(setting => {
        return (
          <Form.Item key={setting.name} name={setting.name} label={setting.label}>
            {renderFormElememt(setting)}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default ComponentAttr;