import './globals.css';
import { AppProvider } from '../context/AppContext';
import Layout from '@/components/Layout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  )
}