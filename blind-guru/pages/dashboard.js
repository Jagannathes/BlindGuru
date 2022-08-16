import Footer from "@components/Footer";
import Head from "next/head";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Router from "next/router";
import ProtectedRoute from "components/ProtectedRoute";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Image from "next/image";
import Logo from "../public/logo.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import Speech from "speak-tts";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";

const appId = "9e9b7607-0cf2-4227-b5f2-6370045adb22";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function dashboard() {
  const [arr, setarr] = React.useState([]);
  const [counter, setcounter] = React.useState(0);
  const [play, setplay] = React.useState(false);
  const [speech, setspeech] = React.useState(null);

  const TweetEmbedder = React.memo(() => {
    return (
      <TwitterTweetEmbed
        tweetId={`${counter != -1 ? arr[counter] : "933354946111705097"}`}
      />
    );
  }, [arr[counter]]);
  React.useEffect(() => {
    setspeech(new Speech());
    console.log(speech);
  }, []);

  React.useEffect(() => {
    axios.get("api/gettweets").then((res) => {
      console.log(res.data.data);
      setarr(res.data.data);
    });
  }, []);

  const theme = useTheme();
  function Logout() {
    Router.push("/api/auth/twitter/logout");
  }
  const previous = () => {
    if(counter >= arr.length) {
      setcounter(arr.length-1);
      playFunction(arr.length-1);
    }
    if(counter>=0)
    {
      setcounter(counter - 1);
      playFunction(counter - 1);
    } else {
      playFunction(counter);
    }
  };
  const next = () => {
    if(counter < 0) {
      setcounter(0);
      playFunction(0);
    } else if(counter<arr.length)
    {
      setcounter(counter + 1);
      playFunction(counter + 1);
    } else {
      playFunction(counter);
    }
  };
  const pause = () => {
    speech.pause();
    setplay(false);
  };
  const playFunction = (idx) => {
    speech.resume();
    setplay(true);
    if ((idx || counter) >= arr.length || (idx || counter) < 0) {
      speech
        .speak({
          text: "Reached End of Feed.",
        })
        .then(() => {
          console.log("Success !");
        })
        .catch((e) => {
          console.error("An error occurred :", e);
        });
    } else {
      speech
        .speak({
          text: arr[idx?idx:counter].text,
        })
        .then(() => {
          console.log("Success !");
        })
        .catch((e) => {
          console.error("An error occurred :", e);
        });
    }
  };

  const create = () => {
    alert("this feature is not yet available");
  };

  const SpeechRecognizer = () => {
    const commands = [
      {
        command: "pause",
        callback: () => {
          pause();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2,
      },
      {
        command: "create",
        callback: () => {
          create();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2,
      },
      ,
      {
        command: "play",
        callback: () => {
          playFunction();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2,
      },
      {
        command: "previous",
        callback: () => {
          previous();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2,
      },
      {
        command: "next",
        callback: () => {
          next();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2,
      },
    ];
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });

    React.useEffect(() => {
      SpeechRecognition.startListening({
        continuous: true,
        interimResults: true,
      });
    }, []);
    return <div>{transcript}</div>;
  };
  function getCurrentTweetId() {
    if(arr.length == 0) {
      return null;
    }
    if (counter < 0) {
      // setcounter(-1);
      return arr[0].id;
    } else if (counter >= arr.length) {
      // setcounter(arr.length);
      return arr[arr.length - 1].id;
    } else {
      return arr[counter].id;
    }
  }
  return (
    <ProtectedRoute>
      <div className="container">
        <Head>
          <title>Blind Guru | Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="landing">
            <Image alt="Logo" src={Logo} />

            <div className="heading1">Dashboard</div>
            {/* <TweetEmbedder /> */}

            <TwitterTweetEmbed tweetId={getCurrentTweetId()} />
            <Card
              sx={{
                display: "flex",
                marginTop: "15px",
                background: "#0B8B8B",
                borderRadius: "20px",
                width: "300px",
                height: "90px",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  aria-label="previous"
                  sx={{ height: 60, width: 60, color: "#fff" }}
                  onClick={previous}
                >
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon
                      sx={{ height: 45, width: 45, color: "#fff" }}
                    />
                  )}
                </IconButton>
                {!play && (
                  <IconButton aria-label="play/pause" onClick={pause}>
                    <PlayArrowIcon
                      sx={{ height: 60, width: 60, color: "#fff" }}
                    />
                  </IconButton>
                )}
                {play && (
                  <IconButton aria-label="play/pause" onClick={pause}>
                    <PauseIcon sx={{ height: 60, width: 60, color: "#fff" }} />
                  </IconButton>
                )}

                <IconButton
                  aria-label="next"
                  sx={{ height: 45, width: 45, color: "#fff" }}
                  onClick={next}
                >
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon
                      sx={{ height: 45, width: 45, color: "#fff" }}
                    />
                  )}
                </IconButton>
              </Box>
            </Card>
            <button className="logout-btn" onClick={Logout}>
              Logout
            </button>
            <SpeechRecognizer />
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
export default dashboard;
