import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Image, Flex, useDisclosure, useEventListenerMap } from '@chakra-ui/react'

import Layout from './Layout';
import Dashboard from './Pages/Dashboard'
import MyPage from './Pages/MyPage'
import Earn from './Pages/Earn'
import Utility from './Pages/Utility'
import CommunityFarm from './Pages/CommunityFarm';
import PotReward from './Pages/PotReward';
import Terms from './Pages/Terms';
import { fetchData } from './Util';
import { useStore, ActionKind, useWallet, useNear } from './store';
import Neart from "./assets/Neart.svg";

declare let document: any;

function App() {
  const [loading, setLoading] = useState(true);
  const [fontLoading, setFontLoading] = useState(true);

  const { state, dispatch } = useStore();

  const wallet = useWallet();
  const near = useNear();

  useEffect(() => {
    const fetchAll = async () => {
      await fetchData(state, dispatch)
      setLoading(false);
    }
    // if (checkNetwork(wallet, state))
    if (near && wallet)
      fetchAll()

  }, [wallet, near, state.refresh])

  var FontFaceObserver = require('fontfaceobserver');
  var font = new FontFaceObserver('SF UI Text');
  font.load().then(function () {

  });
  //   let res = document.fonts.check('SF-Pro-Text')
  // console.log(res)

  document.fonts.onloadingdone = function (fontFaceSetEvent: any) {
    setTimeout(() => {
    setFontLoading(false)
    }, 2000)
  };

  let path = window.location.pathname;
  useEffect(() => {
    const checkPath = () => {
      const new_path = path.replace("/", "");
      dispatch({ type: ActionKind.setTab, payload: new_path });
    }
    checkPath();
  }, [path]);

  return (
    <>
      <Flex
        w='100%'
        h='100%'
        display={fontLoading ? 'none' : 'flex'}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="mypage" element={<MyPage />} />
              <Route path="earn" element={<Earn />} />
              <Route path="utility" element={<Utility />} />
              <Route path="farm" element={<CommunityFarm />} />
              <Route path="pot" element={<PotReward />} />
              <Route path='terms' element={<Terms />} />
              <Route path="*" element={"404"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flex>
      <Flex
        w='100%'
        h='100vh'
        justify='center'
        align='center'
        bg='black'
        position='absolute'
        display={fontLoading ? 'flex' : 'none'}
        top='0px'
        zIndex='99999999'
      >
        {/* <video width="100%" autoPlay muted>
          <source src="./PRE LOADING WEB.mp4" type="video/mp4" />
        </video> */}
        <Image src={Neart} h='120px' animation="fadein 2s infinite" />
      </Flex>
    </>
  );
}

export default App;
