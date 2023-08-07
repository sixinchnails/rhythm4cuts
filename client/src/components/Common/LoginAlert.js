import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

function LoginAlert({ isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose} style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div style={{ backgroundColor: "rgba(0, 128, 255, 0.3)", width: "25vw" }}>
                <DialogTitle
                    style={{
                        backgroundColor: "rgba(0, 128, 255, 0.2)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <WarningIcon />
                </DialogTitle>
                <DialogContent
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <p>로그인 후 이용 가능한 서비스입니다.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default LoginAlert;
