import { observer } from 'mobx-react-lite';
import styles from './Header.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button/Button.tsx';
import userStore from '../../stores/UserStore.ts';

const Header = observer(() => {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const current_user = userStore.currentUser;

    if (!userStore.isAuth) return null;

    const onLogout = () => {
        userStore.logout();
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}></nav>

            <div className={styles.userWrapper}>
                <div
                    className={styles.userInfo}
                    onClick={() => setIsUserOpen((prevState) => !prevState)}
                >
                    <div className={styles.userIcon}>
                        {current_user?.name[0].toUpperCase()}
                        {current_user?.surname[0].toUpperCase()}
                    </div>
                    <div>
                        {current_user?.name} {current_user?.surname}
                    </div>
                    {isUserOpen ? <ChevronUp /> : <ChevronDown />}
                </div>

                <div className={`${styles.userMenu} ${isUserOpen ? styles.open : styles.closed}`}>
                    <div className={styles.userMenuIcon}>
                        {current_user?.name[0].toUpperCase()}
                        {current_user?.surname[0].toUpperCase()}
                    </div>

                    <div className={styles.userMenuName}>
                        {current_user?.name} {current_user?.surname}
                    </div>

                    <div className={styles.userMenuEmail}>{current_user?.email}</div>

                    <Button
                        text="Выйти"
                        isAccent={false}
                        isSubmit={false}
                        className={styles.logoutButton}
                        onClick={onLogout}
                    />
                </div>
            </div>
        </header>
    );
});

export default Header;
