import React from "react";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import Menu from './Menu';
import "./Header.css";

export default function Header(props) {
  return (
    <header className = "site-header">
      <div
        className = 'site-header-left'
      >
        <h1>
          Тестовое задание
        </h1>
      </div>
      <div
        className = 'site-header-logo'
      >
        <AccountCircleOutlinedIcon fontSize="large" />
      </div>
      <div
        className = 'site-header-right'
      >
        <Menu />
      </div>
    </header>
  )
}