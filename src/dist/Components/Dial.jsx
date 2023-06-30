import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const actions = [
  { icon: <SmartToyIcon />, name: 'Customer Service' }
];

export default function Dial() {
    return (
      <div style={{  position: 'fixed', bottom: '20px', right: '20px'}}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon />}
          direction="up"
          FabProps={{
            color: 'primary',
            size: 'large',
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </div>
    );
};
