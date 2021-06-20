module.exports = (req, res) => {
  const selectOptions = [
    {
      id: 1,
      name: '创意类型',
      type: 'type',
      labels: [
        { label: '插画', value: '0' },
        { label: 'C4D', value: '1' },
        { label: '平面', value: '2' },
      ],
      checkedLabels: [],
    },
    {
      id: 2,
      name: '复杂程度',
      type: 'complex',
      labels: [
        { label: '简单', value: '0' },
        { label: '中等', value: '1' },
        { label: '复杂', value: '2' },
      ],
      checkedLabels: [],
    },
    {
      id: 3,
      name: '颜色',
      type: 'color',
      labels: [
        { label: '黑色', value: '0' },
        { label: '黄色', value: '1' },
        { label: '红色', value: '2' },
      ],
      checkedLabels: [],
    },
    {
      id: 4,
      name: '尺寸',
      type: 'size',
      labels: [
        { label: '大', value: '0' },
        { label: '中', value: '1' },
        { label: '小', value: '2' },
      ],
      checkedLabels: [],
    }
  ]
  console.log(req.body)
  const data = {
    status:0,
    result:selectOptions,
    message:'OK'
  }
  return res.json(data);
}