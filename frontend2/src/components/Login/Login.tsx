import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { ResponseModel } from "../../models/ResponseModel";
import styles from './Login.module.scss'
import styles1 from '../SpeciesPage/SpeciesPage.module.scss';
import { HttpService } from "../../utils/HttpService";

export const Login = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [serverResponse, setServerResponse] = useState<ResponseModel>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();

  const handleLogin = () => {
    const email = emailInput.current?.value
    const password = passwordInput.current?.value
    login(email!, password!).then((response: ResponseModel) => {
      HttpService.checkAuth()
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data.payload.user))
          navigate(-1);
        })
        .catch(responst => {
        });
    }).catch((error: ResponseModel) => {
      setServerResponse(error);
    });
  };

  const handleGoogleLogin = () => {
    const childWindow = window.open('http://localhost:3000/login/google', "mywindow", "location=1,status=1,scrollbars=1, width=800,height=800");

    let timer: NodeJS.Timeout | null = null;
    if (childWindow) {
      timer = setInterval(() => {
        if (childWindow.closed) {
          if (timer) clearInterval(timer)
          HttpService.checkAuth()
            .then(response => {
              localStorage.setItem("user", JSON.stringify(response.data.payload.user))
              navigate((state as any)?.path || "/");
            })
            .catch(responst => {
            });
            navigate(-1);
        }
      }, 500)
    }
  }

  return (
    <div className={styles1.container}>
      <div className={styles1.main + " " + styles.main}>
        <h1>LOGIN</h1>
        <label htmlFor="email">
          <input ref={emailInput} placeholder={"Email"} type="text" name="email" />
        </label>
        <label htmlFor="password">
          <input ref={passwordInput} placeholder={"Password"} type="password" name="password" />
        </label>
        <button className={styles.loginBtn} onClick={handleLogin}>Log in</button>
        <button className={styles.signinBtn} onClick={handleGoogleLogin}>Sing in with google</button>

        {/* if server response exists log it*/}
        {serverResponse && <div><p className={styles.error}>{serverResponse.payload.message}</p></div>}
      </div>
    </div>
  );
};