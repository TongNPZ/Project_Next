"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './componnent/AuthContext/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">&copy; 2024 Company Name</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#">Privacy</a></li>
              <li className="list-inline-item"><a href="#">Terms</a></li>
              <li className="list-inline-item"><a href="#">Support</a></li>
            </ul>
          </footer>
        </body>
      </html>
    </AuthProvider>
  );
}
