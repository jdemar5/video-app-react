import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 0px;
  display: flex;
  top: 122px;
  justify-content: left;
  flex-wrap: wrap;
  flex-direction: column;
  `;

  const Hr = styled.hr`
  margin: 12px 5px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Info = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  padding-left: 10px;
`;

const ChannelName = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const Title = styled.h2`
    font-size: 28px;
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

const ChannelDiv = styled.div`
  margin: 0vh 2%;
  display: flex;
  flex-direction: row;
  gap: 20px;

`;

const Settings = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
      <>
        <Container>
            <Title>Settings</Title>
            <Hr></Hr>
            <Title2>Account</Title2>
            {currentUser ? (
                <>
                    <ChannelDiv>
                    <Image src={currentUser.img}/>
                    <ChannelName>{currentUser.name}</ChannelName>
                    </ChannelDiv>
                    <Hr></Hr>
                    <Info>This is the settings page for {currentUser.name}</Info>
                </>
            ) : (
                <>
                    <Info>Please sign-in to view your account settings.</Info>
                </>
            )}
            <Hr></Hr>
            <Info> This is a placeholder page for Settings, which will be fully implemented in the future.</Info>
        </Container>
      </>
    );
  };
  
  export default Settings;
  