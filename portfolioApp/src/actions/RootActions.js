import { ROOT_CHANGED, WELCOME_SCREEN, MAIN_SCREENS } from './types'
export function changeAppRoot(root) {
    console.log('changeAppRoot', root)
    return {
      type: ROOT_CHANGED, 
      root
    }
}

export function appInitialized() {
    return async function(dispatch, getState) {
      // dispatch(changeAppRoot(WELCOME_SCREEN))
      dispatch(changeAppRoot(MAIN_SCREENS))
    }
}


