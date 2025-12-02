"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Chào mừng bạn đến Dashboard!</h1>
    </div>
  );
}
