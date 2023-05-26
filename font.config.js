import * as Font from 'expo-font';
import { FontsConst } from './constants/FontsConst';


export const LoadCustomFonts = async () => {
  await Font.loadAsync(FontsConst);
};