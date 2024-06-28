/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  dislike,
  fetchFailure,
  fetchSuccess,
  like,
  view,
} from "../redux/videoSlice";
import { format } from "timeago.js";
import { addTags, history, subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import ReactPlayer from "react-player";
import ShareMenu from "../components/ShareMenu";

const Container = styled.div`
  padding: 30px;
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
  width: 110%;
`;
const VideoWrapper = styled.div`
  background-color: black;
  height: 73.4vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &.true {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  width: 100vh;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #c76658;
  }
`;

const YourChannel = styled.button`
  margin-right: 0%;
  background-color: ${({ theme }) => theme.bg};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  white-space: nowrap;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.softer};
  }
`;

const LoadDiv = styled.div`
  background-color: black;
  height: 73.4vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  display: none;
  &.true {
    display: flex;
  }
`;

const Loader = styled.div`
  border: 8px solid ${({ theme }) => theme.soft};
  border-radius: 50%;
  border-top: 8px solid ${({ theme }) => theme.softer};
  width: 60px;
  height: 60px;
  align-self: center;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
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

const LoaderText2 = styled.span`
  white-space: pre;
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
  width: max-content;
`;

const LoaderText3 = styled.p`
  white-space: pre;
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
  width: max-content;
  font-size: 14px;
`;

const LoaderIcon = styled.div`
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
  border-radius: 50%;
`;

const LoadSubscribe = styled.button`
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
  font-weight: 500;
  color: ${({ theme }) => theme.soft};
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
`;

const Video = (style) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const videoPlayerRef = useRef(null);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [viewed, setViewed] = useState(false);
  const [openS, setOpenS] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        dispatch(fetchFailure());
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [path]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(currentVideo.videoUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", currentVideo.title + ".mp4");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  useEffect(() => {
    const addView = async (e) => {
      if (viewed) {
        await axios.put(`/videos/view/${e._id}`);
        dispatch(view());
        if (currentUser && !currentUser.history.includes(e._id)) {
          await axios.put(`/users/watch/${e._id}`);
          dispatch(history(e._id));
          let difference = e.tags.filter((x) => !currentUser.pTags.includes(x));
          if (difference.length !== 0) {
            await axios.put(`/users/addTags/${difference}`);
            difference.forEach((tag) => {
              dispatch(addTags(tag));
            });
          }
        }
      }
    };
    addView(currentVideo);
  }, [viewed]);

  return (
    <>
      <Container>
        <Content>
          <LoadDiv className={isLoading}>
            <Loader />
          </LoadDiv>
          <VideoWrapper className={isLoading}>
            <ReactPlayer
              onProgress={(progress) => {
                if (progress.playedSeconds >= duration / 2) {
                  setViewed(true);
                } else if (progress.playedSeconds <= duration / 2) {
                  setViewed(false);
                }
              }}
              onDuration={(duration) => {
                setDuration(duration);
              }}
              ref={videoPlayerRef}
              url={currentVideo.videoUrl}
              width="100%"
              height="100%"
              playing={!isLoading}
              controls
              style={{ borderRadius: "20px", overflow: "hidden" }}
            />
          </VideoWrapper>
          {isLoading ? (
            <LoaderText style={{marginTop: "20px", marginBottom: "10px", fontSize: "18px", fontWeight: 400}}>                              </LoaderText>
          ) : (
            <Title>{currentVideo.title}</Title>
          )}
          <Details>
            {isLoading ? (
              <>
                <LoaderText2>                                              </LoaderText2>
                <Buttons>
                  <LoaderIcon
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "27px",
                    }}
                  />
                  <LoaderIcon
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "27px",
                    }}
                  />
                  <LoaderIcon
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "27px",
                    }}
                  />
                  <LoaderIcon
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "27px",
                    }}
                  />
                </Buttons>
              </>
            ) : (
              <>
                <Info>
                  {currentVideo.views} views • {format(currentVideo.createdAt)}
                </Info>
                <Buttons>
                  {currentUser ? (
                    <Button onClick={handleLike}>
                      {currentVideo.likes?.includes(currentUser._id) ? (
                        <ThumbUpIcon />
                      ) : (
                        <ThumbUpOutlinedIcon />
                      )}
                    </Button>
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}{" "}
                  {currentVideo.likes?.length}
                  {currentUser ? (
                    <Button onClick={handleDislike}>
                      {currentVideo.dislikes?.includes(currentUser._id) ? (
                        <ThumbDownIcon />
                      ) : (
                        <ThumbDownOffAltOutlinedIcon />
                      )}{" "}
                    </Button>
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                  <Button
                    onClick={() => setOpenS(!openS)}
                    style={{ cursor: "pointer" }}
                  >
                    <ReplyOutlinedIcon /> Share
                  </Button>
                  <Button onClick={handleDownload}>
                    <AddTaskOutlinedIcon /> Save
                  </Button>
                </Buttons>
              </>
            )}
          </Details>
          <Hr />
          {isLoading ? (
            <Channel>
              <ChannelInfo>
                <LoaderIcon style={{ width: "50px", height: "50px" }} />
                <ChannelDetail>
                      <LoaderText style={{ fontSize: "18px"}}>                </LoaderText>
                    <LoaderText2 style={{marginTop: "5px", marginBottom: "20px", fontSize: "12px"}}>                     </LoaderText2>
                    <LoaderText3  style={{ width: "100%"}}>                                                                                </LoaderText3>
                    <LoaderText3 style={{ width: "70%"}}>                                                         </LoaderText3>
                  </ChannelDetail>
              </ChannelInfo>
              {currentUser && currentUser._id === channel._id ? (
                <Link
                  to={`/channel/${channel._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <YourChannel>Your Channel</YourChannel>
                </Link>
              ) : (
                currentUser && <LoadSubscribe>SUBSCRIBE</LoadSubscribe>
              )}
            </Channel>
          ) : (
            <Channel>
              <ChannelInfo>
                <Link
                  to={`/channel/${channel._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Image src={channel.img} />
                </Link>
                <ChannelDetail>
                  <Link
                    to={`/channel/${channel._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ChannelName>{channel.name}</ChannelName>
                  </Link>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <Description>{currentVideo.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>
              {currentUser && currentUser._id === channel._id ? (
                <Link
                  to={`/channel/${channel._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <YourChannel>Your Channel</YourChannel>
                </Link>
              ) : currentUser ? (
                <Subscribe onClick={handleSub}>
                  {currentUser.subscribedUsers?.includes(channel._id)
                    ? "SUBSCRIBED"
                    : "SUBSCRIBE"}
                </Subscribe>
              ) : (
                <>
                  <Link to="/signin" style={{ textDecoration: "none" }}>
                    <Subscribe onClick={handleSub} className={isLoading}>
                      SUBSCRIBE
                    </Subscribe>
                  </Link>
                </>
              )}
            </Channel>
          )}

          <Hr />
          <Comments
            videoId={currentVideo._id}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Content>

        <Recommendation
          currentUser={currentUser}
          channel={channel}
          tags={currentVideo.tags}
          isLoading={isLoading}
        />
      </Container>
      {openS && <ShareMenu setOpenS={setOpenS} video={currentVideo} />}
    </>
  );
};

export default Video;
