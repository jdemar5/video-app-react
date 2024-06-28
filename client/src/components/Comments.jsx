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
  width: 40px;
  height: 40px;
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
  margin-top: 20px;
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

const LoaderText = styled.h1`
white-space: pre;
  margin-top: 20px;
  font-size: 14px;
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

const Comments = ({ videoId, isLoading, setIsLoading }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [vis, setVis] = useState("false");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {}
  };

  const addComment = async () => {
    try {
      await axios.post("/comments", { input, videoId });
    } catch (err) {}
    setVis("false");
    fetchComments();
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <NewComment>
        {isLoading ? (
          <>
            <LoaderIcon style={{ width: "40px", height: "40px" }} />
            <LoaderText style={{ marginBottom: "15px" }}>                                                 </LoaderText>
          </>
        ) : currentUser ? (
          <>
            <Avatar src={currentUser.img} />
            <Input
              onClick={() => setVis("true")}
              onChange={handleChange}
              placeholder="Add a comment..."
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") addComment();
              }}
            />
            <CancelButton className={vis} onClick={() => setVis("false")}>
              Cancel
            </CancelButton>
            <SetButton className={vis} onClick={addComment}>
              Comment
            </SetButton>
          </>
        ) : (
          <>
            <Avatar src={DefPFP} />
            <Text>sign in to leave a comment.</Text>
          </>
        )}
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} isLoading={isLoading} />
      ))}
    </Container>
  );
};

export default Comments;
