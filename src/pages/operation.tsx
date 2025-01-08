import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OperationView } from 'src/sections/operation/view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Operations - ${CONFIG.appName}`}</title>
            </Helmet>

            <OperationView />
        </>
    );
}
