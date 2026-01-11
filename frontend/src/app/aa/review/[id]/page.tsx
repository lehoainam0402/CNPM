"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function ReviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Lấy ID dạng ?id=...
  const router = useRouter();

  // State hiển thị thông tin
  const [syllabus, setSyllabus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch dữ liệu để hiển thị trước khi duyệt
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/workflow/aa/pending');
        if (res.ok) {
          const list = await res.json();
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


  // --- HÀM DUYỆT (APPROVE) ---
  const handleApprove = async () => {
    if (!confirm("Bạn có chắc chắn muốn DUYỆT đề cương này?")) return;

    try {
      const res = await fetch(`http://localhost:8000/workflow/aa/approve/${id}`, {
        method: 'POST',
      });

      if (res.ok) {
        alert("✅ Đã duyệt thành công! Quy trình hoàn tất.");
        router.push('/aa'); 
      } else {
        const err = await res.json();
        alert("❌ Lỗi: " + JSON.stringify(err));
      }
    } catch (error) {
      alert("Không thể kết nối Server");
    }
  };

  // --- HÀM TỪ CHỐI (REJECT) ---
  const handleReject = async () => {
    const reason = prompt("Vui lòng nhập lý do từ chối:");
    if (!reason) return; 

    try {
      const url = `http://localhost:8000/workflow/aa/reject/${id}?reason=${encodeURIComponent(reason)}`;
      const res = await fetch(url, { method: 'POST' });

      if (res.ok) {
        alert("⛔ Đã từ chối đề cương!");
        router.push('/aa');
      } else {
        const err = await res.json();
        alert("❌ Lỗi: " + JSON.stringify(err));
      }
    } catch (error) {
        console.error(error);
        alert("Lỗi kết nối");
    }
  };

  if (loading) return <div className="p-8 text-center">Đang tải thông tin đề cương...</div>;
  if (!syllabus) return <div className="p-8 text-center text-red-500">Không tìm thấy ID: {id}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link href="/aa" className="text-gray-500 mb-6 inline-block hover:text-blue-600">&larr; Quay lại danh sách</Link>
      
      <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500 max-w-3xl mx-auto">
        <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Duyệt Đề Cương</h1>
            <p className="text-gray-500">ID Hệ thống: {id}</p>
        </div>
        
        {/* Vùng hiển thị nội dung THẬT từ Server */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
           <div className="grid grid-cols-1 gap-4">
                <div>
                    <span className="font-bold text-gray-700 block">Tên môn học:</span>
                    <span className="text-xl text-blue-900 font-semibold">{syllabus.subject || "Chưa có tên"}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-700 block">Giảng viên phụ trách:</span>
                    <span>{syllabus.lecturer || "N/A"}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-700 block">Trạng thái hiện tại:</span>
                    <span className="text-orange-600 font-bold uppercase">{syllabus.status}</span>
                </div>
                {/* Phần Description nếu có */}
                {syllabus.description && (
                    <div className="mt-2 pt-2 border-t">
                        <span className="font-bold text-gray-700 block">Mô tả:</span>
                        <p className="text-gray-600">{syllabus.description}</p>
                    </div>
                )}
           </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleApprove}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-bold text-lg shadow transition transform hover:-translate-y-1"
          >
            ✅ Approve (Duyệt)
          </button>
          
          <button 
            onClick={handleReject}
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 font-bold text-lg shadow transition transform hover:-translate-y-1"
          >
            ❌ Reject (Từ chối)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReviewContent />
        </Suspense>
    )
}