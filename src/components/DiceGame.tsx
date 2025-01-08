"use client";

import React, { useState, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Typography,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import generateRandomDice from "@/utils/randomDice";
import Loading from "./Loading";

interface GameHistory {
  time: string;
  guess: string;
  result: number;
  isWin: boolean;
}

type Condition = "over" | "under";

const DiceGame: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(50);
  const [condition, setCondition] = useState<Condition>("over");
  const [result, setResult] = useState<number>(generateRandomDice());
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlay = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const diceResult = generateRandomDice();
      const isWin =
        condition === "over" ? diceResult > threshold : diceResult < threshold;

      setResult(diceResult);

      const gameStatus = isWin ? "You won!" : "You lost!";
      const explanation =
        condition === "over"
          ? `Number was ${isWin ? "higher" : "lower"}`
          : `Number was ${isWin ? "lower" : "higher"}`;

      setAlertMessage(`${gameStatus} ${explanation}`);
      setAlertSeverity(isWin ? "success" : "error");

      const currentTime = new Date().toLocaleTimeString();
      setHistory((prev) => {
        const updatedHistory = [
          { time: currentTime, guess: `${condition} ${threshold}`, result: diceResult, isWin },
          ...prev,
        ];
        return updatedHistory.slice(0, 10); 
      });

      setLoading(false);
    }, 1000); // симуляции загрузки
  }, [condition, threshold]);

  const handleThresholdChange = (_event: Event, newValue: number | number[]) => {
    setThreshold(newValue as number);
  };

  if (loading) {
    return <Loading message="Rolling the dice..." />;
  }

  return (
    <Box textAlign="center" p={4}>
      {/* Alert сообщение */}
      {alertMessage && (
        <Alert severity={alertSeverity} sx={{ mb: 3 }}>
          {alertMessage}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        Dice Game
      </Typography>

      {/* Результат игры */}
      <Typography
        variant="h2"
        color="primary"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        {result}
      </Typography>

      {/* Ползунок для выбора порога */}
      <Box sx={{ mb: 3, width: "100%" }}>
        <Typography gutterBottom>Set your threshold</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">0</Typography>
          <Typography variant="body2">100</Typography>
        </Box>
        <Slider
          value={threshold}
          onChange={handleThresholdChange}
          min={1}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Радио-кнопки для выбора over / less */}
      <RadioGroup
        value={condition}
        onChange={(e) => setCondition(e.target.value as Condition)}
        row
        sx={{ justifyContent: "center", mb: 3 }}
      >
        <FormControlLabel value="over" control={<Radio />} label="Over" />
        <FormControlLabel value="under" control={<Radio />} label="Under" />
      </RadioGroup>

      {/* Кнопка "Play" */}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlay}
        size="large"
        fullWidth
      >
        Play
      </Button>

      {/* История игры */}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Guess</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.time}</TableCell>
                  <TableCell>{entry.guess}</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: entry.isWin ? "green" : "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {entry.result}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DiceGame;
