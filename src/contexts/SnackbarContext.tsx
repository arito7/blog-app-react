import { Alert, Snackbar } from '@mui/material';
import { useContext, useState, createContext } from 'react';

type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

interface SnackbarContext {
  setOpen: (open: boolean) => void;
  setSeverity: (severity: SnackbarSeverity) => void;
  setMessage: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContext>(null!);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<SnackbarSeverity>('success');
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    e?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const value = {
    setOpen,
    setSeverity,
    setMessage,
  };

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): any {
  return useContext(SnackbarContext);
}
