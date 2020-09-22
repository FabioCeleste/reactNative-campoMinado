import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BoardElement} from '../types';

import Field from './Fields';
// import { Container } from './styles';

interface Props {
  board: BoardElement[][];
  onOpenField: (row: number, column: number) => void;
  onSelectField: (row: number, column: number) => void;
}

const MinedField: React.FC<Props> = (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => props.onOpenField(r, c)}
          onSelect={() => props.onSelectField(r, c)}
        />
      );
    });
    return (
      <View key={r} style={{flexDirection: 'row'}}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});

export default MinedField;
