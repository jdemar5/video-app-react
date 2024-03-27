import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PortraitIcon from "@mui/icons-material/Portrait";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  background-color: ${({ theme }) => theme.soft};
  position: fixed;
  right: 25px;
  top: 56px;
  z-index: 998;
  color: ${({ theme }) => theme.text};
  width: 300px;
  height: 415px;
  border-radius: 15px;
`;

const Wrapper = styled.div``;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 20px;

  &:hover {
    background-color: ${({ theme }) => theme.softer};
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 20px 20px;
`;

const Hr = styled.hr`
  margin: 10px 20px;
  border: 0.5px solid ${({ theme }) => theme.softer};
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const TitleGoogle = styled.h1`
    position absolute;
    top: 50px;
    left: 80px;
    font-size: 12px;
    font-weight: 300;
    color: #6bbfff;
    margin-bottom: 0px;
    margin-top: 0px;
`;

const TitleUserName = styled.h1`
    position absolute;
    top: 20px;
    left: 80px;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 0px;
    margin-top: 0px;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #999;
`;

const Profile = ({ darkMode, setDarkMode, setOpenP }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = () => {
    setOpenP(false);
    document.body.style.overflow = "auto";
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(logout());
    handleClose();
    navigate(`/`);
  };

  return (
    <Container ref={menuRef}>
      <Wrapper>
        <Head>
          <Avatar src={currentUser.img} />
          <TitleUserName>{currentUser.name}</TitleUserName>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <TitleGoogle>Manage your Google Account</TitleGoogle>
          </Link>
        </Head>
        <Hr />
        {currentUser ? (
          <>
            <Link
              onClick={handleClose}
              to={`/channel/${currentUser._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                <PortraitIcon />
                <Title>Your Channel</Title>
              </Item>
            </Link>
          </>
        ) : (
          <>
            <Item>
              <PortraitIcon />
              <Title>Your Channel</Title>
            </Item>
          </>
        )}
        <Item onClick={handleLogOut}>
          <ExitToAppIcon />
          <Title>Sign out</Title>
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          <Title>Appearence: {darkMode ? "Dark" : "Light"}</Title>
        </Item>
        <Hr />
        <Link
                to="settings"
                style={{ textDecoration: "none", color: "inherit" }}
              >
          <Item >
            <SettingsIcon />
            <Title >Settings</Title>
          </Item>
          </Link>
        <Hr />
        <Item>
          <HelpOutlineIcon />
          <Title>Help</Title>
        </Item>
        <Item>
          <FeedbackIcon />
          <Title>Send feedback</Title>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Profile;
