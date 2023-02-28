import { Container, Typography } from '@mui/material';
import React from 'react';
import OwnerLayout from '../../../layouts/owner-layout';

import Upper from '../../../components/owner/dashboard/upper';
import Chart from '../../../components/owner/dashboard/piechart';
import ColumnChart from '../../../components/owner/dashboard/coloumchart';
import CircularChart from '../../../components/owner/dashboard/circularpiechart';
import PaymentGraph from '../../../components/owner/dashboard/graph';
import {  Grid } from "@nextui-org/react";


export default function OwnerDasboad() {
  return (
    <OwnerLayout>
     
      <br/>
      <Upper/><br/>
      <Chart/><br/>
      <CircularChart/><br/>
      <ColumnChart/><br/>
      <PaymentGraph/>
    </OwnerLayout>
  )
}
