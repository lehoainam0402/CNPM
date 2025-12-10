"use client";

import { useState } from "react";
import { registerUser } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const result = await registerUser(form);

    if (result.success) {
      alert("Đăng ký thành công!");
      router.push("/login");
    } else {
      alert(result.message);
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Đăng ký</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="p-2 border w-full mb-3"
          placeholder="Họ tên"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          className="p-2 border w-full mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="p-2 border w-full mb-3"
          placeholder="Mật khẩu"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white p-2 w-full rounded">
          Đăng ký
        </button>
      </form>
    </div>
  );
}
