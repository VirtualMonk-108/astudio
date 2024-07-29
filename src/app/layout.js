import './globals.css';
import { AppProvider } from '../context/AppContext';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppProvider>
            <Layout>{children}</Layout>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}