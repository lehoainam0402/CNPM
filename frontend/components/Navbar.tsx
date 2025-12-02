export default function Navbar() {
  return (
    <nav className="w-full bg-black/60 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <h1 className="text-xl font-bold">SMD</h1>

      <ul className="flex gap-6 text-sm">
        <li className="hover:text-gray-300 cursor-pointer">Trang chủ</li>
        <li className="hover:text-gray-300 cursor-pointer">Giới thiệu</li>
        <li className="hover:text-gray-300 cursor-pointer">Liên hệ</li>
      </ul>
    </nav>
  );
}
