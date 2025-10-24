import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { ThemeProvider } from '@context/ThemeContext';
import { NotificationProvider } from '@context/NotificationContext';
import { BookingProvider } from '@context/BookingContext';
import { ToastProvider } from '@components/feedback';
import router from './router';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BookingProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </BookingProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
