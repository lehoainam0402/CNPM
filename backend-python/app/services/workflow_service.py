from fastapi import HTTPException

# <MOCK DATABASE>
syllabus_db = [
    {
        "id": 1,
        "subject_name": "Introduction to Programming",
        "status": "DRAFT",
        "note": None
    },
    {
        "id": 2,
        "subject_name": "Database Systems",
        "status": "PENDING_HOD",
        "note": None
    }
]


class WorkflowService:

    # <LECTURER>
    def submit_to_hod(self, syllabus_id: int):
        syllabus = self._find_syllabus(syllabus_id)

        if syllabus["status"] != "DRAFT":
            raise HTTPException(
                status_code=400,
                detail="Only DRAFT syllabus can be submitted"
            )

        syllabus["status"] = "PENDING_HOD"
        return {
            "message": "Syllabus submitted to HoD",
            "data": syllabus
        }

    # <HOD>
    def get_pending_hod(self):
        return [
            s for s in syllabus_db
            if s["status"] == "PENDING_HOD"
        ]

    def hod_approve(self, syllabus_id: int):
        syllabus = self._find_syllabus(syllabus_id)

        if syllabus["status"] != "PENDING_HOD":
            raise HTTPException(
                status_code=400,
                detail="Syllabus is not waiting for HoD approval"
            )

        syllabus["status"] = "PENDING_AA"
        return {
            "message": "Approved by HoD, sent to Academic Affairs",
            "data": syllabus
        }

    def hod_reject(self, syllabus_id: int, reason: str):
        syllabus = self._find_syllabus(syllabus_id)

        if syllabus["status"] != "PENDING_HOD":
            raise HTTPException(
                status_code=400,
                detail="Syllabus is not waiting for HoD approval"
            )

        syllabus["status"] = "REJECTED_BY_HOD"
        syllabus["note"] = reason

        return {
            "message": "Rejected by HoD",
            "data": syllabus
        }

    # <ACADEMIC AFFAIRS>
  
    def get_pending_aa(self):
        return [
            s for s in syllabus_db
            if s["status"] == "PENDING_AA"
        ]

    def aa_approve(self, syllabus_id: int):
        syllabus = self._find_syllabus(syllabus_id)

        if syllabus["status"] != "PENDING_AA":
            raise HTTPException(
                status_code=400,
                detail="Syllabus is not waiting for AA approval"
            )

        syllabus["status"] = "APPROVED"
        return {
            "message": "Final approved by Academic Affairs",
            "data": syllabus
        }

    def aa_reject(self, syllabus_id: int, reason: str):
        syllabus = self._find_syllabus(syllabus_id)

        if syllabus["status"] != "PENDING_AA":
            raise HTTPException(
                status_code=400,
                detail="Syllabus is not waiting for AA approval"
            )

        syllabus["status"] = "REJECTED_BY_AA"
        syllabus["note"] = reason

        return {
            "message": "Rejected by Academic Affairs",
            "data": syllabus
        }

    # <HELPER>
    def _find_syllabus(self, syllabus_id: int):
        for s in syllabus_db:
            if s["id"] == syllabus_id:
                return s
        raise HTTPException(
            status_code=404,
            detail="Syllabus not found"
        )