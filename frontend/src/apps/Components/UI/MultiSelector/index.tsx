import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { names } from "./constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const MultiSelector = () => {
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <FormControl sx={{ width: 250, height: 50 }}>
      <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        placeholder="Filter"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="Filter" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        // style={{height:50}}
      >
        {names.map((name: string) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelector;
