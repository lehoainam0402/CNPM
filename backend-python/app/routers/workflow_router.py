from fastapi import APIRouter, Query
from app.services.workflow_service import WorkflowService

router = APIRouter(
    prefix="/workflow",
    tags=["Workflow"]
)

workflow_service = WorkflowService()

# <LECTURER>
@router.post("/lecturer/submit/{syllabus_id}")
def submit_syllabus(syllabus_id: int):
    """
    Lecturer submits syllabus to HoD
    """
    return workflow_service.submit_to_hod(syllabus_id)


# <HOD>
@router.get("/hod/pending")
def hod_pending():
    """
    HoD views syllabuses waiting for review
    """
    return workflow_service.get_pending_hod()


@router.post("/hod/approve/{syllabus_id}")
def hod_approve(syllabus_id: int):
    """
    HoD approves syllabus -> send to Academic Affairs
    """
    return workflow_service.hod_approve(syllabus_id)


@router.post("/hod/reject/{syllabus_id}")
def hod_reject(
    syllabus_id: int,
    reason: str = Query(..., description="Reason for rejection")
):
    """
    HoD rejects syllabus
    """
    return workflow_service.hod_reject(syllabus_id, reason)


# <ACADEMIC AFFAIRS>
@router.get("/aa/pending")
def aa_pending():
    """
    Academic Affairs views syllabuses waiting for final approval
    """
    return workflow_service.get_pending_aa()


@router.post("/aa/approve/{syllabus_id}")
def aa_approve(syllabus_id: int):
    """
    Academic Affairs final approval
    """
    return workflow_service.aa_approve(syllabus_id)


@router.post("/aa/reject/{syllabus_id}")
def aa_reject(
    syllabus_id: int,
    reason: str = Query(..., description="Reason for rejection")
):
    """
    Academic Affairs rejects syllabus
    """
    return workflow_service.aa_reject(syllabus_id, reason)
