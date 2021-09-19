import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import Logo from "../../assets/logo.svg";
import "./Header.css";

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  //Login States
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Register States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleLogin = () => {
    //
  };

  const handleRegister = async () => {
    const registerData = {
      email_address: email,
      first_name: firstName,
      last_name: lastName,
      mobile_number: contactNo,
      password: password,
    };

    const res = await fetch("/api/v1/signup", {
      method: "POST",
      headers: {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    console.log(data);

    if (data.status === "ACTIVE")
      setSuccessMessage("Registration Successful. Please Login!");
  };

  return (
    <div className="header">
      <img className="logo" src={Logo} alt="logo" />
      <div>
        <Button variant="contained" color="primary" className="bookShow">
          Book Show
        </Button>
        <Button variant="contained" color="default" onClick={handleClickOpen}>
          Login
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          {value === 0 && (
            <TabContainer>
              <div className="form">
                <TextField
                  margin="normal"
                  id="username"
                  label="Username"
                  type="email"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <div className="form">
                <TextField
                  margin="normal"
                  id="firstName"
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  id="contactNo"
                  label="Contact No."
                  type="text"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  required
                />
              </div>
              <p>{successMessage}</p>
            </TabContainer>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          {value === 0 && (
            <Button variant="contained" color="primary" onClick={handleLogin}>
              LOGIN
            </Button>
          )}
          {value === 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              REGISTER
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;
