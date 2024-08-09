"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Icon } from "@mui/material";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Header from "./Header";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  px: 2.5,

  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,

  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const links = [
  {
    link: "dashboard",
    label: "DashBoard",
    icon: "dashboard",
    role: ["ADMIN", "OWNER"],
  },
  {
    link: "books",
    label: "Books",
    icon: "books",
    role: ["ADMIN"],
  },
  {
    link: "owners",
    label: "Owners",
    icon: "owner",
    role: ["ADMIN"],
  },
  {
    label: "Book Upload",
    link: "book-upload",
    icon: "books",
    role: ["OWNER"],
  },
  {
    label: "other",
    link: "other",
    icon: "other",
    role: ["ADMIN", "OWNER"],
  },
];

const links_bottoms = [
  {
    link: "notification",
    label: "Notification",
    icon: "notification",
    role: ["ADMIN", "OWNER"],
  },
  {
    link: "settings",
    label: "Settings",
    icon: "settings",
    role: ["ADMIN", "OWNER"],
  },
  {
    link: "Login as Admin",
    label: "Login as Admin",
    icon: "user",
    role: ["ADMIN", "OWNER"],
  },
];

export default function ({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const session = useSession();

  const pathName = usePathname();

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#171B36",
            borderRadius: 3,
            color: "white",

            ...(open && { px: 2 }),
          },
        }}
      >
        <DrawerHeader
          sx={{
            ...(!open && { justifyContent: "center" }),
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              ...(!open && { display: "none" }),
              color: "#00ABFF",
            }}
          >
            <Icon
              sx={{
                textAlign: "center",
                width: 40,
                height: 29,
              }}
            >
              <img
                style={{
                  display: "flex",
                  height: "inherit",
                  width: "inherit",
                }}
                src={`/book-logo-xs.svg`}
              />
            </Icon>
            <Typography>Book Rent</Typography>
          </Box>
        </DrawerHeader>
        <Divider color="gray" />
        <List>
          {links.map((text, index) => {
            if (text.role.includes(session?.data?.user.role)) {
              return (
                <ListItem
                  key={text.link}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <NavLink href={`/${text.link}`}>
                    <ListItemButton
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: "white",
                        backgroundColor: "inherit",
                        borderRadius: 1.5,
                        ":hover": {
                          backgroundColor: "#00ABFF40",
                        },
                        my: 0.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Icon
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <img
                            style={{
                              display: "flex",
                              height: "inherit",
                              width: "inherit",
                            }}
                            src={`/icons/${text.icon}.svg`}
                          />
                        </Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={text.label}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            }

            return null;
          })}
        </List>
        <Divider color="gray" />
        <List>
          {links_bottoms.map((text, index) => (
            <ListItem key={text.link} disablePadding sx={{ display: "block" }}>
              <NavLink href={`/${text.link}`}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "white",
                    backgroundColor: "inherit",
                    borderRadius: 1.5,
                    ":hover": {
                      backgroundColor: "#00ABFF40",
                    },
                    my: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{
                          display: "flex",
                          height: "inherit",
                          width: "inherit",
                        }}
                        src={`/icons/${text.icon}.svg`}
                      />
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={text.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Button
          sx={{
            background: "#FFFFFF33",
            textTransform: "none",
            color: "white",
          }}
          onClick={() => signOut()}
        >
          <Icon
            sx={{
              textAlign: "center",
              height: 0.7,
              display: "flex",
              alignItems: "center",
              ...(!open && { display: "none" }),
            }}
          >
            <img
              style={{
                display: "flex",
                height: "inherit",
                width: "inherit",
              }}
              src={`/icons/Logout.svg`}
            />
          </Icon>
          Logout
        </Button>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, color: "gray", width: "100%", px: 3 }}
      >
        <Box
          sx={{
            p: 1.7,
            my: 0.9,
            display: "flex",
            justifyItems: "center",
            width: "100%",
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >
          <Header />
        </Box>

        {children}
      </Box>
    </Box>
  );
}
