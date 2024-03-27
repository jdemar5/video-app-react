/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LongCard from "../components/LongCard";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Container = styled.div`
  padding-left: 0px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Tag = styled.button`
  background-color: ${({ theme }) => theme.soft};
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 8px;
  height: 35px;
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

const TagsDiv = styled.div`
  hieght: 45px;
  width: 83%;
  padding-left: 10%;
  z-index: 99;
  background-color: ${({ theme }) => theme.bg};
`;

const VidDiv = styled.div`
  width: 70%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  padding-left: 10%;
`;

const BackButton = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  border: none;
  padding: 10px 10px 7px 10px;
  left: 5px;
  bottom: 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
}
`;

const BackButtonDiv = styled.div`
  position: absolute;
  background-image: linear-gradient(to right,  ${({ theme }) => theme.bg} 60%, rgba(255,0,0,0) );
  border: none;
  padding: 20px 40px;
  left: 0px;
  bottom: 25px;
  &.BackInactive {
    display: none;
  }
  &.Both {
    display: none;
  }
}
`;

const ForwardButtonDiv = styled.div`
  position: absolute;
  background-image: linear-gradient(to right,  rgba(255,0,0,0), ${({ theme }) => theme.bg} 40% );
  border: none;
  padding: 20px 60px;
  bottom: 25px;
  right: 0px;
  &.ForwardInactive {
    display: none;
  }
  &.Both {
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

const Search = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  const [tagsMenu, setTagsMenu] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonsInactive, setButtonsInactive] = useState("BackInactive");
  const Default = ["Unwatched", "Watched", "Recently Uploaded"]
  var tagsPerPage = window.innerWidth/100;    

  const fetchVideos = async (query, tag) => {
    setSelectedTag(tag)
    const TagSearch = query.substring(3,query.length);
    const TitleRes = (await axios.get(`/videos/search${query}`)).data;
    const TagRes = (await axios.get(`/videos/tags?tags=${TagSearch}`)).data;
    
    const CombinedRes = TitleRes.concat(TagRes);
    switch (tag) {
      case "All":
        setVideos(CombinedRes);
      break;
      case "Unwatched":
        if(currentUser){
        const HistRes = (await axios.get(`/videos/history?history=${currentUser._id}`)).data;
        const UnwatchedRes = CombinedRes.filter(a => !HistRes.some(b => a._id === b._id));
        setVideos(UnwatchedRes)
      }
      else{
        setVideos([])
      }
      break;
      case "Watched":
      if(currentUser){
        const HistRes = (await axios.get(`/videos/history?history=${currentUser._id}`)).data;
        const WatchedRes = HistRes.filter(a => CombinedRes.some(b => a._id === b._id));
        setVideos(WatchedRes)
      }
      else{
        setVideos([])
      }
      break;
      case "Recently Uploaded":
        CombinedRes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setVideos(CombinedRes)
      break;
      default:
        setVideos(CombinedRes);
      break;
    }
  };

  useEffect(() => {
    const newArray = ["All"].concat(Default)
      setTagsMenu(newArray);
    fetchVideos(query,"All");
  }, [query]);


  const slidePrev = () => {
    setCurrentIndex(currentIndex - 1)
    if(currentIndex>1){
      setButtonsInactive("Neither")
    } else {
      setButtonsInactive("BackInactive")
    }
  }
  
    const slideNext = () => {
      setCurrentIndex(currentIndex + 1)
      if(currentIndex<(tagsMenu.length-tagsPerPage)){
        setButtonsInactive("Neither")
      } else {
        setButtonsInactive("ForwardInactive")
      }
  }

  useEffect(() => {
    if(tagsMenu.length>tagsPerPage){setButtonsInactive("BackInactive")}else{setButtonsInactive("Both")}
    if(currentIndex>0&&currentIndex<(tagsMenu.length-tagsPerPage)){
      setButtonsInactive("Neither")
    }
  }, [tagsMenu, selectedTag]);

  const items = tagsMenu.map((tag) => (
    <TagDiv><Tag onClick={()=> fetchVideos(query, tag)} key={tag} className= {tag === selectedTag ? "selected" : "notselected" }>{tag}</Tag></TagDiv>
  ));

  return (
    <Container>
      <TagsDiv>
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
      </TagsDiv>
      <VidDiv>
        {videos.map((video) => (
          <LongCard key={video._id} video={video} />
        ))}
      </VidDiv>
    </Container>
  );
};

export default Search;
