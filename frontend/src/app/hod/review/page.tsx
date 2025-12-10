"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Giả lập dữ liệu chi tiết
const MOCK_DETAIL = {
  id: 101, subject: "Nhập môn Lập trình", code: "IT001", lecturer: "Nguyễn Văn A",
  description: "Môn học cung cấp kiến thức cơ bản về C++.",
  clos: [{ id: 1, content: "Hiểu khái niệm lập trình." }, { id: 2, content: "Vận dụng vòng lặp." }],
  chapters: [{ name: "Chương 1", content: "Giới thiệu..." }, { name: "Chương 2", content: "Biến số..." }],
  comments: []
};

export default function ReviewPage() {
  const router = useRouter();
  const id = useSearchParams().get('id'); // Lấy ID từ URL
  const [comment, setComment] = useState("");
  
  // Hành động giả lập
  const handleApprove = () => { alert("Đã DUYỆT! Chuyển sang AA."); router.push('/hod'); };
  const handleReject = () => { alert("Đã TỪ CHỐI! Trả về GV."); router.push('/hod'); };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      {/* HEADER CÓ NÚT DUYỆT */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <Link href="/hod" className="text-gray-500 hover:text-blue-600 mb-1 inline-block">← Quay lại</Link>
          <h1 className="text-2xl font-bold text-blue-800">Review: {MOCK_DETAIL.subject}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReject} className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 font-bold">Reject</button>
          <button onClick={handleApprove} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-bold">Approve</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CỘT TRÁI: NỘI DUNG ĐỀ CƯƠNG */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Nội dung chi tiết</h2>
          <div className="space-y-4">
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
                    <div className="font-bold">{ch.name}</div>
                    <div className="text-sm text-gray-600">{ch.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: COMMENT (CHO PHÉP NHẬP) */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-bold mb-4">Trao đổi & Góp ý</h3>
          <textarea 
            className="w-full border p-2 rounded mb-3 focus:ring-2 ring-blue-500 outline-none" 
            rows={4} 
            placeholder="Nhập góp ý cho giảng viên..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Gửi góp ý</button>
        </div>
      </div>
    </div>
  );
}