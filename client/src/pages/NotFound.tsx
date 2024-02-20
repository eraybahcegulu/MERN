import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    ((localStorage.getItem('token')) || (sessionStorage.getItem('token')))
                        ?
                        <Button type="primary" onClick={() => navigate("/home")}>
                            Back to Home
                        </Button>
                        :
                        <Button type="primary" onClick={() => navigate("/")}>
                            Go Login
                        </Button>
                }
            />
        </div>
    );
}

export default NotFound;