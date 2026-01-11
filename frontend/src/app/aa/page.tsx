"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AADashboard() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        // GỌI API 
        const res = await fetch('http://localhost:8000/workflow/aa/pending');
        
        if (!res.ok) throw new Error("Lỗi kết nối backend");
        
        const data = await res.json();
        setList(data); // Backend trả về list, lưu thẳng vào state
      } catch (error) {
        console.error(error);
        // Nếu lỗi thì để list rỗng hoặc alert
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  if (loading) return <div className="p-8">Đang tải danh sách từ Backend...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">AA Dashboard (Real Data)</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {list.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Hiện không có đề cương nào cần duyệt.</div>
        ) : (
          <table className="min-w-full leading-normal">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-5 py-3 text-left font-bold text-blue-800">ID</th>
                {/* ⚠️ Lưu ý: Kiểm tra xem backend trả về key là 'subject' hay 'syllabus_name' để sửa ở dưới */}
                <th className="px-5 py-3 text-left font-bold text-blue-800">Môn học</th> 
                <th className="px-5 py-3 text-left font-bold text-blue-800">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-4 font-bold">{item.id}</td>
                  <td className="px-5 py-4">{item.subject || item.syllabus_name || "Chưa có tên"}</td>
                  <td className="px-5 py-4">
                    <Link 
                      href={`/aa/review/${item.id}`} 
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
                    >
                      Kiểm tra
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}