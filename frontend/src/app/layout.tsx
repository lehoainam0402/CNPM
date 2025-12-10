import "./globals.css";
import Navbar from "../components/Navbar";


export const metadata = {
  title: "SMD – Syllabus Management",
  description: "Hệ thống quản lý & số hóa giáo trình",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="relative">
        <Navbar />
        <div className="pt-20 pb-16"> {/* chừa chỗ cho navbar + footer */}
          {children}
        </div>
        
      </body>
    </html>
  );
}
