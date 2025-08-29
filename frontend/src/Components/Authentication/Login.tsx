import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Alert from "../Alert";
import { setUser } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { login } from "../../services/user";
// import { ReactComponent as Waves } from "../../assets/wave.svg";
import Waves from "../../assets/wave.svg";

interface LoginState {
    username: string;
    password: string;
}

interface AlertState {
    show: boolean;
    msg: string
}

const INITIA_STATE: LoginState = {
    username: "",
    password: "",
};

const Login: React.FC = () => {
    const [showPass, setShowPass] = useState(false);
    const [alert, setAlert] = useState<AlertState>({ show: false, msg: "" });
    const [userLogin, setUserLogin] = useState<LoginState>(INITIA_STATE);
    const dispatch = useAppDispatch();
    const history = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
        setUserLogin((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handelSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (userLogin.username.length < 4) {
            setAlert({ msg: "Username is at least 4 characters", show: true })
        } else if (userLogin.password.length < 8) {
            setAlert({
                show: true,
                msg: "Password must be at least 8 characters",
            });
        } else {
            try {
                const data = await login(userLogin);
                if (data) {

                    dispatch(setUser(data));
                }
                history("/");
            } catch (error: any) {
                setAlert({
                    show: true,
                    msg: "Bad credentials ! :)",
                });
            }
        }
    }
    return (
        <section className="flex justify-center">
            <div className="mt-16 rounded-lg p-8 bg-gray-800 max-w-xl text-white">
                <div className="heading-element">
                    <img src="../../images/logo.png"
                        alt="logo"
                        className="mx-auto max-h-16 object-contain mb-2"
                    />
                    <h1 className="text-lg font-bold tracking-wider">
                        Welcome Back, kindly enter your credentials
                        <span className="ml-1 border-b-4 w-20 border-main block"></span>
                    </h1>
                </div>
                <form action="" className="mt-8">
                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your username
                        </label>
                        <input type="text"
                            id="username"
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="your username" value={userLogin.username}
                            onChange={handleChange} required
                        />
                        <span
                            className="absolute z-30 right-2 bottom-2 cursor-pointer"
                            onClick={() => setShowPass((prev) => !prev)}
                        >
                            {!showPass ? (
                                <AiTwotoneEye color="white" size={22} />
                            ) : (
                                <AiTwotoneEyeInvisible color="white" size={22} />
                            )}
                        </span>
                    </div>

                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handelSubmit}
                    >
                        Submit
                    </button>
                </form>
                <div className="mt-2 text-xs font-thin">
                    If you don't have an account, please{" "}
                    <Link
                        to="/auth/register"
                        className="font-semiBold text-blue-500 underline-offset-1 text-lg"
                    >
                        sign up
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 left-0 w-full -z-10 overflow-x-hidden">
                <img style={{ width: "100%", height: "100%" }}  src={Waves}/>
            </div>
            {
                alert.show && <span className="absolute top-1/2 left-1/4 right-0 z-40">
                    <Alert msg={alert.msg} show={setAlert} />
                </span>
            }
        </section>
    )
}

export default Login;