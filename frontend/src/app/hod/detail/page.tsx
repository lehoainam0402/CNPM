"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Giả lập dữ liệu (Thường thì sẽ call API lấy chi tiết theo ID)
const MOCK_DETAIL = {
  id: 103, subject: "Mạng máy tính", code: "IT003", lecturer: "Nguyễn Văn C",
  description: "Môn học về các tầng mạng OSI, TCP/IP.",
  clos: [{ id: 1, content: "Hiểu mô hình OSI." }, { id: 2, content: "Cấu hình Router cơ bản." }],
  chapters: [{ name: "Chương 1", content: "Tổng quan mạng" }, { name: "Chương 2", content: "Tầng ứng dụng" }],
  // Lịch sử comment cũ (nếu có)
  comments: [{ user: "HOD", text: "Đã sửa lại CLO 2 cho phù hợp.", date: "2023-09-22" }]
};

export default function DetailPage() {
  const id = useSearchParams().get('id');

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      {/* HEADER CHỈ CÓ TIÊU ĐỀ (KHÔNG CÓ ACTION) */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <Link href="/hod" className="text-gray-500 hover:text-blue-600 mb-1 inline-block">← Quay lại Dashboard</Link>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold text-gray-800">Chi tiết: {MOCK_DETAIL.subject}</h1>
             <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200">ĐÃ DUYỆT</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CỘT TRÁI: NỘI DUNG (READ ONLY) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md opacity-90"> {/* Thêm opacity nhẹ để cảm giác tĩnh */}
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Nội dung lưu trữ</h2>
          <div className="space-y-4 text-gray-600">
            <p><strong>Mã môn:</strong> {MOCK_DETAIL.code}</p>
            <p><strong>Mô tả:</strong> {MOCK_DETAIL.description}</p>
            <div>
              <strong>CLOs:</strong>
              <ul className="list-disc pl-5 mt-1">{MOCK_DETAIL.clos.map(c => <li key={c.id}>{c.content}</li>)}</ul>
            </div>
            <div>
              <strong>Chương trình học:</strong>
              <div className="mt-2 space-y-2">
                {MOCK_DETAIL.chapters.map((ch, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded border">
                    <div className="font-bold text-gray-700">{ch.name}</div>
                    <div className="text-sm">{ch.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: LỊCH SỬ TRAO ĐỔI (CHỈ XEM) */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-bold mb-4 text-gray-700">Lịch sử trao đổi</h3>
          <div className="space-y-3">
            {MOCK_DETAIL.comments.length > 0 ? MOCK_DETAIL.comments.map((c, i) => (
               <div key={i} className="bg-gray-100 p-3 rounded text-sm">
                 <div className="font-bold text-blue-600">{c.user} <span className="text-gray-400 font-normal text-xs">- {c.date}</span></div>
                 <div>{c.text}</div>
               </div>
            )) : <p className="text-gray-400 italic">Không có trao đổi nào.</p>}
          </div>
          {/* Không có Textarea nhập liệu ở đây */}
        </div>
      </div>
    </div>
  );
}