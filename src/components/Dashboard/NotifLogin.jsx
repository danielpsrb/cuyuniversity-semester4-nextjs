"use client"
import React, {useState, useEffect} from 'react'
import LoginSuccessMessage from './LoginSucessMessage'
import { authUserSession } from "@/services/auth-services";

const NotifLogin = async () => {

  const [isLoginMessageShown, setLoginMessageShown] = useState(false);

  const user = await authUserSession();

  useEffect(() => {
    const fetchData = async () => {
      const user = await authUserSession();
      if (user && !isLoginMessageShown) {
        setLoginMessageShown(true);
        // Tambahkan logika atau efek yang diperlukan setelah tampil
        // Contoh: console.log("Login message displayed!");
      }
    };

    fetchData();
  }, [isLoginMessageShown]);

  return (
    <>
      {user && isLoginMessageShown && <LoginSuccessMessage />}
    </>
  )
}

export default NotifLogin