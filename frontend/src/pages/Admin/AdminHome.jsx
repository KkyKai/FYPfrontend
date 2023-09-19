import React from 'react';
import { Box, Text, Table, rem } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";

const AdminHome = () => {

  const titleStyle = {
    marginTop: rem(-75),
    textAlign: 'center',
}

const lineStyle = {
  width: '80%',             // Adjust the width as needed, e.g., '50%' of the container width
  margin: '0 auto',         // Center the horizontal line horizontally
  border: '1px solid #ccc', // Add a border to the line
};

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
      <UserNavBar />
      <h2 style={titleStyle}>Admin Dashboard</h2>
      <hr style={lineStyle}/>
      <Box maw={600} mx="auto">
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
                <td style={{textAlign: 'left'}}>{month}</td>
                <td style={{textAlign: 'left'}}>{item.revenue} SGD</td>
                <td style={{textAlign: 'left'}}>{item.customers}</td>
              </tr>
            ))}
            <tr>
              <td style={{textAlign: 'left'}}>Total</td>
              <td style={{textAlign: 'left'}}>{totalRevenue} SGD</td>
              <td style={{textAlign: 'left'}}>{totalCustomersSubscribed}</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AdminHome;
