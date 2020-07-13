import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentLeaf,
  openLeaf,
  setShouldSave,
} from '../utils/articleSlice';

import "./Menu.css";

export default function Menu(props) {
  const currentLeaf = useSelector(selectCurrentLeaf);
  const dispatch = useDispatch();
  const [isMenuOpen, toggleMenu] = React.useState(false);

  return (
    <div
      className = 'header-menu-container'
    >
      <div
        className = 'header-menu-dropdown'
        onMouseEnter = { () => { toggleMenu( !isMenuOpen ) }}
        onMouseLeave = { () => { toggleMenu( !isMenuOpen ) }}
      >
        Действия
        { isMenuOpen &&
          <React.Fragment>
            <div
              className = 'header-menu-dropdown-item'
              disabled = { !currentLeaf }
              onClick = { (e) => {
                dispatch( openLeaf() );
                toggleMenu( !isMenuOpen )
              }}
            >
              Открыть
            </div>
            <div
              className = 'header-menu-dropdown-item'
              disabled = { !currentLeaf }
              onClick = { (e) => {
                dispatch( setShouldSave() );
                toggleMenu( !isMenuOpen )
              }}
            >
              Сохранить
            </div>
          </React.Fragment>
        }
      </div>
    </div>
  )
}