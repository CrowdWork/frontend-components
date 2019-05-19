import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957'),
  createData('YEBOAH v TSE AND ANOTHER', '3 WALR', 'WALR', '1957')
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Case Name</TableCell>
            <TableCell align="right">Citation</TableCell>
            <TableCell align="right">Document Type</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell align="right">{n.calories}</TableCell>
              <TableCell align="right">{n.fat}</TableCell>
              <TableCell align="right">{n.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);