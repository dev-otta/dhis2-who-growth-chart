import React, {useState} from "react";
import {Button} from "@dhis2/ui";
import './Plugin.module.css';
import { EnrollmentOverviewProps } from "./Plugin.types";
import {WidgetCollapsible} from "./Components/WidgetCollapsible";
import {EnrollmentViewer} from "./Components/EnrollmentViewer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {buildUrlQueryString} from "./utils/buildURLQueryString";

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const [open, setOpen] = useState(true);

    const {
        programId,
        enrollmentId,
        orgUnitId,
        teiId,
        navigate,
    } = propsFromParent;

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <div style={{
                backgroundColor: 'white',
                width: '100vw',
                display: 'flex',
                margin: 0,
                padding: 0,
            }}>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <WidgetCollapsible
                        header={'Other programs'}
                        borderless={false}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    >
                        <div
                            style={{
                                padding: '15px',
                                paddingTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                            }}
                        >
                            <EnrollmentViewer
                                programId={programId}
                                enrollmentId={enrollmentId}
                                orgUnitId={orgUnitId}
                                teiId={teiId}
                                navigate={navigate}
                            />

                            <div>
                                <Button
                                    primary
                                    onClick={() => navigate(`enrollment?${buildUrlQueryString({
                                        orgUnitId,
                                        teiId,
                                    })}`)}
                                >
                                    Return to dashboard
                                </Button>
                            </div>
                        </div>
                    </WidgetCollapsible>
                </div>
            </div>
        </QueryClientProvider>
    )
}

export default PluginInner;
