import React, {useState} from "react";
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link, useLocation} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import {FloatButton} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import "../Menu/MenuAppBar.css"
import {Sensors} from "@mui/icons-material";

export default function MenuAppBar() {
    const location = useLocation();
    const [isOpened, setIsOpened] = useState(false);
    const color = "#000";


    const toggleDrawer = () => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsOpened(!isOpened);
    };

    return (
        <>
            <FloatButton className="float-btn" onClick={toggleDrawer()} icon={<MenuOutlined/>} shape={"square"}/>

            <Drawer anchor="left" open={isOpened} onClose={toggleDrawer()}>
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleDrawer()}
                    onKeyDown={toggleDrawer()}
                >
                    <List>
                        {[
                            {name: "Dashboard", route: "/", iconEle: <DashboardIcon/>},
                            {name: "Profile", route: "/profile", iconEle: <PersonIcon/>},
                            {
                                name: "Data Sensor",
                                route: "/datatable",
                                iconEle: <Sensors/>,
                            },
                            {
                                name: "Events",
                                route: "/events",
                                iconEle: <ManageHistoryIcon/>,
                            },
                        ].map((val, idx) => (
                            <Link
                                key={idx}
                                to={val.route}
                                style={{
                                    color:
                                        location.pathname === val.route
                                            ? "rgb(0, 127, 255)"
                                            : color,
                                    textDecoration: "none",
                                }}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon
                                            style={{
                                                color:
                                                    location.pathname === val.route
                                                        ? "rgb(0, 127, 255)"
                                                        : color,
                                            }}
                                        >
                                            {val.iconEle}
                                        </ListItemIcon>
                                        <ListItemText primary={val.name}/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}