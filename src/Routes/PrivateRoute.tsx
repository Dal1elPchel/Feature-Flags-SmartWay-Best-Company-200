import userStore from '../stores/UserStore.ts';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import InfoMessage from '../components/UI/InfoMessage/InfoMessage.tsx';

const PrivateRoute = observer(() => {
    if (!userStore.isInitialized) {
        return <InfoMessage message={'Загрузка профиля...'} status={'loading'} />;
    }

    if (!userStore.isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
});

export default PrivateRoute;
