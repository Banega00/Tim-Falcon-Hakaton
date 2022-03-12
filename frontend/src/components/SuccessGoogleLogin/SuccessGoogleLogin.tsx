import React, { useEffect } from 'react';

export const SuccessGoogleLogin:React.FC<any> = (props) => {
    useEffect(()=>{
        setTimeout(() =>{
            window.close()
        },1500)
    }, [])
    return (
        <div>
            Success Google Login!
        </div>
    );
}
