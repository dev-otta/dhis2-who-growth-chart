export type EnrollmentOverviewProps = {
    programId: string;
    enrollmentId: string;
    teiId: string;
    programStageId?: string;
    eventId?: string;
    navigate: (url: string) => void;
}
