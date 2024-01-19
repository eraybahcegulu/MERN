import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotAuth() {
    const navigate = useNavigate();

    const goLogin = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/")
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={goLogin}>
                        Go Login
                    </Button>
                }
            />
        </div>
    );
}

export default NotAuth;