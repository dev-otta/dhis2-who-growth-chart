export type EnrollmentOverviewProps = {
    programId: string;
    orgUnitId: string;
    enrollmentId: string;
    teiId: string;
    programStageId?: string;
    eventId?: string;
    navigate: (url: string) => void;
}
