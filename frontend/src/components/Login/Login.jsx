import {  useEffect, useRef, useState } from "react";
import "./Login.css"; // Import styles from Login.css
import { loginUserAsync } from "../../slices/userActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/userAuthSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const errorDivRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.userInfo);

    useEffect(() => {
        if(userInfo){
            navigate("/home");
        }
    });

    const validateEmail = (e) => {
        const emailValue = e.target.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(emailValue));
        setEmail(emailValue);
        setEmailError(emailValue ? "" : "Email is blank or in an invalid format.");
        
        setTimeout(() => {
            setEmailError("");
        }, 6000);
    }
    
    const validatePassword = (e) => {
        const passwordValue = e.target.value.trim();
        setValidPassword(passwordValue.length >= 4); 
        setPassword(passwordValue);
        setPasswordError(passwordValue ? "" : "Password must be at least four characters long.");
    
        setTimeout(() => {
            setPasswordError("");
        }, 6000);
    }    

    const showError = (message, color = "red") => {
        errorDivRef.current.classList.remove("hidden");
        errorDivRef.current.innerHTML = `<h1>${message}</h1>`;
        errorDivRef.current.style.backgroundColor = color;
        errorDivRef.current.classList.add("show");
        setTimeout(() => {
            errorDivRef.current.classList.add("hidden");
        }, 6000);
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (validEmail && validPassword) {
            const response = await dispatch(loginUserAsync({ email, password }));
            if (response.error) {
                showError(response.error.message);
            } else {
                dispatch(setCredentials(response));
                showError("Login successful...", "green");
                setTimeout(() => {
                    navigate("/home");
                }, 6000);
            }
        } else {
            showError("Invalid entry! Please check the values..");
        }
    };


    return (
        <div className="login-main flex justify-center items-center">
            <div className="errorDiv hidden" id="errorDiv" ref={errorDivRef}>
                
            </div>
            <div className="login-form flex flex-col items-center justify-center">
                <div className="flex justify-center img-container">
                    <img
                        src="/src/assets/images/inbox-zero-dark-377cc25a227f.svg"
                        height={'50rem'}
                        width={'400rem'}
                        alt="Image not loaded"
                    />
                </div>

                <form className="form" onSubmit={loginSubmit}>
                    <p className="login">User Login</p>
                    <div className="inputContainer mb-3">
                        <input
                            placeholder="email or username"
                            type="text"
                            className="fInput email"
                            onChange={(e) => { validateEmail(e) }}
                            value={email}
                        />
                    <span className="text-red-600 text-sm absolute top-14">{emailError}</span>
                    </div>
                    <div className="inputContainer top-4">
                        <input
                            placeholder="password"
                            type="password"
                            className="fInput password"
                            onChange={(e) => { validatePassword(e) }}
                            value={password}
                        />
                    <span className="text-red-600 text-sm absolute top-14">{passwordError}</span>
                    </div>
                    <button type="submit" className="forget">Login</button>
                    <div className="con">
                        <p>dont have account?&nbsp;</p>
                        <a href="/signup"> sign in</a>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;
