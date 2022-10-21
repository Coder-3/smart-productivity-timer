import { useState } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import { MantineProvider, Button, MediaQuery, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function MyTimer({ expiryTimestamp, setIsBreak }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume } =
    useTimer({
      expiryTimestamp,
      onExpire: () => setIsBreak(false),
    });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <MediaQuery query="(max-width: 600px)" styles={{ display: "none" }}>
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </MediaQuery>
      <MediaQuery query="(min-width: 600px)" styles={{ display: "none" }}>
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
      </MediaQuery>
    </div>
  );
}

function MyStopwatch({ handleBreak }) {
  const matches = useMediaQuery("(max-width: 600px)");
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <div style={{ display: matches ? "" : "none" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Button onClick={start}>Start</Button>
          <Button onClick={pause}>Pause</Button>
          <Button onClick={reset}>Reset</Button>
          <Button onClick={() => handleBreak(seconds)}>Break</Button>
        </div>
      </div>
      <div style={{ display: matches ? "none" : "" }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Button onClick={start}>Start</Button>
          <Button onClick={pause}>Pause</Button>
          <Button onClick={reset}>Reset</Button>
          <Button onClick={() => handleBreak(seconds)}>Break</Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isBreak, setIsBreak] = useState(false);
  const [time, setTime] = useState(new Date());

  const handleBreak = (seconds) => {
    setIsBreak(true);
    const time = new Date();
    time.setSeconds(time.getSeconds() + Math.ceil(seconds / 3));
    setTime(time);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        {isBreak ? (
          <MyTimer expiryTimestamp={time} setIsBreak={setIsBreak} />
        ) : (
          <MyStopwatch handleBreak={handleBreak} />
        )}
      </Container>
    </MantineProvider>
  );
}
