import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { onUpdateWordTyped, onPressBackSpace } from './guessCharacterSlice';
import Keyboard from './Keyboard';
import { KEYBOARD_BUTTONS } from '../../helpers/constants';

export default function GuessGame() {
    const dispatch = useAppDispatch();
    const character = useAppSelector((state) => state.guessCharacter.character);

    const keyboard = useMemo(() => {
        const keyboardMap = KEYBOARD_BUTTONS.map(button => (
          {
            value: button,
            label: button.toUpperCase(),
            action: (_: any) => {
              dispatch(onUpdateWordTyped(button));
            },
          }
        ));
        const enterKey = {
          value: 'enter',
          label: 'ENTER',
          action: (_: any) => {},
        };
        const backSpaceKey = {
          value: 'backspace',
          label: 'BACKSPACE',
          action: (_: any) => {},
        };
        keyboardMap.splice(19, 0, enterKey);
        keyboardMap.push(backSpaceKey);
        return keyboardMap;
      }, []);
    return (
        <section>
            HI
            <Keyboard keyboard={keyboard}/>
        </section>
    )
}