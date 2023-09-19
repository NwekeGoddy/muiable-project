import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Typography,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

interface Country {
  id: string;
  code: string;
  name: string;
  nameUn: string;
  continent: string;
  hasStates: boolean;
}

interface TableComponentProps {
  countries: Country[];
}

const TableComponent: React.FC<TableComponentProps> = ({ countries }) => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [continentFilter, setContinentFilter] = useState('');
  const [hasStatesFilter, setHasStatesFilter] = useState<boolean | null>(null);

  const handleSort = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (direction === 'asc') {
        return a.nameUn.localeCompare(b.nameUn);
      } else {
        return b.nameUn.localeCompare(a.nameUn);
      }
    });
    setFilteredCountries(sortedCountries);
  };

  const handleContinentFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setContinentFilter(value);
    filterCountries(value, hasStatesFilter);
  };

  const handleHasStatesFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setHasStatesFilter(value);
    filterCountries(continentFilter, value);
  };

  const filterCountries = (continent: string, hasStates: boolean | null) => {
    const filtered = countries.filter((country) => {
      if (continent && !country.continent.toLowerCase().includes(continent.toLowerCase())) {
        return false;
      }
      if (hasStates !== null && country.hasStates !== hasStates) {
        return false;
      }
      return true;
    });
    setFilteredCountries(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Filter by Continent"
        onChange={handleContinentFilter}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{ endAdornment: <SortIcon /> }}
        sx={{ mb: 2 }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <IconButton onClick={handleSort} color="primary">
          <SortIcon style={{ transform: sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        </IconButton>
        <FormControlLabel
          control={
            <Switch
              checked={hasStatesFilter === true}
              onChange={handleHasStatesFilter}
              color="primary"
              sx={{ marginLeft: '12px' }}
            />
          }
          label={hasStatesFilter === null ? 'Both States' : hasStatesFilter ? 'Has States' : 'No States'}
        />
      </div>
      <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '100%', marginTop: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Country Code</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Country Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Continent</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Has States</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.id} sx={{ transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.continent}</TableCell>
                <TableCell>{country.hasStates ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
