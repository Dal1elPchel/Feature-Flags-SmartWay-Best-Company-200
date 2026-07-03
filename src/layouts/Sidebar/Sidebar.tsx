import { Flag, CirclePlus } from 'lucide-react';
import styles from './Sidebar.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isOnAdd = location.pathname === '/add';

    return (
        <aside className={styles.aside}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                <div>
                    <Flag />
                </div>
                <span>Feature Flags</span>
            </div>

            <ul>
                <li>
                    <button
                        className={`${styles.button} ${!isOnAdd ? styles.activeButton : ''}`}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <Flag />
                        Флаги
                    </button>
                </li>
                <li>
                    <button
                        className={`${styles.button} ${isOnAdd ? styles.activeButton : ''}`}
                        onClick={() => {
                            navigate('/add');
                        }}
                    >
                        <CirclePlus />
                        Создать флаг
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
