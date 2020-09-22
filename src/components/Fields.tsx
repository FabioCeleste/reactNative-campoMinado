import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import params from '../params';
import Mine from './Mine';
import Flag from './Flag';
// import { Container } from './styles';

interface Props {
  nearMines: number;
  mined: boolean;
  opened: boolean;
  exploded: boolean;
  flagged: boolean;
  onOpen: () => void;
}

const Fields: React.FC<Props> = (props) => {
  const {mined, nearMines, opened, exploded, flagged} = props;
  const styleField: any = [styles.field];

  if (opened) {
    styleField.push(styles.opened);
  }
  if (exploded) {
    styleField.push(styles.exploded);
  }
  if (flagged) {
    styleField.push(styles.regular);
  }
  // outros estilos
  if (styleField.length === 1) {
    styleField.push(styles.regular);
  }

  let color = '';
  if (nearMines > 0) {
    if (nearMines === 1) {
      color = '#2A28D7';
    }
    if (nearMines === 2) {
      color = '#2b520f';
    }
    if (nearMines > 1 && nearMines < 6) {
      color = '#f9060a';
    }
    if (nearMines >= 6) {
      color = '#f221a9';
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={props.onOpen}
      onLongPress={props.onSelect}>
      <View style={styleField}>
        {!mined && opened && nearMines > 0 ? (
          <Text style={[styles.label, {color: color}]}>{nearMines}</Text>
        ) : (
          false
        )}
        {mined && opened ? <Mine /> : false}
        {flagged && !opened ? <Flag /> : false}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Fields;

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
});
