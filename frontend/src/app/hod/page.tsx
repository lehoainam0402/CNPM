"use client";

import React, { useState, useEffect } from 'react'; // Thêm useEffect
import Link from 'next/link';

interface Syllabus {
  id: number;
  subject: string;
  lecturer: string; // Lưu ý: Backend phải trả về trường này, nếu không sẽ bị trống
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function HODDashboard() {
  // 1. Đổi state để hứng dữ liệu từ API (ban đầu là rỗng)
  const [syllabusList, setSyllabusList] = useState<Syllabus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Dùng useEffect để gọi API thật khi mở trang
  useEffect(() => {
    const fetchHODData = async () => {
      try {
        // Gọi đúng đường dẫn HOD của backend
        const res = await fetch('http://localhost:8000/workflow/hod/pending');
        
        if (!res.ok) throw new Error("Không thể lấy dữ liệu từ Backend");
        
        const data = await res.json();
        setSyllabusList(data);
      } catch (err) {
        console.error(err);
        setError("Lỗi kết nối hoặc Backend chưa bật.");
      } finally {
        setLoading(false);
      }
    };

    fetchHODData();
  }, []);

  // 3. Giao diện khi đang tải hoặc lỗi
  if (loading) return <div className="p-8 text-center">Đang tải dữ liệu thật...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">HOD Dashboard (Real Data)</h1>
        <p className="text-gray-600">Danh sách đề cương môn học chờ duyệt</p>
      </div>
      
      {/* Kiểm tra nếu danh sách rỗng */}
      {syllabusList.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
          Hiện không có đề cương nào cần duyệt.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Môn học</th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Giảng viên</th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {syllabusList.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-5 text-sm"><p className="text-gray-900 font-bold">{item.id}</p></td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 font-semibold text-base mb-1">{item.subject}</p>
                    {/* Nếu backend có trả dateSubmitted thì hiện, không thì ẩn đi */}
                    {item.dateSubmitted && <p className="text-gray-500 text-xs">Gửi ngày: {item.dateSubmitted}</p>}
                  </td>
                  <td className="px-5 py-5 text-sm"><p className="text-gray-900">{item.lecturer || "N/A"}</p></td>
                  <td className="px-5 py-5 text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                      ${item.status === 'Pending' ? 'text-yellow-900 bg-yellow-200' : ''}
                      ${item.status === 'Approved' ? 'text-green-900 bg-green-200' : ''}
                      ${item.status === 'Rejected' ? 'text-red-900 bg-red-200' : ''}
                      ${!['Pending', 'Approved', 'Rejected'].includes(item.status) ? 'text-gray-900 bg-gray-200' : ''}
                    `}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    {/* Logic nút bấm */}
                    <Link 
                      href={`/hod/review?id=${item.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm hover:shadow-md transition-all inline-block text-center"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}