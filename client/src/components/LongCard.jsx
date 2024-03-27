import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import SheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { watchLater } from "../redux/userSlice";
import ShareMenu from "./ShareMenu";
import ReactPlayer from "react-player/lazy";

const Image = styled.img`
  border-radius: 1vh;
  width: 100%;
  height: auto;
  background-color: #999;
  flex: 1;
  float: left;
`;

const Duration = styled.h2`
  float: right;
  position: relative;
  width: max-content;
  padding-right: 4px;
  padding-left: 4px;
  right: 5px;
  bottom: 20px;
  color: white;
  font-size: 14px;
  background-color: #000000a7;
`;

const VidDiv = styled.div`
  display: none;
  cursor: pointer;
  float: left;
  width: 40%;
  gap: 5px;
  padding-bottom: 13px;
`;

const ImgDiv = styled.div`
  cursor: pointer;
  float: left;
  width: 40%;
  gap: 5px;
`;

const Container = styled.div`
  cursor: pointer;
  float: left;
  width: 100%;
  gap: 5px;
  margin-left: 8px;
  &:hover ${ImgDiv} {
    display: none;
  }
  &:hover ${Duration} {
    visibility: hidden;
  }
  &:hover ${VidDiv} {
    display: block;
  }
`;

const Details = styled.div`
  display: flex;
  position: relative;
  padding-left: 5px;
  top: 10px;
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0px 0px 7px 0px;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 2px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Dots = styled.div`
  float: right;
  position: relative;
  bottom: 50px;
  color: ${({ theme }) => theme.text};
`;

const DropDownContent = styled.div`
  display: none;
  background-color: ${({ theme }) => theme.soft};
  position: absolute;
  z-index: 99;
  color: ${({ theme }) => theme.text};
  width: 260px;
  height: 195px;
  padding-top: 12px;
  border-radius: 15px;
`;

const DropDownLi = styled.li`
  ${(props) => {
    if (props.setUp === "video") {
      if (
        props.mode.x >= window.innerWidth - window.innerWidth / 3 &&
        props.mode.y >= window.innerHeight - window.innerHeight / 4
      ) {
        return `
        float: right;
        margin-right: 260px;
        margin-top: -300px;
        `;
      } else if (props.mode.x >= window.innerWidth - window.innerWidth / 3) {
        return `
        float: right;
        margin-right: 260px;
        margin-top: -60px;
        `;
      } else if (props.mode.y >= window.innerHeight - window.innerHeight / 4) {
        return `
        float: right;
        margin-top: -300px;
        `;
      } else {
        return `
        float: right;
        margin-top: -60px;
        `;
      }
    } else {
      if (
        props.mode.x >= window.innerWidth - window.innerWidth / 3 &&
        props.mode.y >= window.innerHeight - window.innerHeight / 4
      ) {
        return `
        float: right;
        margin-right: 230px;
        margin-top: -260px;
        `;
      } else if (props.mode.x >= window.innerWidth - window.innerWidth / 3) {
        return `
        float: right;
        margin-right: 230px;
        margin-top: -22px;
        `;
      } else if (props.mode.y >= window.innerHeight - window.innerHeight / 4) {
        return `
        float: right;
        margin-top: -230px;
        `;
      } else {
        return `
        float: right;
        margin-top: -22px;
        `;
      }
    }
  }}
  display: flex;
  align-content: center;

  &.true ${DropDownContent} {
    display: flex;
    flex-direction: column;
  }
`;

const Item = styled.a`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 20px;

  &:hover {
    background-color: ${({ theme }) => theme.softer};
  }
`;

const TitleDD = styled.h1`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Hr = styled.hr`
  margin: 5px 0px;
  border: 0.5px solid ${({ theme }) => theme.softer};
`;

const LongCard = ({ type, video }) => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  const [openD, setOpenD] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [mousePos, setMousePos] = useState({});
  const [mouseSave, setMouseSave] = useState({});
  const [checkView, setCheckView] = useState("none");
  const [style, setStyle] = useState({});
  var path = useLocation().pathname.split("/")[1];
  const videoPlayerRef = useRef(null);
  let menuRef = useRef();

  const handleWAtchLater = async () => {
    if (currentUser && !currentUser.watchLater.includes(video._id)) {
      await axios.put(`/users/watchLater/${video._id}`);
      dispatch(watchLater(video._id));
      setCheckView("block");
    }

    setTimeout(() => {
      handleCloseDots();
      setCheckView("none");
    }, 1000);
  };

  const handleCloseDots = () => {
    setOpenD(false);
  };

  const handleOpenDots = () => {
    setMouseSave(mousePos);
    setOpenD(!openD);
  };

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        handleCloseDots();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleDownload = async () => {
    try {
      const response = await axios.get(video.videoUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", video.title + ".mp4");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  useEffect(() => {
    if (path === "video") {
      setStyle("video");
    } else {
      setStyle("search");
    }
  }, [path]);

  const onMouseOverCaptureHandler = () => {
    setPlaying(true);
};

const onMouseOutCaptureHandler = () => {
  setPlaying(false);
};

const handleStart = () => {
  setTimeout(() => {
    videoPlayerRef.current?.seekTo(0);
    handleStart();
    }, 10000)
}

  return (
    <>
      <Container onMouseOverCapture={onMouseOverCaptureHandler} onMouseOutCapture={onMouseOutCaptureHandler} type={type}>
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <VidDiv>
        <ReactPlayer
              ref={videoPlayerRef}
              url={video.videoUrl}
              width="100%"
              height="70%"
              muted
              style={{position: "relative"}}
              playing={playing}
              onStart={handleStart}
              loop
            />
            </VidDiv>
          <ImgDiv>
            <Image type={type} src={video.imgUrl} />
            <Duration>{video.duration}</Duration>
          </ImgDiv>
          <Details type={type}>
            <ChannelImage type={type} src={channel.img} />
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{channel.name}</ChannelName>
              <Info>
                {video.views} views • {format(video.createdAt)}
              </Info>
            </Texts>
          </Details>
        </Link>
        <Dots onClick={handleOpenDots}>
          <MoreVertRounded />
        </Dots>
        <DropDownLi
          mode={mouseSave}
          setUp={style}
          ref={menuRef}
          className={openD}
        >
          <DropDownContent>
            {" "}
            {currentUser ? (
              <>
                <Item onClick={handleWAtchLater}>
                  <SheduleOutlined />
                  <TitleDD>Save to Watch later</TitleDD>
                  <CheckIcon style={{ display: checkView }} />
                </Item>
              </>
            ) : (
              <>
              <Link to="../../signin" style={{ textDecoration: "none", color: "inherit" }}>
              <Item>
                  <SheduleOutlined />
                  <TitleDD>Save to Watch later</TitleDD>
                  <CheckIcon style={{ display: checkView }} />
                </Item>
                </Link>
              </>
            )}
            <Item onClick={handleDownload}>
              <DownloadIcon />
              <TitleDD>Download</TitleDD>
            </Item>
            <Item
              onClick={() => setOpenS(!openS)}
              style={{ cursor: "pointer" }}
            >
              <ReplyOutlinedIcon />
              <TitleDD>Share</TitleDD>
            </Item>
            <Hr />
            <Item>
              <DoNotDisturbAltIcon />
              <TitleDD>Not Interested</TitleDD>
            </Item>
          </DropDownContent>
        </DropDownLi>
      </Container>
      {openS && <ShareMenu setOpenS={setOpenS} video={video} />}
    </>
  );
};

export default LongCard;
