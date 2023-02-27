import { Column } from '@ant-design/plots';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ColumnChart () {
  const data = [
    
    {
      type: 'Success',
      payment: 10,
    },
    {
      type: 'Cancelled',
      payment: 38,
    },
    {
      type: 'Pending',
      payment: 30,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'payment',
   
    
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
       
        
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    
  };
  return (
    <Card sx={{ minWidth: 600 }}>
    <CardContent>
    <Column {...config} />
</CardContent>
</Card>
  );
};

