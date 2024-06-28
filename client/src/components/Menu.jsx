import React, { useEffect, useState } from "react";
import styled from "styled-components";
import JimTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import SheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import PlayCircleOutlined from "@mui/icons-material/PlayCircleOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  position: sticky;
  top: 0px;
  z-index: 999;
  color: ${({ theme }) => theme.text};

  &.open {
    width: 250px;
  }

  &.open2 {
    width: 30px;
  }

  &.closed {
    width: 65px;
  }

  &.closed2 {
    width: 30px;
  }
`;
const Wrapper = styled.div`
  margin: 0px 0px 10px 14px;
  background-color: ${({ theme }) => theme.bg};
  width: 0px;
  height: 100%;
  &.open {
    width: 230px;
  }

  &.open2 {
    width: 230px;
  }

  &.closed {
    width: 65px;
  }

  &.closed2 {
    width: 0px;
  }
`;
const Logo = styled.div`
  position: absolute;
  padding-left: 36px;
  padding-top: 16px;

  display: flex;
  align-items: center;
  left: 20px;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  width: 100px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  border-radius: 10px;
  padding: 7.5px 10px;
  margin-right: 20px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  &.closed {
    padding: 15px 3px 15px 7px;
  }
`;

const Item2 = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
  padding: 7.5px 10px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  &.closed {
    display: none;
  }
`;

const Hr = styled.hr`
  &.closed {
    display: none;
  }
  margin: 12px 10px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Hr2 = styled.hr`
  &.closed {
    display: none;
  }
  margin: 4px 6px;
  border: 0.5px solid ${({ theme }) => theme.bg};
`;

const Login = styled.div`
  &.closed {
    display: none;
  }
`;
const Button = styled.button`
  position: relative;
  left: 50px;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  margin-left: 10px;
  &.closed {
    display: none;
  }
`;

const Title2 = styled.h2`
  position: relative;
  text-align: center;
  padding: 0px 4px;
  font-size: 14px;
  font-weight: 500;

  &.closed {
    display: none;
  }
`;

const Title3 = styled.h2`
  position: relative;
  text-align: center;
  width: 200px;
  padding: 0px 8px 0px 4px;
  font-size: 14px;
  font-weight: 500;

  &.closed {
    display: none;
  }
`;

const Div1 = styled.div`
  top: 0px;
  position: sticky;
  height: 54px;
  z-index: 1;

  &.open {
    width: 160px;
  }

  &.closed {
    width: 50px;
  }

  &.closed2 {
  }
`;

const Div2 = styled.div`
  position: sticky;
  z-index: 10;
  font-size: 14px;
  height: 92vh;

  overflow-y: hidden;
  &:hover {
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    position: relative;
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
  }

  &.open {
    width: 230px;
  }

  &.open2 {
    width: 230px;
  }

  &.closed {
    width: 65px;
  }

  &.closed2 {
    width: 0px;
  }
`;

const MenuBtn = styled.div`
  position: absolute;
  top: 16px;
  left: 10px;
  z-index: 100;
  color: ${({ theme }) => theme.text};
`;

const ChannelImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Menu = ({ darkMode, setDarkMode, style, setStyle }) => {
  const { currentUser } = useSelector((state) => state.user);
  var path = useLocation().pathname.split("/")[1];
  const [subscriptions, setSubscriptions] = useState([]);
  var x = window.matchMedia("(max-width: 800px)");
  var x2 = window.matchMedia("(max-width: 1350px)");

  useEffect(() => {
    if (currentUser) {
      const subData = [];
      const fetchSubscriptions = async () => {
        for (let i = 0; i < currentUser.subscribedUsers.length; i++) {
          subData[i] = await axios.get(
            `/users/find/${currentUser.subscribedUsers[i]}`
          );
        }
        const res = subData;
        setSubscriptions(res);
      };
      fetchSubscriptions();
    }
  });

  useEffect(() => {
    if (
      path === "video" ||
      path === "settings" ||
      path === "signin" ||
      x.matches
    ) {
      setStyle("closed2");
    } else if (x2.matches) {
      setStyle("closed");
    } else {
      setStyle("open");
    }
  }, [path, x.matches, x2.matches]);

  function myFunction(x, x2) {
    if (path === "") {
      if (x.matches) {
        setStyle("closed2");
      } else if (x2.matches) {
        setStyle("closed");
      } else {
        setStyle("open");
      }
    }
  }

  x.addEventListener("change", function () {
    myFunction(x, x2);
  });
  x2.addEventListener("change", function () {
    myFunction(x, x2);
  });

  const changeStyle = () => {
    switch (style) {
      case "open":
        setStyle("closed");
        break;
      case "closed":
        setStyle("open");
        break;
      case "closed2":
        setStyle("open2");
        break;
      default:
        setStyle("closed2");
        break;
    }
  };

  return (
    <Container className={style}>
      <Wrapper className={style}>
        <Div1 className={style}>
          <MenuBtn>
            <MenuOutlined style={{ cursor: "pointer" }} onClick={changeStyle} />
          </MenuBtn>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={JimTube} />
              JimTube
            </Logo>
          </Link>
        </Div1>
        <Div2 className={style}>
          <Hr2 />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Item className={style}>
              <HomeIcon />
              <Title2 className={style}>Home</Title2>
            </Item>
          </Link>
          <Link
            to="trends"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <ExploreOutlinedIcon />
              <Title2>Explore</Title2>
            </Item2>
          </Link>
          <Link
            to="subscriptions"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item className={style}>
              <SubscriptionsOutlinedIcon />
              <Title2 className={style}>Subscriptions</Title2>
            </Item>
          </Link>
          <Hr className={style} />
          <Title className={style}>You</Title>
          <Link
            to="library"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item className={style}>
              <VideoLibraryOutlinedIcon />
              <Title2 className={style}>Library</Title2>
            </Item>
          </Link>
          <Link
            to="history"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <HistoryOutlinedIcon />
              <Title2 className={style}>History</Title2>
            </Item2>
          </Link>
          {currentUser ? (
            <>
              <Link
                to={`/channel/${currentUser._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Item className={style}>
                  <PlayCircleOutlined />
                  <Title2 className={style}>Your Videos</Title2>
                </Item>
              </Link>
            </>
          ) : (
            <>
              <Item className={style}>
                <PlayCircleOutlined />
                <Title2 className={style}>Your Videos</Title2>
              </Item>
            </>
          )}
          <Link
            to="watchLater"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <SheduleOutlined />
              <Title2 className={style}>Watch Later</Title2>
            </Item2>
          </Link>
          <Link to="likes" style={{ textDecoration: "none", color: "inherit" }}>
            <Item2 className={style}>
              <ThumbUpOffAltIcon />
              <Title2 className={style}>Liked videos</Title2>
            </Item2>
          </Link>
          <Hr className={style} />
          {!currentUser ? (
            <>
              <Login className={style}>
                <Title3>Sign in to like videos, comment, and subscribe.</Title3>
                <Link to="signin" style={{ textDecoration: "none" }}>
                  <Button>
                    <AccountCircleOutlinedIcon />
                    SIGN IN
                  </Button>
                </Link>
              </Login>
              <Hr className={style} />
            </>
          ) : (
            <>
              <Title className={style}>Subscriptions</Title>
              {subscriptions.length !== 0 ? (
                <>
                  {subscriptions.map((subscription) => (
                    <Link
                      to={`/channel/${subscription.data._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={subscription.data.name}
                    >
                      <Item2 className={style}>
                        <ChannelImage src={subscription.data.img} />
                        <Title2>{subscription.data.name}</Title2>
                      </Item2>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Title3>You have not subscritions.</Title3>
                </>
              )}
              <Hr className={style} />
            </>
          )}

          <Title className={style}>Explore</Title>
          <Link to="Music" style={{ textDecoration: "none", color: "inherit" }}>
            <Item2 className={style}>
              <LibraryMusicOutlinedIcon />
              <Title2 className={style}>Music</Title2>
            </Item2>
          </Link>
          <Link
            to="Sports"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <SportsBasketballOutlinedIcon />
              <Title2 className={style}>Sports</Title2>
            </Item2>
          </Link>
          <Link
            to="Gaming"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <SportsEsportsOutlinedIcon />
              <Title2 className={style}>Gaming</Title2>
            </Item2>
          </Link>
          <Link
            to="Movies"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <MovieOutlinedIcon />
              <Title2 className={style}>Movies</Title2>
            </Item2>
          </Link>
          <Link to="News" style={{ textDecoration: "none", color: "inherit" }}>
            <Item2 className={style}>
              <ArticleOutlinedIcon />
              <Title2 className={style}>News</Title2>
            </Item2>
          </Link>
          <Link
            to="Cooking"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <LocalPizzaIcon />
              <Title2 className={style}>Cooking</Title2>
            </Item2>
          </Link>
          <Hr className={style} />
          <Link
            to="settings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item2 className={style}>
              <SettingsOutlinedIcon />
              <Title2 className={style}>Settings</Title2>
            </Item2>
          </Link>
          <Item2 className={style}>
            <FlagOutlinedIcon />
            <Title2 className={style}>Report</Title2>
          </Item2>
          <Item2 className={style}>
            <HelpOutlineOutlinedIcon />
            <Title2 className={style}>Help</Title2>
          </Item2>
          <Item2 className={style} onClick={() => setDarkMode(!darkMode)}>
            <SettingsBrightnessOutlinedIcon />
            <Title2 className={style}>
              {darkMode ? "Light" : "Dark"} Mode
            </Title2>
          </Item2>
        </Div2>
      </Wrapper>
    </Container>
  );
};

export default Menu;
