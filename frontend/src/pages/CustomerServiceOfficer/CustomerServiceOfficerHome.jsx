import { useState } from 'react';
import { Table, Box, rem } from '@mantine/core';
import UserNavBar from "../General/UserNavBar";

function CustomerServiceOfficerHome() {
    const titleStyle = {
        marginTop: rem(-75),
        textAlign: 'center',
    }

    const lineStyle = {
        width: '80%',             // Adjust the width as needed, e.g., '50%' of the container width
        margin: '0 auto',         // Center the horizontal line horizontally
        border: '1px solid #ccc', // Add a border to the line
      };

    const elements = [
        { ID: 829430, date: '08/09/2023', detail: "The app crashes every time I try to open a large image file." },
        { ID: 398438, date: '08/09/2023', detail: "My photos appear pixelated after editing." },
        { ID: 394343, date: '08/09/2023', detail: "The save button doesn't respond." },
        { ID: 564324, date: '08/09/2023', detail: "The app is too slow when applying effects." },
        { ID: 582443, date: '08/09/2023', detail: "I can't find my edited photos in the gallery." },
      ];

      const rows = elements.map((element) => (
        <tr key={element.ID}>
          <td style={{textAlign: 'left'}}>{element.ID}</td>
          <td style={{textAlign: 'left'}}>{element.date}</td>
          <td style={{textAlign: 'left'}}>{element.detail}</td>
        </tr>
      ));

    return (
        <div>
            <UserNavBar />
            <h2 style={titleStyle}>Customer Service Office Dashboard</h2>
            <hr style={lineStyle}/>
            <Box maw={600} mx="auto">
                <Table>
                <thead>
                    <tr>
                    <th>Customer ID</th>
                    <th>Date</th>
                    <th>Complaint</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
                </Table>
            </Box>
        </div>
    );
}

export default CustomerServiceOfficerHome;
