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
import Close from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import AvatarEditor from "react-avatar-editor";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { updateImg, updateAbout, updateBanner } from "../redux/userSlice";

const Image = styled.img`
  border-radius: 50%;
  width: 60%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
  z-index: 999;
`;

const Img = styled.img`
  width: 100%;
  height: 35%;
  border: none;
  border: 1px solid ${({ theme }) => theme.soft};
  z-index: 999;
`;

const AviDiv = styled.div`
  display: flex;
  width: 81%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.soft};
  justify-content: center;
`;

const BannerDiv = styled.div`
  display: flex;
  width: 43%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
  align-items: center;
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
  width: 40%;
  height: 74%;
  position: absolute;
  top: 10%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &.Avi {
    width: 768px;
    height: 472px;
  }
  &.Banner {
    width: 1036px;
    height: 472px;
  }
`;

const Hr = styled.hr`
  margin: 5px 0px;
  border: 0.5px solid ${({ theme }) => theme.softer};
`;

const PicDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 30%;
`;

const PicDescDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescText = styled.span`
  flex: row;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Title = styled.h1`
  font-size: 22px;
  text-align: center;
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
  right: 12%;
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

const Label = styled.label`
  font-size: 20px;
`;

const FileLabel = styled.label`
  font-size: 16px;
  color: dodgerblue;
  font-weight: 500;
`;

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [file] = useState(null);
  const [img, setImg] = useState("Main");
  const [avi, setAvi] = useState(undefined);
  const [aviDataUrl, setAviDataUrl] = useState(undefined);
  const [banner, setBanner] = useState(undefined);
  const [bannerDataUrl, setBannerDataUrl] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const editor = useRef(null);
  const [currentRange, setCurrentRange] = useState(1);
  const storage = getStorage(app);
  const dispatch = useDispatch();


  const onScrollUp = () => {
    if (currentRange < 3) {
      setCurrentRange(currentRange + 0.3);
    }
  };

  const onScrollDown = () => {
    if (currentRange > 1) {
      setCurrentRange(currentRange - 0.3);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCancel = () => {
    inputs.img && deleteFile(inputs.img);
    inputs.banner && deleteFile(inputs.banner);
    setOpen(false);
    document.body.style.overflow = "auto";
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

  const handleAviCrop = () => {
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL
      const dataUrl = editor.current.getImage().toDataURL();
      srcToFile(dataUrl, avi.name, avi.type).then(function (file) {
        setAvi(file);
        avi && uploadFile(file, "img");
      });
      setAviDataUrl(dataUrl);
      setImg("Main");
    }
  };

  const handleBannerCrop = () => {
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL
      const dataUrl = editor.current.getImage().toDataURL();
      srcToFile(dataUrl, banner.name, banner.type).then(function (file) {
        setBanner(file);
        banner && uploadFile(file, "banner");
      });
      setBannerDataUrl(dataUrl);
      setImg("Main");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    inputs.img && deleteFile(currentUser.img);
    inputs.banner && deleteFile(currentUser.banner);
    const res = await axios.put("/users/update", { ...inputs });
    inputs.about && dispatch(updateAbout(inputs.about));
    inputs.img && dispatch(updateImg(inputs.img));
    inputs.banner && dispatch(updateBanner(inputs.banner));
    res.status === 200 && handleClose();
  };

  const deleteFile = (name) => {
    const deleteRef = ref(storage, name);
    if (name === "https://firebasestorage.googleapis.com/v0/b/video-64c39.appspot.com/o/Default_banner.jpg?alt=media&token=d8a61ba6-eef9-47b0-9f5d-06da12e0a396" || name === "https://firebasestorage.googleapis.com/v0/b/video-64c39.appspot.com/o/Default_pfp.png?alt=media&token=79e2848d-42cf-4f9e-9088-63f42ea732e5")
    {

    }else{
      deleteObject(deleteRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    }
  };

  const uploadFile = async (file, name) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused for " + name);
            break;
          case "running":
            console.log("Upload is running for " + name);
            break;
          default:
            break;
        }
      },
      (error) => {},
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [name]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <Container>
      <Wrapper className={img}>
        <Close
          onClick={handleCancel}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        ></Close>
        {img === "Avi" ? (
          <>
            <Title>Crop Profile Picture</Title>
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
                image={avi}
                width={250}
                height={250}
                border={50}
                color={[5, 5, 5, 0.5]} // RGBA
                scale={currentRange}
                rotate={0}
                borderRadius={150}
              />
            </ReactScrollWheelHandler>
            <Hr></Hr>
            <CancelButton onClick={() => (setImg("Main"), setAvi(undefined))}>
              Cancel
            </CancelButton>
            <SetButton onClick={handleAviCrop}>Set</SetButton>
          </>
        ) : img === "Banner" ? (
          <>
            <Title>Crop Profile Banner</Title>
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
                image={banner}
                width={830}
                height={140}
                border={100}
                color={[5, 5, 5, 0.5]} // RGBA
                scale={currentRange}
                rotate={0}
              />
            </ReactScrollWheelHandler>
            <Hr></Hr>
            <CancelButton onClick={() => (setImg("Main"), setAvi(undefined))}>
              Cancel
            </CancelButton>
            <SetButton onClick={handleBannerCrop}>Set</SetButton>
          </>
        ) : (
          <>
            <Title>Customize Profile</Title>
            <Hr></Hr>
            <Label>Picture</Label>
            <DescText>
              Your profile picture will appear where your channel is presented
              on JimTube, like next to your videos and comments
            </DescText>
            <PicDiv>
              <AviDiv >
                <Image src={aviDataUrl ? aviDataUrl : currentUser.img} />
              </AviDiv>
              <PicDescDiv>
                <DescText style={{ marginBottom: "10px" }}>
                  It’s recommended to use a picture that’s at least 98 x 98
                  pixels and 4MB or less. Use a PNG or GIF (no animations) file.
                  Make sure your picture follows the JimTube Community
                  Guidelines.{" "}
                </DescText>
                <div>
                  <FileLabel htmlFor="image-file" style={{ cursor: "pointer" }}>
                    Change
                  </FileLabel>
                  {file?.name && <p>{file?.name} is selected</p>}
                </div>

                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={(e) => setAvi(e.target.files[0], setImg("Avi"))}
                  style={{ display: "none" }}
                />
              </PicDescDiv>
            </PicDiv>
            <Label>Banner Image</Label>
            <DescText>
              This image will appear across the top of your channel
            </DescText>
            <PicDiv>
              <BannerDiv>
                <Img src={bannerDataUrl ? bannerDataUrl : currentUser.banner} />
              </BannerDiv>
              <PicDescDiv>
                <DescText style={{ marginBottom: "10px" }}>
                  For the best results on all devices, use an image that's at
                  least 2048 x 1152 pixels and 6MB or less.{" "}
                </DescText>
                <div>
                  <FileLabel
                    htmlFor="banner-file"
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                  </FileLabel>
                  {file?.name && <p>{file?.name} is selected</p>}
                </div>

                <input
                  type="file"
                  id="banner-file"
                  accept="image/*"
                  onChange={(e) =>
                    setBanner(e.target.files[0], setImg("Banner"))
                  }
                  style={{ display: "none" }}
                />
              </PicDescDiv>
            </PicDiv>
            <Label>Channel Description</Label>
            <Desc
              placeholder={
                currentUser.about
                  ? ""
                  : "Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
              }
              name="about"
              rows={8}
              defaultValue={currentUser.about}
              onChange={handleChange}
              style={{
                resize: "none",
              }}
            ></Desc>
            <Button onClick={handleUpload}>Save</Button>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default EditProfile;
