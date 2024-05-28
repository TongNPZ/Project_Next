import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/componnent/AuthContext/AuthContext';

const ProtectRoute = ({ children, requireRoles = [] }) => {
    const router = useRouter();
    const { authData } = useAuth();

    const role = authData.role;

    if (router.pathname !== '/house_view') {
        return children;
    }

    if (!authData.token && router.pathname !== '/house_view') {
        router.push('/');
    }

    const matchRoles = !requireRoles.length || requireRoles.includes(role);

    if (!matchRoles) {
        return router.push('/');;
    }

    return children;

};
export default ProtectRoute;