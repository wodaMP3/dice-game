import React from 'react';
import { List, ListItem, Divider, Typography } from '@mui/material';

interface HistoryProps {
  history: { result: number; status: string }[];
}

const HistoryList: React.FC<HistoryProps> = ({ history }) => (
  <List>
    {history.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem>
          <Typography>
            Результат: {item.result} — {item.status}
          </Typography>
        </ListItem>
        {index < history.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </List>
);

export default HistoryList;
