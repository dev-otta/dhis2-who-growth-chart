
export type EnrollmentOverviewProps = {
    programId: string;
    orgtimeUnitId: string;
    enrollmentId: string;
    teiId: string;
    programStageId?: string;
    eventId?: string;
    navigate: (url: string) => void;
}
