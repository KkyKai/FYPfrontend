import React from 'react';
import { Box, Text, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';

const TotalRevenueTable = () => {
  const data = [
    { date: '2023-09-19', revenue: 1000, customers: 10 },
    { date: '2023-09-20', revenue: 2000, customers: 20 },
    { date: '2023-09-21', revenue: 3000, customers: 30 },
  ];

  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalCustomersSubscribed = data.reduce((acc, curr) => acc + curr.customers, 0);

  const monthlyData = data.reduce((acc, curr) => {
    const month = curr.date.split('-')[1];
    if (!acc[month]) {
      acc[month] = {
        revenue: 0,
        customers: 0,
      };
    }
    acc[month].revenue += curr.revenue;
    acc[month].customers += curr.customers;
    return acc;
  }, {});

  return (
    <Box>
      <Table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Customers subscribed</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(monthlyData).map(([month, item]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{item.revenue} USD</td>
              <td>{item.customers}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>{totalRevenue} USD</td>
            <td>{totalCustomersSubscribed}</td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default TotalRevenueTable;
