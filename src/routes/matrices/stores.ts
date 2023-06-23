import { writable } from 'svelte/store';
import { identityMatrix } from './math';

const endMatrix = writable(identityMatrix());

const createAnimation = () => {
  const { subscribe } = writable()

  return {
    subscribe,
    setNew: (newMatrix: number[]) => 
  }
}

export const 