/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding-left: 0px;
  top: 122px;
  justify-content: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;

  @media only screen and (max-width: 800px) {
    display: none;
  }
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
  position: fixed;
  hieght: 45px;
  width: calc(88% - 70px);
  top: 60px;
  padding-left: 10px;
  z-index: 99;
  background-color: ${({ theme }) => theme.bg};
`;

const VidDiv = styled.div`
  width: calc(100%-10px);
  padding-left: 10px;
  display: flex;
  margin-top: 0px;
  justify-content: left;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.bg};
`;

const TitleDiv = styled.div`
  display: flex;
  width: calc(100%-20px);
  top: 80px;
  padding-left: 20px;
  z-index: 99;
  flex-direction: row;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h2`
font-size: 32px;
font-weight: 700;
color: ${({ theme }) => theme.text};
padding-left: 10px;
`;

const Title2 = styled.h2`
font-size: 22px;
font-weight: 700;
color: ${({ theme }) => theme.text};
padding-left: 10px;
`;

const Hr = styled.hr`
  margin: 12px 10px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const SeeMoreButton = styled.button`
  position: absolute;
  width: 10%;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  right: 2%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg};
  color: dodgerblue;
  &:hover {
    background-color: rgb(30, 144, 255, 0.3);
}
`;

const VisitChannel = styled.button`
  margin-left: 20%;
  background-color: ${({ theme }) => theme.bg};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  white-space: nowrap;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.softer};
  }

`;

const Home = ({type}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [videosH, setVideosH] = useState([]);
  const [videosL, setVideosL] = useState([]);
  const [videosWL, setVideosWL] = useState([]);
  const [tagsMenu, setTagsMenu] = useState([]);
  const [selectedTag, setSelectedTag] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonsInactive, setButtonsInactive] = useState("BackInactive");
  const Default = ["Sports", "News", "Gaming", "Music", "Movies", "Fashion", "Cooking", "Art", "Beauty", "Vlogs", "Modeling", "Cars", "Racing", "TV", "History", "Animals"]
  var res;
  var tagsPerPage = window.innerWidth/100;

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

  const fetchVideos = async (e) => {
    setSelectedTag(e)
    switch (e) {
      case "All":
        res = await axios.get(`/videos/tags?tags=${tagsMenu}`);
          setVideos(res.data);
      break;
      case "trend" :
      case "random" :
      case "sub":
        res = await axios.get(`/videos/${e}`);
          setVideos(res.data);
          setSelectedTag("All")
      break;
      case "likes":
        res = await axios.get(`/videos/like?like=${currentUser._id}`);
          setVideos(res.data);
      break;
      case "history":
        res = await axios.get(`/videos/history?history=${currentUser._id}`);
          setVideos(res.data);
          setSelectedTag("All")
      break;
      case "watchLater":
        res = await axios.get(`/videos/watchLater?watchLater=${currentUser._id}`);
          setVideos(res.data);
          setSelectedTag("All")
      break;
      case "library":
        res = await axios.get(`/videos/history?history=${currentUser._id}`);
          setVideosH(res.data);
        res = await axios.get(`/videos/watchLater?watchLater=${currentUser._id}`);
          setVideosWL(res.data);
        res = await axios.get(`/videos/like?like=${currentUser._id}`);
          setVideosL(res.data);
      break;
      default:
        res = await axios.get(`/videos/tags?tags=${e}`);
          setVideos(res.data);
      break;
    }
  };

  useEffect(() => {
    if(currentUser){
      const newArray = ["All"].concat(currentUser.pTags);
      for (let element of Default) {
        if (!newArray.includes(element)) {
          newArray.push(element)
        }
      }
    setTagsMenu(newArray)
    fetchVideos(type);
    }
    else if(type==="history" || type ==="likes" || type === "watchLater" || type === "library"){
    }else{
      setTagsMenu(["All"].concat(Default))
      fetchVideos(type);
    }
  }, [type, currentUser]);
  


  useEffect(() => {
    if(tagsMenu.length>tagsPerPage){setButtonsInactive("BackInactive")}else{setButtonsInactive("Both")}
    if(currentIndex>0&&currentIndex<(tagsMenu.length-tagsPerPage)){
      setButtonsInactive("Neither")
    }
  }, [tagsMenu, selectedTag, tagsPerPage]);

  const items = tagsMenu.map((tag) => (
    <TagDiv><Tag onClick={()=> fetchVideos(tag)} key={tag} className= {tag === selectedTag ? "selected" : "notselected" }>{tag}</Tag></TagDiv>
  ));

  return (
    <Container>
      {type === "library" ? (
         currentUser? (
          <>
          <TitleDiv>
          <Image src={currentUser.img}/>
          <Title>{currentUser.name}</Title>
          <Link to={`../channel/${currentUser._id}`} style={{ textDecoration: "none", color: "inherit"  }}>
          <VisitChannel>Visit Channel</VisitChannel>
          </Link>
          </TitleDiv>
          <Hr></Hr>
          <TitleDiv>
          <HistoryOutlinedIcon style={{ fontSize: 26 }} />
          <Title2>History</Title2>
          <Link to="../history" style={{ textDecoration: "none", color: "inherit" }}>
          <SeeMoreButton>See More</SeeMoreButton>
          </Link>
          </TitleDiv>
          <VidDiv>
          {videosH.map((video) => (
            <Card key={video._id} video={video}/>
          ))}
          </VidDiv>
          <Hr></Hr>
          <TitleDiv>
          <SheduleOutlined style={{ fontSize: 24 }}/>
          <Title2>Watch Later</Title2>
          <Link to="../watchLater" style={{ textDecoration: "none", color: "inherit" }}>
          <SeeMoreButton>See More</SeeMoreButton>
          </Link>
          </TitleDiv>
          <VidDiv>
          {videosWL.map((video) => (
            <Card key={video._id} video={video}/>
          ))}
          </VidDiv>
          <Hr></Hr>
          <TitleDiv>
          <ThumbUpOffAltIcon style={{ fontSize: 24 }}/>
          <Title2>Liked Videos</Title2>
          <Link to="../likes" style={{ textDecoration: "none", color: "inherit" }}>
          <SeeMoreButton>See More</SeeMoreButton>
          </Link>
          </TitleDiv>
          <VidDiv>
          {videosL.map((video) => (
            <Card key={video._id} video={video}/>
          ))}
          </VidDiv>
          </>
          ) : (
            <>
            <Title>Please sign-in to browse these videos.</Title>
            </>
            )
      ) : (
        <>
        {type === "history"  ? (
          <>
          <TitleDiv>
          <HistoryOutlinedIcon style={{ fontSize: 36 }} />
          <Title>History</Title>
          </TitleDiv>
          <Hr></Hr>
          </>
      ) :type === "watchLater" ? ( 
        <>
        <TitleDiv>
          <SheduleOutlined style={{ fontSize: 34 }}/>
          <Title>Watch Later</Title>
          </TitleDiv>
          <Hr></Hr>
        </>
      ) :type === "likes" ? ( 
        <>
        <TitleDiv>
          <ThumbUpOffAltIcon style={{ fontSize: 34 }}/>
          <Title>Liked Videos</Title>
          </TitleDiv>
          <Hr></Hr>
        </>
      ):(
        <>
          <TagsDiv>
      <AliceCarousel 
          disableDotsControls 
          autoWidth 
          mouseTracking 
          items={items} 
          renderPrevButton={() => {
            return <BackButtonDiv onClick={slidePrev} className={buttonsInactive}>
              <BackButton>
                <ArrowBackIcon/>
              </BackButton>
            </BackButtonDiv>
          }}
          renderNextButton={() => {
            return <ForwardButtonDiv onClick={slideNext} className={buttonsInactive}>
              <ForwardButton>
                <ArrowForwardIcon/>
              </ForwardButton>
            </ForwardButtonDiv>
          }}/>
      </TagsDiv>
        </>
      )}
      {(!currentUser && type === "history") || (!currentUser && type ==="watchLater") || (!currentUser && type === "likes") ? (
          <>
          <Title>Please sign-in to browse these videos.</Title>
          </>
          ):(
            <>
            <VidDiv>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
      </VidDiv>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;