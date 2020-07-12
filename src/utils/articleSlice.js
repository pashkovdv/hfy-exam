import { createSlice } from '@reduxjs/toolkit';
import db from '../resources/db.json'

export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    db,
    openNodesId: [],
    currentLeaf: undefined,
    isCurrentLeafOpen: false,
    shouldSave: false,
  },
  reducers: {
    // меняю стэйт напрямую, т.к.:

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    openLeaf: (state) => {
      state.isCurrentLeafOpen = true;
    },
    setShouldSave: (state) => {
      state.shouldSave = true;
    },
    saveCaption: (state, action) => {
      state.shouldSave = false;
      state.isCurrentLeafOpen = false;
      state.db = state.db.map( v => {
        if ( v.id === action.payload.ob.id ) return { ...v, caption: action.payload.newCaption };
        return v;
      })
    },
    toggleNode: (state, action) => {
      if ( !action.payload.children ){
        state.currentLeaf = action.payload;
        return;
      }
      state.currentLeaf = undefined;

      function getCurrentNodesId(node) {
        if ( node.parent === 'root' ){
          return [node.id];
        };
        
        let parentNode = state.db.filter( nodeVal => nodeVal.id === node.parent )[0];
        return [node.id].concat( getCurrentNodesId( parentNode ));
      };

      if ( state.openNodesId.find( v => v === action.payload.id )) {
        state.openNodesId = state.openNodesId.filter( v => v !== action.payload.id );
      } else {
        state.openNodesId = getCurrentNodesId(action.payload);
      };
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { openLeaf, setShouldSave, saveCaption, toggleNode, toggleMenu, } = articleSlice.actions;

export const selectDB = state => {
  return state.articles.db;
}

export const selectOpenNodesId = state => {
  return state.articles.openNodesId;
}

export const selectCurrentLeaf = state => {
  return state.articles.currentLeaf;
}

export const selectIsCurrentLeafOpen = state => {
  return state.articles.isCurrentLeafOpen;
}

export const selectShouldSave = state => {
  return state.articles.shouldSave;
}

export default articleSlice.reducer;
