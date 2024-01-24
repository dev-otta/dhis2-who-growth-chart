import React from "react";
import {Button} from "@dhis2/ui";
import {buildUrlQueryString} from "../../utils/buildURLQueryString";
import {useEnrollmentViewer} from "./useEnrollmentViewer";

type Props = {
    programId: string,
    enrollmentId: string,
    orgUnitId: string,
    teiId: string,
    navigate: (url: string) => void,
};

export const EnrollmentViewer = ({
    programId,
    orgUnitId,
    teiId,
    navigate,
}: Props) => {
    const {
        enrollments,
        isError,
        isLoading,
        error,
    } = useEnrollmentViewer({ teiId, programId })

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError || error) {
        return <p>Error: {JSON.stringify(error, null, 2)}</p>
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
            }}
        >
            {enrollments.length > 0 ? enrollments?.map((enrollment: any) => {
                return (
                    <div
                        key={enrollment.enrollment}
                    >
                        <Button
                            secondary
                            onClick={() => navigate(`enrollment?${buildUrlQueryString({
                                programId: enrollment.programId,
                                enrollmentId: enrollment.enrollment,
                                orgUnitId,
                                teiId,
                            })}`)}
                        >
                            {enrollment.displayName}
                        </Button>
                    </div>
                );
            }) : (
                <p>This person has no other enrollments</p>
            )}
        </div>
    );
}
