// components/StockTable.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
const StockTable = ({ stocks}) => {
  return (
  
    
    <TableContainer component={Paper} style={{ margin: '20px 0' }}>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Stock Name</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell align="right"><strong>Price ($)</strong></TableCell>
            <TableCell align="right"><strong>Change (%)</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.length >0 ?(
             stocks.map((stock:any, index:any) => (
              <TableRow key={index} hover>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.type}</TableCell>
                <TableCell align="right">${stock.price}</TableCell>
                <TableCell align="right">{stock.change_percent}%</TableCell>
                <TableCell align="right">{stock.change_percent}%</TableCell>
              </TableRow>
            ))
          ):(
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1" color="textSecondary">
                  Search above to add data in table.
                </Typography>
              </TableCell>
            </TableRow>
          )}
         
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
