"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// --- MOCK DATA ---
interface Syllabus {
  id: number;
  subject: string;
  lecturer: string;
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const MOCK_DATA: Syllabus[] = [
  { id: 101, subject: "Nhập môn Lập trình", lecturer: "Nguyễn Văn A", dateSubmitted: "2023-10-01", status: "Pending" },
  { id: 102, subject: "Cấu trúc dữ liệu", lecturer: "Nguyễn Văn B", dateSubmitted: "2023-10-05", status: "Pending" },
  { id: 103, subject: "Mạng máy tính", lecturer: "Nguyễn Văn C", dateSubmitted: "2023-09-20", status: "Approved" },
];


export default function HODDashboard() {
  const [syllabusList] = useState<Syllabus[]>(MOCK_DATA);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">HOD Dashboard</h1>
        <p className="text-gray-600">Danh sách đề cương môn học chờ duyệt</p>
      </div>
      
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
                  <p className="text-gray-500 text-xs">Gửi ngày: {item.dateSubmitted}</p>
                </td>
                <td className="px-5 py-5 text-sm"><p className="text-gray-900">{item.lecturer}</p></td>
                <td className="px-5 py-5 text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                    ${item.status === 'Pending' ? 'text-yellow-900 bg-yellow-200' : ''}
                    ${item.status === 'Approved' ? 'text-green-900 bg-green-200' : ''}
                    ${item.status === 'Rejected' ? 'text-red-900 bg-red-200' : ''}
                  `}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-5 text-sm">
                  {/*Pending -> Review, Khác -> Detail */}
                  {item.status === 'Pending' ? (
                    <Link 
                      href={`/hod/review?id=${item.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm hover:shadow-md transition-all inline-block text-center"
                    >
                      Review
                    </Link>
                  ) : (
                    <Link 
                      href={`/hod/detail?id=${item.id}`}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-sm hover:shadow-md transition-all inline-block text-center"
                    >
                      Xem CT
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}