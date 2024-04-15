import { useRef, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { signupUserAsync } from "../../slices/userActions";
import { setCredentials } from "../../slices/userAuthSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const errorDivRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (e) => {
        const emailValue = e.target.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(emailValue));
        setEmail(emailValue);
        setEmailError(emailValue ? "" : "Email is blank or in an invalid format.");

        setTimeout(() => {
            setEmailError("");
        }, 6000);
    };

    const validatePassword = (e) => {
        const passwordValue = e.target.value.trim();
        setValidPassword(passwordValue.length >= 4);
        setPassword(passwordValue);
        setPasswordError(passwordValue ? "" : "Password must be at least four characters long.");

        setTimeout(() => {
            setPasswordError("");
        }, 6000);
    };

    const showError = (message, color = "red") => {
        errorDivRef.current.classList.remove("hidden");
        errorDivRef.current.innerHTML = `<h1>${message}</h1>`;
        errorDivRef.current.style.backgroundColor = color;
        errorDivRef.current.classList.add("show");
        setTimeout(() => {
            errorDivRef.current.classList.add("hidden");
        }, 6000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validEmail && validPassword) {
            const response = await dispatch(signupUserAsync({ email, password }));
            if (response.error) {
                showError(response.error.message);
            } else {
                dispatch(setCredentials(response));
                showError("Signup successful...", "green");
                setTimeout(() => {
                    navigate("/");
                }, 6000);
            }
        } else {
            showError("Invalid entry! Please check the values..");
        }
    };

    return (
        <div className="signup-container">
            <div className="errorDiv hidden" id="errorDiv" ref={errorDivRef}>
                
            </div>
            <div className="from-container relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-5 py-10 bg-black md:mx-0 shadow sm:p-10 formElem">
                    <div className="max-w-md mx-auto text-white">
                        <div className="flex items-center space-x-5 justify-center">
                            <h1 className="font-bold text-5xl text-gray-400">Signup</h1>
                        </div>
                        <div className="mt-5">
                            <div className="signup-inputContainer mb-6">
                                <input
                                    placeholder="email or username"
                                    type="text"
                                    className="signup-fInput email"
                                    onChange={(e) => validateEmail(e)}
                                    value={email}
                                />
                                <span className="text-red-600 text-sm absolute top-14">{emailError}</span>
                            </div>
                            <div className="signup-inputContainer mb-6">
                                <input
                                    placeholder="password"
                                    type="password"
                                    className="signup-fInput password"
                                    onChange={(e) => validatePassword(e)}
                                    value={password}
                                />
                                <span className="text-red-600 text-sm absolute top-14">{passwordError}</span>
                            </div>
                        </div>
                        <div className="mt-5 w-1/2 mx-auto">
                            <button className="signup" type="submit" onClick={handleSubmit}>
                                Sign up
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-4 w-1/2 mx-auto">
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                            <a className="text-xs text-customBlue uppercase hover:underline" href="/">
                                or LOGIN
                            </a>
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
