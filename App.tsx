/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import LevelSelect from './src/screens/LevelSelection';
import params from './src/params';
import createMinedBoard, {
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagUsed,
} from './src/functions';
import MineField from './src/components/MinedFields';
import Header from './src/components/Header';

const App = () => {
  const cols = params.getColumnsAmount();
  const rows = params.getRowsAmount();

  function minesAmount() {
    return Math.ceil(cols * rows * params.dificultLevel);
  }

  const newBoard = createMinedBoard(rows, cols, minesAmount());
  const [board, setBoard] = useState(newBoard);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [lvlSelect, setLvlSelect] = useState(false);

  function onOpenField(row: number, column: number) {
    const clonedBoard = cloneBoard(board);
    openField(clonedBoard, row, column);
    const losted = hadExplosion(clonedBoard);
    const won = wonGame(clonedBoard);
    if (losted) {
      showMines(clonedBoard);
      Alert.alert('Perdeu!');
    }
    if (won) {
      Alert.alert('Venceu!');
    }
    setBoard(clonedBoard);
    setWin(won);
    setLost(losted);
  }

  function onSelectField(row: number, column: number) {
    const clonedBoard = cloneBoard(board);
    invertFlag(clonedBoard, row, column);
    const won = wonGame(clonedBoard);

    if (won) {
      Alert.alert('Venceu!');
    }
    setBoard(clonedBoard);
  }

  const createState = () => {
    setBoard(createMinedBoard(rows, cols, minesAmount()));
    setWin(false);
    setLost(false);
  };

  const onLevelSelect = (level) => {
    params.dificultLevel = level;
    createState();
    setLvlSelect(false);
  };

  return (
    <View style={styles.container}>
      <LevelSelect
        isVisible={lvlSelect}
        onLevelSelected={onLevelSelect}
        onCancel={() => setLvlSelect(false)}
      />
      <Header
        flagsLeft={minesAmount() - flagUsed(board)}
        onNewGame={() => createState()}
        onFlagPress={() => setLvlSelect(true)}
      />
      <View style={styles.board}>
        <MineField
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
});

export default App;
