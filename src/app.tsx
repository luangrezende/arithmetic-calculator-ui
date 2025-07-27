import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { useSessionManager } from 'src/hooks/use-session-manager';

export default function App() {
    useScrollToTop();
    useSessionManager();

    return <Router />;
}
