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
  border-radius: 50px;
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
  display: flex;
  flex-direction: column;
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

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const videoPlayerRef = useRef(null);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
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
    };
    fetchData();
  }, [path, dispatch]);

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
          <VideoWrapper>
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
              playing={true}
              controls
            />
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
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
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              {currentUser ? (
                <>
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
                </>
              ) : (
                <>
                  <Image src={channel.img} />
                  <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>
                  {channel.subscribers} subscribers
                </ChannelCounter>
                <Description>{currentVideo.desc}</Description>
              </ChannelDetail>
                </>
              )}
            </ChannelInfo>
            {currentUser && currentUser._id === channel._id ? (
              <Link
                to={`/channel/${channel._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <YourChannel>Your Channel</YourChannel>
              </Link>
            ) : (
              currentUser && (
                <Subscribe onClick={handleSub}>
                  {currentUser.subscribedUsers?.includes(channel._id)
                    ? "SUBSCRIBED"
                    : "SUBSCRIBE"}
                </Subscribe>
              )
            )}
          </Channel>
          <Hr />
          <Comments videoId={currentVideo._id} />
        </Content>

        <Recommendation
          currentUser={currentUser}
          channel={channel}
          tags={currentVideo.tags}
        />
      </Container>
      {openS && <ShareMenu setOpenS={setOpenS} video={currentVideo} />}
    </>
  );
};

export default Video;
