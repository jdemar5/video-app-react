import axios from "axios";
import DefPFP from "../img/Default_pfp.png";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const SetButton = styled.button`
  width: 10%;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: dodgerblue;
  color: ${({ theme }) => theme.bgLighter};

  &.true {
    display: block;
  }
  &.false {
    display: none;
  }
`;

const CancelButton = styled.button`
  width: 10%;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg};
  color: dodgerblue;

  &.true {
    display: block;
  }
  &.false {
    display: none;
  }
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [vis, setVis] = useState("false");
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const addComment = async () => {
    try {
      await axios.post("/comments", {input, videoId});
    } catch (err) {}
    setVis("false")
  };

  const handleChange =(e)=>{
    setInput(e.target.value)
  };

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <NewComment>
        {currentUser ? (
          <Avatar src={currentUser.img} />
        ) : (
          <Avatar src={DefPFP} />
        )}
        {currentUser ? (
        <>
        <Input onClick={()=>setVis("true")} onChange={handleChange} placeholder="Add a comment..." />
        <CancelButton className={vis} onClick={()=>setVis("false")}>Cancel</CancelButton>
        <SetButton className={vis} onClick={addComment}>Comment</SetButton>
        </>
        ) : (
          <Text>sign in to leave a comment.</Text>
        )}
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
