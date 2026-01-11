"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function DetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [syllabus, setSyllabus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // LẤY DỮ LIỆU TỪ BACKEND
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        // Vẫn dùng mẹo lấy từ list pending để hiển thị
        const res = await fetch('http://localhost:8000/workflow/hod/pending');
        if (res.ok) {
          const data = await res.json();
          const found = data.find((item: any) => String(item.id) === String(id));
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

  if (loading) return <div className="p-10 text-center">⏳ Đang tải...</div>;
  if (!syllabus) return <div className="p-10 text-center text-red-500">❌ Không tìm thấy dữ liệu.</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      {/* HEADER CHỈ CÓ TIÊU ĐỀ */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <Link href="/hod" className="text-gray-500 hover:text-blue-600 mb-1 inline-block">← Quay lại Dashboard</Link>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold text-gray-800">Chi tiết: {syllabus.subject || "Chưa có tên"}</h1>
             {/* Hiển thị status động theo dữ liệu thật */}
             <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded border border-gray-200 uppercase">
                {syllabus.status}
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CỘT TRÁI: NỘI DUNG (READ ONLY) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md opacity-90">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Nội dung lưu trữ</h2>
          <div className="space-y-4 text-gray-600">
            <p><strong>ID:</strong> {syllabus.id}</p>
            <p><strong>Giảng viên:</strong> {syllabus.lecturer || "N/A"}</p>
            {syllabus.description && <p><strong>Mô tả:</strong> {syllabus.description}</p>}
            
            <div>
              <strong>CLOs:</strong>
              {syllabus.clos && syllabus.clos.length > 0 ? (
                <ul className="list-disc pl-5 mt-1">{syllabus.clos.map((c: any) => <li key={c.id}>{c.content}</li>)}</ul>
              ) : <p className="text-gray-400 italic text-sm">(Chưa có dữ liệu)</p>}
            </div>

            <div>
              <strong>Chương trình học:</strong>
              <div className="mt-2 space-y-2">
                {syllabus.chapters && syllabus.chapters.length > 0 ? (
                  syllabus.chapters.map((ch: any, i: number) => (
                    <div key={i} className="bg-gray-50 p-3 rounded border">
                      <div className="font-bold text-gray-700">{ch.name}</div>
                      <div className="text-sm">{ch.content}</div>
                    </div>
                  ))
                ) : <p className="text-gray-400 italic text-sm">(Chưa có dữ liệu)</p>}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: LỊCH SỬ TRAO ĐỔI */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-bold mb-4 text-gray-700">Lịch sử trao đổi</h3>
          <div className="space-y-3">
            {syllabus.comments && syllabus.comments.length > 0 ? syllabus.comments.map((c: any, i: number) => (
               <div key={i} className="bg-gray-100 p-3 rounded text-sm">
                 <div className="font-bold text-blue-600">{c.user} <span className="text-gray-400 font-normal text-xs">- {c.date}</span></div>
                 <div>{c.text}</div>
               </div>
            )) : <p className="text-gray-400 italic">Không có trao đổi nào (Dữ liệu chưa có).</p>}
          </div>
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