"use client";

import { useState } from "react";
import { loginUser } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const result = await loginUser(form);

    if (result.access_token) {
      // Lưu token vào localStorage
      localStorage.setItem("token", result.access_token);
      alert("Đăng nhập thành công!");
      router.push("/dashboard");
    } else {
      alert("Sai thông tin đăng nhập!");
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Đăng nhập</h1>

      <form onSubmit={handleSubmit}>
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

        <button className="bg-green-600 text-white p-2 w-full rounded">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
