import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import { useSelector } from "react-redux";
import Settings from "./pages/Settings";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
  }
`;
const Wrapper = styled.div`
  padding: px 0px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [style, setStyle] = useState("open");
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            style={style}
            setStyle={setStyle}
          />
          <Main>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" style={style} />} />
                  <Route
                    path="trends"
                    element={<Home type="trend" style={style} />}
                  />
                  <Route
                    path="subscriptions"
                    element={
                      currentUser ? (
                        <Home type="sub" />
                      ) : (
                        <Home type="random" style={style} />
                      )
                    }
                  />
                  <Route path="likes" element={<Home type="likes" />} />
                  <Route path="library" element={<Home type="library" />} />
                  <Route path="history" element={<Home type="history" />} />
                  <Route
                    path="watchLater"
                    element={<Home type="watchLater" />}
                  />
                  <Route path="Music" element={<Home type="Music" />} />
                  <Route path="Sports" element={<Home type="Sports" />} />
                  <Route path="Gaming" element={<Home type="Gaming" />} />
                  <Route path="Movies" element={<Home type="Movies" />} />
                  <Route path="News" element={<Home type="News" />} />
                  <Route path="Cooking" element={<Home type="Cooking" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="video">
                    <Route path=":id" element={<Video style={style} />} />
                  </Route>
                  <Route path="channel">
                    <Route path=":id" element={<Channel />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
