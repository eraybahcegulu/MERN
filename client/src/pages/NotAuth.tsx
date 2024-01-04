import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotAuth() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Go Login
                    </Button>
                }
            />
        </div>
    );
}

export default NotAuth;