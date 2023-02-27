import React from 'react';
import { Pie } from '@ant-design/plots';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CircularChart () {
  const data = [
    {
        type: 'English test',
        value: 27,
      },
      {
        type: 'Fluid Mechanics',
        value: 20,
      },
      {
        type: 'Economy',
        value: 16,
      },
      {
        type: 'Mathes Formula',
        value: 11,
      },
      {
        type: 'Physics Quiz',
        value: 9,
      },
      {
        type: 'Alzebra',
        value: 8,
      },
      {
        type: 'Number Series',
        value: 9,
      },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        
      },
    },
  };
  return(
    <Card sx={{ minWidth: 600 }}>
    <CardContent>
<Pie {...config} />
</CardContent>
</Card>
  )
};
