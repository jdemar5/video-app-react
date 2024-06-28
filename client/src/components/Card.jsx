import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { removeTags, watchLater } from "../redux/userSlice";
import ShareMenu from "./ShareMenu";
import ReactPlayer from "react-player/lazy";

const Image = styled.img`
  border-radius: 12px;
  width: 100%;
  aspect-ratio: 33/18.6;
  color: #999;
  z-index: 999;

  &.true {
    display: none;
  }
`;

const Duration = styled.h2`
  float: right;
  position: relative;
  width: max-content;
  padding-right: 4px;
  padding-left: 4px;
  margin-right: 5px;
  bottom: 25px;
  color: white;
  font-size: 14px;
  background-color: #000000a7;

  &.true {
    visibility: hidden;
  }
`;

const VidDiv = styled.div`
  transition-delay: 250ms;
  display: none;
  width: 100%;

  &.true {
    display: block;
  }
`;

const Container = styled.div`
  width: 18.4%;
  margin: 30px 10px 40px 10px;
  cursor: pointer;

  float: left;
  @media only screen and (max-width: 1700px) {
    width: 23%;
  }

  @media only screen and (max-width: 1350px) {
    width: 30%;
  }

  @media only screen and (max-width: 1000px) {
    width: 45%;
  }

  @media only screen and (max-width: 650px) {
    width: 90%;
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
  margin-left: -90px;
  margin-bottom: -40px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Dots = styled.div`
  float: right;
  position: relative;
  bottom: 30px;
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
position: relative;
  ${(props) => {
    if (
      props.mode.x >= window.innerWidth - window.innerWidth / 6 &&
      props.mode.y >= window.innerHeight - window.innerHeight / 4
    ) {
      return `
      right: 260px;
      `;
    } else if (props.mode.x >= window.innerWidth - window.innerWidth / 6) {
      return `
      top: 240px;
      right: 260px;
      `;
    } else if (props.mode.y >= window.innerHeight - window.innerHeight / 4) {
      return `
      right: 40px;
      `;
    } else {
      return `
      top: 240px;
      right: 40px;
      `;
    }
  }}
  display: flex;
  align-content: center;

  &.true ${DropDownContent} {
    display: flex;
    flex-direction: column;
  }
`;   

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

const LoaderIcon = styled.div`
  border-radius: 50%;
  background: linear-gradient(
    -45deg,
    ${({ theme }) => theme.soft} 40%,
    ${({ theme }) => theme.softer} 50%,
    ${({ theme }) => theme.soft} 60%
  );
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1s infinite linear;
  @keyframes shimmer {
    to {
      background-position-x: 0%;
    }
  }
`;

const LoaderImage = styled.div`
  background: linear-gradient(
    -45deg,
    ${({ theme }) => theme.soft} 40%,
    ${({ theme }) => theme.softer} 50%,
    ${({ theme }) => theme.soft} 60%
  );
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1s infinite linear;
  @keyframes shimmer {
    to {
      background-position-x: 0%;
    }
  }
  border-radius: 12px;
  width: 100%;
  color: #999;
  z-index: 999;
  aspect-ratio: 33/18.6;
`;

const LoaderDiv = styled.div`
  display: none;
  &.true {
    display: block;
  }
`;

const ThumbDiv = styled.div`
  display: block;
  &.true {
    display: none;
  }
`;

const LoaderText = styled.h1`
  white-space: pre;
  width: max-content;
  background: linear-gradient(
    -45deg,
    ${({ theme }) => theme.soft} 40%,
    ${({ theme }) => theme.softer} 50%,
    ${({ theme }) => theme.soft} 60%
  );
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1s infinite linear;
  @keyframes shimmer {
    to {
      background-position-x: 0%;
    }
  }
  color: ${({ theme }) => theme.soft};
  border-radius: 5px;
`;

const Card = ({ video, isLoading }) => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  const [openD, setOpenD] = useState(false);
  const [over, setOver] = useState(false);
  const [openS, setOpenS] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [mousePos, setMousePos] = useState({});
  const [mouseSave, setMouseSave] = useState({});
  const [checkView, setCheckView] = useState("none");
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
  }, [video.userId, currentUser]);

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

  const onMouseOverCaptureHandler = () => {
    let handle = 0;
    handle = setTimeout(() => {
      setOver(true);
    }, 500);
    document.getElementById(`container${video._id}`).onmouseout = function () {
      clearTimeout(handle);
    };
  };

  const onMouseOutCaptureHandler = () => {
    setTimeout(() => {
      setOver(false);
    }, 500);
  };

  const handleStart = () => {
    setTimeout(() => {
      videoPlayerRef.current?.seekTo(0);
      handleStart();
    }, 10000);
  };

  const notInterested = async () => {
    let similar = video.tags.filter((x) => currentUser.pTags.includes(x));
    console.log(currentUser.pTags)
    console.log(video.tags)
    console.log(similar)
    // await axios.put(`/users/removeTags/${similar}`);
    //         similar.forEach((tag) => {
    //           dispatch(removeTags(tag));
    //         });
  }

  return (
    <>
      <Container
        id={`container${video._id}`}
        onMouseOver={onMouseOverCaptureHandler}
        onMouseOut={onMouseOutCaptureHandler}
      >
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
          {isLoading ? (
            <>
              <LoaderDiv className={isLoading}>
                <LoaderImage></LoaderImage>
                <Duration style={{ visibility: "hidden" }}>
                  {video.duration}
                </Duration>
              </LoaderDiv>
            </>
          ) : (
            <>
              <ThumbDiv className={isLoading}>
                <VidDiv className={over}>
                  <ReactPlayer
                    ref={videoPlayerRef}
                    url={video.videoUrl}
                    width="100%"
                    height="70%"
                    muted
                    style={{ position: "relative" }}
                    playing={over}
                    loop
                    onStart={handleStart}
                  />
                </VidDiv>
                <Image className={over} src={video.imgUrl} />
                <Duration className={over}>{video.duration}</Duration>
              </ThumbDiv>
            </>
          )}
          <Details>
            {isLoading ? (
              <>
                <LoaderIcon style={{ width: "36px", height: "36px" }} />
                <Texts>
                <LoaderText style={{fontSize: "16px"}}>                                     </LoaderText>
                <LoaderText style={{ fontSize: "14px"}} >                         </LoaderText>
                <LoaderText style={{ fontSize: "14px"}}>                                                </LoaderText>
              </Texts>
              </>
            ) : (
              <>
                <ChannelImage src={channel.img} />
                <Texts>
                  <Title>{video.title}</Title>
                  <ChannelName>{channel.name}</ChannelName>
                  <Info>
                    {video.views} views • {format(video.createdAt)}
                  </Info>
                </Texts>
              </>
            )}
          </Details>
        </Link>
        <Dots onClick={handleOpenDots}>
          <MoreVertRounded />
        </Dots>
        
      </Container>
      <DropDownLi mode={mouseSave} ref={menuRef} className={openD}>
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
                <Link
                  to="signin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
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
            <Item onClick={notInterested}
              style={{ cursor: "pointer" }}
              >
              <DoNotDisturbAltIcon />
              <TitleDD>Not Interested</TitleDD>
            </Item>
          </DropDownContent>
        </DropDownLi>
      {openS && <ShareMenu setOpenS={setOpenS} video={video} />}
    </>
  );
};

export default Card;
