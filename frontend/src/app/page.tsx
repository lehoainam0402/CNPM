"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen bg-[url('/smd-hero.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-black/60 p-10 rounded-xl text-center text-white max-w-xl">
        <h1 className="text-3xl font-bold mb-3">
          SMD – Syllabus Management & Digitization
        </h1>
        <p className="text-lg mb-6">Hệ thống quản lý & số hóa giáo trình</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white transition-all"
          >
            Đăng nhập
          </button>

          <button
            onClick={() => router.push("/register")}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg text-black transition-all"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </main>
  );
}
