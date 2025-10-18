'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface CustomRulesDialogProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function CustomRulesDialog({ open, value, onChange, onClose, onSave }: CustomRulesDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Custom Rules</DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <TextField
          multiline
          minRows={8}
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your custom rules here..."
        />
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}


