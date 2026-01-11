"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Component con chứa logic chính (để bọc trong Suspense)
function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Lấy ID từ URL

  // State để chứa dữ liệu thật từ Backend
  const [syllabus, setSyllabus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  // 1. LẤY DỮ LIỆU TỪ BACKEND KHI VÀO TRANG
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        // Mẹo: Gọi list pending và tìm bài có ID tương ứng (vì chưa có API get detail riêng)
        const res = await fetch('http://localhost:8000/workflow/hod/pending');
        if (res.ok) {
          const data = await res.json();
          // Tìm bài có ID khớp với URL
          const found = data.find((item: any) => String(item.id) === String(id));
          setSyllabus(found || null);
        }
      } catch (error) {
        console.error("Lỗi kết nối:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 2. XỬ LÝ DUYỆT (GỌI API)
  const handleApprove = async () => {
    if (!confirm("Bạn chắc chắn muốn DUYỆT đề cương này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/workflow/hod/approve/${id}`, { method: 'POST' });
      if (res.ok) {
        alert("✅ Đã DUYỆT thành công! Chuyển sang AA.");
        router.push('/hod');
      } else {
        alert("Lỗi Server khi duyệt.");
      }
    } catch (err) {
      alert("Lỗi kết nối Backend.");
    }
  };

  // 3. XỬ LÝ TỪ CHỐI (GỌI API)
  const handleReject = async () => {
    const reason = prompt("Nhập lý do từ chối (bắt buộc):");
    if (!reason) return;

    try {
      // Backend yêu cầu gửi lý do qua query param
      const res = await fetch(`http://localhost:8000/workflow/hod/reject/${id}?reason=${encodeURIComponent(reason)}`, { method: 'POST' });
      if (res.ok) {
        alert("🚫 Đã TỪ CHỐI! Trả về GV.");
        router.push('/hod');
      } else {
        alert("Lỗi Server khi từ chối.");
      }
    } catch (err) {
      alert("Lỗi kết nối Backend.");
    }
  };

  // Giao diện khi đang tải hoặc không tìm thấy
  if (loading) return <div className="p-10 text-center">⏳ Đang tải dữ liệu từ Server...</div>;
  if (!syllabus) return <div className="p-10 text-center text-red-500">❌ Không tìm thấy đề cương ID: {id}</div>;

  // --- GIAO DIỆN CHÍNH (GIỮ NGUYÊN UI CỦA BẠN) ---
  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      {/* HEADER CÓ NÚT DUYỆT */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <Link href="/hod" className="text-gray-500 hover:text-blue-600 mb-1 inline-block">← Quay lại</Link>
          <h1 className="text-2xl font-bold text-blue-800">Review: {syllabus.subject || "Chưa có tên môn"}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReject} className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 font-bold transition">Reject</button>
          <button onClick={handleApprove} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-bold transition">Approve</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CỘT TRÁI: NỘI DUNG ĐỀ CƯƠNG */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Nội dung chi tiết</h2>
          <div className="space-y-4">
            <p><strong>ID Hệ thống:</strong> {syllabus.id}</p>
            <p><strong>Giảng viên:</strong> {syllabus.lecturer || "N/A"}</p>
            <p><strong>Trạng thái:</strong> <span className="text-blue-600 font-bold">{syllabus.status}</span></p>
            
            {/* Vì Backend hiện tại chưa trả về CLOs/Chapters, ta kiểm tra nếu có thì hiện, không thì báo trống */}
            {syllabus.description && <p><strong>Mô tả:</strong> {syllabus.description}</p>}
            
            <div>
              <strong>CLOs:</strong>
              {syllabus.clos && syllabus.clos.length > 0 ? (
                <ul className="list-disc pl-5 mt-1">{syllabus.clos.map((c: any) => <li key={c.id}>{c.content}</li>)}</ul>
              ) : (
                <p className="text-gray-400 italic text-sm mt-1">(Dữ liệu CLOs chưa có trên Backend)</p>
              )}
            </div>

            <div>
              <strong>Chương trình học:</strong>
              <div className="mt-2 space-y-2">
                {syllabus.chapters && syllabus.chapters.length > 0 ? (
                  syllabus.chapters.map((ch: any, i: number) => (
                    <div key={i} className="bg-gray-50 p-3 rounded border">
                      <div className="font-bold">{ch.name}</div>
                      <div className="text-sm text-gray-600">{ch.content}</div>
                    </div>
                  ))
                ) : (
                   <p className="text-gray-400 italic text-sm">(Dữ liệu chương trình học chưa có trên Backend)</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: COMMENT */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-bold mb-4">Trao đổi & Góp ý</h3>
          <textarea 
            className="w-full border p-2 rounded mb-3 focus:ring-2 ring-blue-500 outline-none" 
            rows={4} 
            placeholder="Nhập góp ý cho giảng viên..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Gửi góp ý</button>
        </div>
      </div>
    </div>
  );
}

// Export bọc Suspense để tránh lỗi build Next.js
export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <ReviewContent />
    </Suspense>
  );
}