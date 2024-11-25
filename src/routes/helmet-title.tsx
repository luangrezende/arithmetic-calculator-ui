import { Helmet } from 'react-helmet-async';

export const HelmetTitle = ({ title }: { title: string }) => (
    <Helmet>
        <title>{title}</title>
    </Helmet>
);
