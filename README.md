# 📘 CNPM – Syllabus Management & Digitalization System (SMD)

Dự án xây dựng hệ thống **quản lý và số hóa giáo trình (SMD)** bao gồm nhiều thành phần: Backend, Frontend, Mobile App và AI Service. Mục tiêu là tạo nền tảng tập trung giúp giảng viên, bộ môn và sinh viên tra cứu – cập nhật – duyệt syllabus một cách hiệu quả.

---

## 📂 Project Structure

```
CNPM/
│
├── backend/           # Java Spring Boot backend service
├── ai-service/        # Python FastAPI + AI processing service
├── frontend-web/      # Web client (React/NextJS)
├── frontend-mobile/   # Mobile app (React Native)
├── database/          # Database schema, migration scripts
└── docs/              # UML diagrams, SRS, design documents
```

---

## 🛠️ Technologies Used

* **Backend:** Java Spring Boot, MySQL, Redis
* **Frontend Web:** ReactJS / NextJS
* **Mobile App:** React Native
* **AI Service:** Python, FastAPI, Celery, NLP models
* **Database:** MySQL / PostgreSQL + Redis cache
* **Tools:** Docker, Git, GitHub

---

## 🚀 Setup (Basic)

### 1️⃣ Clone project

```
git clone https://github.com/your-username/CNPM.git
cd CNPM
```

### 2️⃣ Backend (Spring Boot)

Chạy bằng IDE (IntelliJ/Eclipse) hoặc:

```
cd backend
mvn spring-boot:run
```

### 3️⃣ Frontend Web

```
cd frontend-web
npm install
npm start
```

### 4️⃣ AI Service

```
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📌 Project Status

* [x] Project structure initialized
* [ ] Backend development
* [ ] Frontend web development
* [ ] AI service integration
* [ ] Mobile app development
* [ ] Documentation

---

## 👥 Authors

Project for **Course: CNPM**
University: *University of Transport Ho Chi Minh City*
Members: *Update later*

---

## 📄 License

This project is for educational purposes.

---
