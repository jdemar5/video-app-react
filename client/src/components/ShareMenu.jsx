import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 30%;
  height: 15%;
  position: absolute;
  top: 35%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 15px;
`;

const LinkText = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  width: 10%;
  border-radius: 5px;
  border: none;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  background-color: dodgerblue;
  color: ${({ theme }) => theme.bgLighter};
`;

const Label = styled.label`
  font-size: 20px;
`;

const Hr = styled.hr`
  margin: 5px 0px;
  border: 0.5px solid ${({ theme }) => theme.softer};
`;

const EditProfile = ({ setOpenS, video }) => {
  const [shareLink, setShareLink] = useState({});
  const [checkView, setCheckView] = useState("none");

  const handleClose = () => {
    setOpenS(false);
    document.body.style.overflow = "auto";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    document.getElementById("Text").select();
    setCheckView("block");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setShareLink(`http://localhost:3000/video/${video._id}`);
  },[video._id]);

  return (
    <Container>
      <Wrapper>
        <Close
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        ></Close>
        <Label>Share</Label>
        <Hr />
        <LinkText
          readOnly
          rows={1}
          value={shareLink}
          id="Text"
          style={{
            resize: "none",
          }}
        ></LinkText>
        <CheckIcon
          style={{
            display: checkView,
            position: "absolute",
            top: "82px",
            right: "30px",
          }}
        />
        <Button onClick={handleCopy}>Copy</Button>
      </Wrapper>
    </Container>
  );
};

export default EditProfile;
