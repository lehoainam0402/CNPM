📘 CNPM – Syllabus Management & Digitalization System (SMD)

Hệ thống quản lý và số hóa giáo trình (SMD) hỗ trợ giảng viên và khoa trong việc tạo – duyệt – tra cứu syllabus.
Dự án gồm 3 phần chính:

Backend Python (FastAPI) – Authentication, API chính

Frontend Web (Next.js) – Giao diện cho người dùng

AI Service – Xử lý NLP / tự động gợi ý nội dung (chưa kích hoạt)

🛠️ Technologies Used

Backend: Python FastAPI, SQLAlchemy, JWT

Frontend Web: Next.js (React), TypeScript, TailwindCSS

AI Service: Python + FastAPI, NLP/ML models

Database: MySQL / PostgreSQL

Tools: Git, GitHub, Docker (optional)

🚀 Setup (Basic)
1️⃣ Clone project
git clone https://github.com/your-username/CNPM.git
cd CNPM

2️⃣ Backend (FastAPI)
cd backend-python
pip install -r requirements.txt
uvicorn app.main:app --reload


Mặc định chạy tại:

http://127.0.0.1:8000
http://127.0.0.1:8000/docs   # Swagger UI

3️⃣ Frontend Web (Next.js)
cd frontend
npm install
npm run dev


Chạy tại:

http://localhost:3000

4️⃣ AI Service (nếu sử dụng)
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload

📌 Project Status

 Tạo cấu trúc dự án

 Backend FastAPI chạy đăng ký / đăng nhập

 Frontend kết nối với backend

 Thiết kế bảng dữ liệu môn học, syllabus

 Chức năng quản lý syllabus

 Tích hợp AI

 Viết tài liệu đầy đủ

👥 Authors

Course: Công Nghệ Phần Mềm – UT HCMC
Members: (Cập nhật sau)

📄 License

Dự án phục vụ mục đích học tập.
