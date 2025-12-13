import React from "react";

interface ToggleTabsProps {
    active: "received" | "sent";
    onChange: (value: "received" | "sent") => void;
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ active, onChange }) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                background: "#F2F2F5",
                padding: "6px",
                borderRadius: "50px",
            }}
        >
            {/* RECEIVED */}
            <div
                onClick={() => onChange("received")}
                style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "40px",
                    cursor: "pointer",
                    transition: "0.3s",
                    background: active === "received" ? "white" : "transparent",
                    fontWeight: 500,
                    color: active === "received" ? "#000" : "#555",
                }}
            >
                Received
            </div>

            {/* SENT */}
            <div
                onClick={() => onChange("sent")}
                style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "40px",
                    cursor: "pointer",
                    transition: "0.3s",
                    background: active === "sent" ? "white" : "transparent",
                    fontWeight: 500,
                    color: active === "sent" ? "#000" : "#555",
                }}
            >
                Sent
            </div>
        </div>
    );
};

export default ToggleTabs;
