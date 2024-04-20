import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from './componnent/SidebarComponent/sideBar';
import Navbar from './componnent/NavbarComponent/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
