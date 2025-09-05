export type EnrollmentOverviewProps = {
    programId: string;
    orgUnitId: string;
    enrollmentId: string;
    teiId: string;
    programStageId?: string;
    eventId?: string;
    configKey?: string;
    navigate: (url: string) => void;
}
