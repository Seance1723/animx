import { useEffect } from 'react';
import { loadAnimX } from '../utils/animxLoader';

export default function useAnimX() {
  useEffect(() => {
    loadAnimX();
  }, []);
}