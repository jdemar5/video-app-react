import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import Profile from "./Profile";

const Container = styled.div`
  left: 200px;
  position: sticky;
  top: 0;
  margin-bottom: 50px;
  background-color: ${({ theme }) => theme.bg};
  height: 60px;
  z-index: 990;
  &.channel {
    margin-bottom: 0px;
  }
  &.video {
    margin-bottom: 0px;
  }
  &.search {
    margin-bottom: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;

  position: relative;
`;

const Search = styled.div`
  z-index: 999;
  width: 40%;
  position: fixed;

  top: 10px;
  margin: auto;
  display: flex;
  padding: 5px;
  border: 2px solid #ccc;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};

  &.open {
    right: 30%;
  }

  &.open2 {
    right: 50px;
  }

  &.closed {
    display: none;
  }
`;

const Input = styled.input`
  width: 100%;
  padding-left: 10px;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  margin-right: 20px;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: #999;
  &.open2 {
    display: none;
  }
`;

const SearchButton = styled.button`
  position: fixed;
  padding: 8px;
  right: 110px;
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  &.open {
    display: none;
  }

  &.open2 {
    display: none;
  }

  &.closed {
    display: flex;
  }
`;

const SBButton = styled.button`
  position: fixed;
  padding: 8px;
  left: 180px;
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  &.open {
    display: none;
  }

  &.open2 {
    display: flex;
  }

  &.closed {
    display: none;
  }
`;

const UploadButton = styled.button`
  padding: 8px 8px 6px 8px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  var path = useLocation().pathname.split("/")[1];
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [openP, setOpenP] = useState(false);
  const [searchOpen, setSearchOpen] = useState("open");
  var x = window.matchMedia("(max-width: 650px)");

  function myFunction(x) {
    if (x.matches) {
      setSearchOpen("closed");
    } else {
      setSearchOpen("open");
    }
  }

  x.addEventListener("change", function () {
    myFunction(x);
  });

  return (
    <>
      <Container className={path}>
        <Wrapper>
          <SBButton className={searchOpen}>
            <ArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => setSearchOpen("closed")}
            />
          </SBButton>
          <Search className={searchOpen}>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/search?q=${q}`);
              }}
            />
            <SearchOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>
          <SearchButton className={searchOpen}>
            <SearchOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={() => setSearchOpen("open2")}
            />
          </SearchButton>
          {currentUser ? (
            <User>
              <UploadButton>
                <VideoCallOutlinedIcon
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}
                />
              </UploadButton>
              <Avatar
                className={searchOpen}
                onClick={() => setOpenP(!openP)}
                style={{ cursor: "pointer" }}
                src={currentUser.img}
              />
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
      {openP && (
        <Profile
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setOpenP={setOpenP}
        />
      )}
    </>
  );
};

export default Navbar;
