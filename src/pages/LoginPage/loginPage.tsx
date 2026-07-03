import styles from "./loginPage.module.scss";
import {observer} from "mobx-react-lite";
import userStore from "../../stores/UserStore.ts";
import {useForm} from "react-hook-form";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {AlertCircle} from "lucide-react";
import {useNavigate} from "react-router-dom";
import InfoMessage from "../../components/InfoMessage/InfoMessage.tsx";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = observer(() => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        await userStore.loginUser(data.email, data.password);

        if (userStore.isAuth) navigate("/");
    }

    return (
        <>
            <div className={styles.background}>

                <div className={styles.top}></div>

                <div className={styles.loginContainer}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                        <h1>Feature Flags MVP</h1>
                        <p>Вход в систему управления флагами</p>

                        {userStore.error && (
                            <InfoMessage message={userStore.error}
                                         status={"error"}
                                         onClose={() => {userStore.setErrorNull()}}/>
                        )}

                        {userStore.loading && (
                            <InfoMessage message={"Загрузка, пожалуйста подождите..."} status={"loading"}/>
                        )}


                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <Input
                                id="email"
                                typeInput="text"
                                {...register("email", {
                                    required: "Email is needed!",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Введите корректный email"
                                    }
                                })}
                            />
                        </div>
                        {errors.email && <div className={styles.errorText}><AlertCircle/>{errors.email.message}</div>}

                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="password">Пароль</label>
                            <Input
                                id="password"
                                typeInput="password"
                                {...register("password", {
                                    required: "Password is needed!",
                                    minLength: {
                                        value: 6,
                                        message: "Минимум 6 символов"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Максимум 20 символов"
                                    }
                                })}
                            />
                        </div>
                        {errors.password && <div className={styles.errorText}><AlertCircle/>{errors.password.message}</div>}

                        <Button text={"Войти"} isAccent isSubmit/>
                    </form>
                </div>
            </div>
        </>

    );
});

export default LoginPage;