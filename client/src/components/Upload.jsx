/* eslint-disable no-useless-computed-key */
/* eslint-disable no-sequences */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Close from "@mui/icons-material/Close";
import AvatarEditor from "react-avatar-editor";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

const Image = styled.img`
  border-radius: 10px;
  width: 320px;
  height: auto;
`;

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
  height: 80%;
  position: absolute;
  top: 10%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.Def {
    height: 60%;
  }
  &.Edit {
    width: 768px;
    height: 529px;
  }
  &.Preview {
    height: 80%;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 20px;
`;

const FileLabel = styled.label`
  font-size: 15px;
  border-radius: 3px;
  border: none;
  padding: 5px 10px;
  font-weight: 500;
  cursor: pointer;
  background-color: dodgerblue;
  color: ${({ theme }) => theme.bgLighter};
`;

const Hr = styled.hr`
  margin: 5px 0px;
  border: 0.5px solid ${({ theme }) => theme.softer};
`;

const SetButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 10%;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: dodgerblue;
  color: ${({ theme }) => theme.bgLighter};
`;

const CancelButton = styled.button`
  position: absolute;
  right: 16%;
  bottom: 20px;
  width: 10%;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgLighter};
  color: dodgerblue;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [crop, setCrop] = useState("Def");
  const [file] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const editor = useRef(null);
  const [currentRange, setCurrentRange] = useState(1);
  const navigate = useNavigate();
  const storage = getStorage(app);

  const onScrollUp = () => {
    if (currentRange < 3) {
      setCurrentRange(currentRange + 0.1);
    }
  };

  const onScrollDown = () => {
    if (currentRange > 1) {
      setCurrentRange(currentRange - 0.1);
    }
  };

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
    uploadFile(e.target.files[0], "videoUrl");
    var reader = new FileReader();
    reader.onload = function (e) {
      var videoElement = document.createElement("video");
      videoElement.src = e.target.result;
      var timer = setInterval(function () {
        if (videoElement.readyState === 4) {
          var mzminutes = Math.floor(videoElement.duration.toFixed(0) / 60);
          var mzseconds = String(
            Math.floor(videoElement.duration.toFixed(0) - mzminutes * 60)
          ).padStart(2, "0");
          String(mzseconds).padStart(2, "0");
          var duration = mzminutes + ":" + mzseconds;
          setInputs((prev) => {
            return { ...prev, ["duration"]: duration };
          });

          clearInterval(timer);
        }
      }, 500);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  function srcToFile(src, fileName, mimeType) {
    return fetch(src)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], fileName, { type: mimeType });
      });
  }

  const handleImgCrop = () => {
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL
      const dataUrl = editor.current.getImage().toDataURL();
      srcToFile(dataUrl, img.name, img.type).then(function (file) {
        setImg(file);
        img && uploadFile(file, "imgUrl");
        document.getElementById("preview").src = dataUrl;
      });
      setCrop("Preview");
    }
  };


  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
    document.body.style.overflow = "auto";
  };


  const handleCancel = () => {
    inputs.imgUrl && deleteFile(inputs.imgUrl);
    inputs.videoUrl && deleteFile(inputs.videoUrl);
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  const deleteFile = (name) => {
    const deleteRef = ref(storage, name);
    deleteObject(deleteRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <Container>
      <Wrapper className={crop}>
        <Close
          onClick={handleCancel}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        ></Close>
        {crop === "Edit" ? (
          <>
            <Title>Crop Thumbnail</Title>
            <Hr></Hr>
            <ReactScrollWheelHandler
              upHandler={onScrollUp}
              downHandler={onScrollDown}
              style={{
                display: "flex",
                width: "100%",
                height: "auto",
                justifyContent: "center",
              }}
            >
              <AvatarEditor
                ref={editor}
                image={img}
                width={480}
                height={270}
                border={50}
                color={[5, 5, 5, 0.5]} // RGBA
                scale={currentRange}
                rotate={0}
              />
            </ReactScrollWheelHandler>
            <Hr></Hr>
            <CancelButton onClick={() => (setCrop("Def"), setImg(undefined))}>
              Cancel
            </CancelButton>
            <SetButton onClick={handleImgCrop}>Set</SetButton>
          </>
        ) : (
          <>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
            {videoPerc > 0 ? (
              "Uploading: " + videoPerc + "%"
            ) : (
              <>
                <div>
                  <FileLabel htmlFor="video-file" style={{ cursor: "pointer" }}>
                    Select File
                  </FileLabel>
                  {file?.name && <p>{file?.name} is selected</p>}
                </div>

                <input
                  type="file"
                  id="video-file"
                  accept="video/*"
                  onChange={handleVideo}
                  style={{ display: "none" }}
                />
              </>
            )}
            <Label>Thumbnail:</Label>
            {imgPerc > 0 ? (
              <></>
            ) : (
              <>
                <div>
                  <FileLabel htmlFor="image-file" style={{ cursor: "pointer" }}>
                    Select File
                  </FileLabel>
                  {file?.name && <p>{file?.name} is selected</p>}
                </div>

                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0], setCrop("Edit"))}
                  style={{ display: "none" }}
                />
              </>
            )}
            <Image id="preview"></Image>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <Desc
              placeholder="Description"
              name="desc"
              rows={8}
              onChange={handleChange}
              style={{
                resize: "none",
              }}
            />
            <Input
              type="text"
              placeholder="Separate the tags with commas and no spaces."
              onChange={handleTags}
            />
            
            <Button onClick={handleUpload}>Upload</Button>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Upload;
