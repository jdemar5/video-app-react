/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import LongCard from "./LongCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Container = styled.div`
  width: 10px;
  flex: 2;
`;

const BackButton = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  border: none;
  padding: 10px 10px 7px 10px;
  left: 0px;
  bottom: 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const BackButtonDiv = styled.div`
  position: absolute;
  background-image: linear-gradient(to right,  ${({ theme }) =>
    theme.bg} 70%, rgba(255,0,0,0) );
  border: none;
  padding: 20px 40px;
  left: 0px;
  bottom: 25px;
  &.BackInactive {
    display: none;
  }
}
`;

const ForwardButtonDiv = styled.div`
  position: absolute;
  background-image: linear-gradient(to right,  rgba(255,0,0,0), ${({ theme }) =>
    theme.bg} 40% );
  border: none;
  padding: 20px 40px;
  right: 0px;
  bottom: 25px;
  &.ForwardInactive {
    display: none;
  }
}
`;

const ForwardButton = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  border: none;
  padding: 10px 10px 7px 10px;
  right: 0px;
  bottom: 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const TagDiv = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: max-content;
  padding: 5px;
`;

const Tag = styled.button`
  background-color: ${({ theme }) => theme.soft};
  font-weight: 400;
  color: white;
  border: none;
  border-radius: 8px;
  height: 35px;
  width: max-content;
  padding: 1px 15px 3px 15px;
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

const Recommendation = ({ currentUser, channel, tags }) => {
  const [videos, setVideos] = useState([]);
  const [tagsMenu, setTagsMenu] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonsInactive, setButtonsInactive] = useState("BackInactive");
  const Default = ["Sports", "News", "Gaming", "Music", "Movies", "Fashion", "Cooking", "Art", "Beauty", "Vlogs", "Modeling", "Cars", "Racing", "TV", "History", "Animals"]

  var res;

  const slidePrev = () => {
    setCurrentIndex(currentIndex - 1);
    if (currentIndex > 1) {
      setButtonsInactive("Neither");
    } else {
      setButtonsInactive("BackInactive");
    }
  };

  const slideNext = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex < tagsMenu.length - 3) {
      setButtonsInactive("Neither");
    } else {
      setButtonsInactive("ForwardInactive");
    }
  };

  const fetchVideos = async (e) => {
    setSelectedTag(e);
    switch (e) {
      case "All":
        if(currentUser){
          res = await axios.get(`/videos/tags?tags=${currentUser.pTags}`);
        setVideos(res.data);
        } else{
          res = await axios.get(`/videos/tags?tags=${Default}`);
          setVideos(res.data);
        }
        break;
      case "From " + channel.name:
        res = await axios.get(`/videos/auth?auth=${channel._id}`);
        setVideos(res.data);
        break;
      case "Related":
        res = await axios.get(`/videos/tags?tags=${tags}`);
        setVideos(res.data);
        break;
      case "For You":
        if(currentUser){
          const HistRes = (await axios.get(`/videos/history?history=${currentUser._id}`)).data;
          res = await axios.get(`/videos/tags?tags=${currentUser.pTags}`);
          const UnwatchedRes = res.data.filter(a => !HistRes.some(b => a._id === b._id));
          setVideos(UnwatchedRes)
        } else{
          res = await axios.get(`/videos/tags?tags=${Default}`);
          setVideos(res.data);
        }
        break;
      case "Recently Uploaded":
        if(currentUser){
          res = await axios.get(`/videos/tags?tags=${currentUser.pTags}`);
          res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setVideos(res.data)
        } else{
          res = await axios.get(`/videos/tags?tags=${Default}`);
          res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setVideos(res.data);
        }
        break;
      default:
        res = await axios.get(`/videos/tags?tags=${e}`);
        setVideos(res.data);
        break;
    }
  };

  useEffect(() => {
      fetchVideos("All");
  }, [currentUser]);

  useEffect(() => {
    const newArray = ["All", "From " + channel.name].concat(tags);
    setTagsMenu(newArray.concat(["Related", "For You", "Recently Uploaded"]));
  }, [channel]);

  const items = tagsMenu.map((tag) => (
    <TagDiv>
      <Tag
        onClick={() => fetchVideos(tag)}
        key={tag}
        className={tag === selectedTag ? "selected" : "notselected"}
      >
        {tag}
      </Tag>
    </TagDiv>
  ));

  return (
    <Container>
      <AliceCarousel
        disableDotsControls
        autoWidth
        mouseTracking
        items={items}
        renderPrevButton={() => {
          return (
            <BackButtonDiv onClick={slidePrev} className={buttonsInactive}>
              <BackButton>
                <ArrowBackIcon />
              </BackButton>
            </BackButtonDiv>
          );
        }}
        renderNextButton={() => {
          return (
            <ForwardButtonDiv onClick={slideNext} className={buttonsInactive}>
              <ForwardButton>
                <ArrowForwardIcon />
              </ForwardButton>
            </ForwardButtonDiv>
          );
        }}
      />
      {videos.map((video) => (
        <LongCard type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
