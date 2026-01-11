"use client"; 

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function DetailContent() {
  // Dùng useSearchParams để bắt được id trên URL (ví dụ: ?id=2)
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [syllabus, setSyllabus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        // MẸO: Gọi API lấy danh sách Pending của AA
        const res = await fetch('http://localhost:8000/workflow/aa/pending');
        if (res.ok) {
          const list = await res.json();
          // Lọc tìm bài có ID trùng với URL
          const found = list.find((item: any) => String(item.id) === String(id));
          setSyllabus(found || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">⏳ Đang tải dữ liệu...</div>;
  
  if (!syllabus) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-2xl font-bold text-red-500 mb-4">❌ Không tìm thấy dữ liệu!</h1>
          <Link href="/aa" className="text-blue-600 hover:underline font-medium">
             &larr; Quay lại danh sách
          </Link>
        </div>
      );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link href="/aa" className="text-gray-500 hover:text-blue-600 mb-6 inline-flex items-center font-medium transition">
        &larr; Quay lại danh sách
      </Link>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border border-gray-200">
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{syllabus.subject || "Chưa có tên môn"}</h1>
                <p className="text-sm text-gray-500 mt-1">ID: {syllabus.id}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm uppercase">
               {syllabus.status}
            </span>
        </div>
        
        <div className="p-8 prose max-w-none text-gray-700">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Thông tin chi tiết:</h3>
            <div className="bg-white p-4 border rounded-lg shadow-sm space-y-2">
               <p><strong>Giảng viên:</strong> {syllabus.lecturer || "N/A"}</p>
               {/* Nếu backend có trả content/description thì hiện, không thì báo trống */}
               <p><strong>Nội dung:</strong> {syllabus.description || syllabus.content || "(Dữ liệu nội dung chưa có trên Server)"}</p>
            </div>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl text-right">
            <button className="text-sm text-blue-600 font-bold hover:underline">
               🖨️ Xuất PDF (Tính năng demo)
            </button>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailContent />
    </Suspense>
  );
}