import { ROOT_CHANGED, WELCOME_SCREEN } from './types'

export function changeAppRoot(root) {
  // console.log('dddd', root)
    return {
      type: ROOT_CHANGED, 
      root 
    }
}

export function appInitialized() {
    return async function(dispatch, getState) {
      dispatch(changeAppRoot(WELCOME_SCREEN));
    }
}


