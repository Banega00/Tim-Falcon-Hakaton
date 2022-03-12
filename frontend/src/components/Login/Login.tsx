import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { ResponseModel } from "../../models/ResponseModel";

export const Login = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [serverResponse, setServerResponse] = useState<ResponseModel>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login, loginWithGoogle } = useAuth();

  const handleLogin = () => {
    const email = emailInput.current?.value
    const password = passwordInput.current?.value
    login(email!, password!).then((response: ResponseModel) => {
      localStorage.setItem('user', JSON.stringify({ name: 'pera' }))
      navigate((state as any)?.path || "/home");
    }).catch((error: ResponseModel) => {
      setServerResponse(error);
    });
  };

  const handleGoogleLogin = () => {
    const childWindow = window.open('http://localhost:3000/login/google', "mywindow", "location=1,status=1,scrollbars=1, width=800,height=800");
    
    let timer: NodeJS.Timeout | null = null;
    if(childWindow){
      timer = setInterval(() =>{
        if(childWindow.closed){
          if(timer) clearInterval(timer)
          navigate("/home")
        }
      }, 500)
    }
  }

  return (
    <div>
      <label htmlFor="email">Email:
        <input ref={emailInput} type="text" name="email" />
      </label>
      <label htmlFor="password">Password:
        <input ref={passwordInput} type="password" name="password" />
      </label>
      <button onClick={handleLogin}>Log in</button>
      <button onClick={handleGoogleLogin}>Sing in with google</button>

      {/* if server response exists log it*/}
      {serverResponse && <div>{serverResponse.payload.message}</div>}
    </div>
  );
};