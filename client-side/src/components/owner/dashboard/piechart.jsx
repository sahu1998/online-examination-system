import { Pie } from '@ant-design/plots';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Chart() {
  const data = [
    {
      type: 'English test',
      value: 27,
    },
    {
      type: 'Fluid Mechanics',
      value: 25,
    },
    {
      type: 'Economy',
      value: 18,
    },
    {
      type: 'Mathes Formula',
      value: 15,
    },
    {
      type: 'Physics Quiz',
      value: 10,
    },
    {
      type: 'Alzebra',
      value: 10,
    },
    {
      type: 'Number Series',
      value: 9,
    },
  ];
  const config = {
    appendPadding: 0,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <Card sx={{ minWidth: 600 }}>
      <CardContent>
  <Pie {...config} />
  </CardContent>
  </Card>
  ) 
};


