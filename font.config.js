import * as Font from 'expo-font';
import { FontConst } from './constants/FontsConst';


export const LoadCustomFonts = async () => {
  await Font.loadAsync(FontConst);
};