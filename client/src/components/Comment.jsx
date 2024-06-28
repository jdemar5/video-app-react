import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
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

const LoaderText = styled.h1`
white-space: pre;
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

const Comment = ({ comment, isLoading }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      {isLoading ? (
        <>
          <LoaderIcon style={{ width: "30px", height: "30px" }} />
          <Details>
            <LoaderText>           </LoaderText>
            <LoaderText>                                                 </LoaderText>
          </Details>
        </>
      ) : (
        <>
          <Avatar src={channel.img} />
          <Details>
            <Name>
              {channel.name} <Date>{format(comment.createdAt)}</Date>
            </Name>
            <Text>{comment.desc}</Text>
          </Details>
        </>
      )}
    </Container>
  );
};

export default Comment;
