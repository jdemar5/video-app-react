/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { subscription } from "../redux/userSlice";
import EditProfile from "../components/EditProfile";

const Container = styled.div`
  padding-left: 0px;
  display: flex;
  top: 122px;
  justify-content: center;
  flex-wrap: wrap;
`;

const VidDiv = styled.div`
  margin: 0% 5%;
  width: 100%;
`;

const Tag = styled.button`
  background-color: ${({ theme }) => theme.soft};
  font-weight: 400;
  color: white;
  border: none;
  border-radius: 8px;
  height: 35px;
  padding: 1px 15px 3px 15px;
  margin: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.softer};
  }

  &.selected {
    background-color: ${({ theme }) => theme.selected};
    color: ${({ theme }) => theme.selectedText};
    &:hover {
      background-color: ${({ theme }) => theme.selected};
    }
  }

  &.notselected {
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    &:hover {
      background-color: ${({ theme }) => theme.softer};
    }
  }
`;

const TagDiv = styled.div`
  width: 100%;
  hieght: 45px;
  padding-left: 5%;
`;
const Hr = styled.hr`
  margin: 12px 5px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChannelInfo = styled.div`
  margin: 5vh 6% 3vh 6%;
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and (max-width: 800px) {
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;

  @media only screen and (max-width: 800px) {
    display: none;
  }

  &.true {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 30/5;

  &.true {
    display: none;
  }
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 5px;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;

const About = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  width: 70%;
  line-height: 20px;
`;

const ChannelCounter = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const VideoCounter = styled.span`
  margin-bottom: 20px;
  flex: row;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
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

  &.true {
    display: none;
  }
`;

const EditChannel = styled.button`
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

  &.true {
    display: none;
  }
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
  display: none;
  &.true {
    display: flex;
  }
`;

const LoaderText = styled.h2`
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

const LoadSubscribe = styled.button`
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
  font-weight: 500;
  color: ${({ theme }) => theme.soft};
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
`;

const Channel = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState({});
  const [videos, setVideos] = useState([]);
  const [tagsMenu, setTagsMenu] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const Default = ["Latest", "Popular", "Oldest"];
  var res;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelRes = await axios.get(`/users/find/${path}`);
        setChannel(channelRes.data);
      } catch (error) {}
    };
    fetchData();
  }, [path, open]);

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const fetchVideos = async (e) => {
    setSelectedTag(e);
    switch (e) {
      case "Latest":
        res = await axios.get(`/videos/latest?auth=${channel._id}`);
        console.log(res.data);
        console.log(channel._id);
        setVideos(res.data);
        break;
      case "Popular":
        res = await axios.get(`/videos/popular?auth=${channel._id}`);
        setVideos(res.data);
        break;
      case "Oldest":
        res = await axios.get(`/videos/oldest?auth=${channel._id}`);
        setVideos(res.data);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTagsMenu(Default);
    fetchVideos("Latest");
  }, [channel]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [path]);

  return (
    <>
      <Container>
        <Header>
          <Img src={channel.banner} className={isLoading} />
          <LoaderIcon
            style={{ width: "100%", height: "30.5vh" }}
            className={isLoading}
          />
          <ChannelInfo>
            <Image src={channel.img} className={isLoading} />
            <LoaderIcon
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              className={isLoading}
            />
            <ChannelDetail>
              {isLoading ? (
                <>
                <LoaderText style={{ fontSize: "20px", fontWeight: 500}}>                              </LoaderText>
                <LoaderText style={{ fontSize: "12px"}}>                                          </LoaderText>
                <LoaderText style={{ fontSize: "12px", marginBottom: "20px"}}>              </LoaderText>
                <LoaderText style={{ fontSize: "14px", width: "70%"}}>                                                                          </LoaderText>
                <LoaderText style={{ fontSize: "14px"}}>                                                                                                   </LoaderText>
                </>
              ) : (
                <>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <VideoCounter>{videos.length} videos</VideoCounter>
                  <About>{channel.about}</About>
                </>
              )}
            </ChannelDetail>
            {isLoading ? (
              <LoadSubscribe>SUBSCRIBE</LoadSubscribe>
            ) : currentUser && currentUser._id === channel._id ? (
              <EditChannel
                className={isLoading}
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              >
                Edit Channel
              </EditChannel>
            ) : currentUser ? (
              <Subscribe onClick={handleSub} className={isLoading}>
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
          </ChannelInfo>
        </Header>
        <Hr></Hr>
        <TagDiv>
          {tagsMenu.map((tag) => (
            <Tag
              onClick={() => fetchVideos(tag)}
              key={tag}
              className={tag === selectedTag ? "selected" : "notselected"}
            >
              {tag}
            </Tag>
          ))}
        </TagDiv>
        <VidDiv>
          {videos.map((video) => (
            <Card key={video._id} video={video} isLoading={isLoading} />
          ))}
        </VidDiv>
      </Container>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Channel;
