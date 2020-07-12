import React from "react";

import Menu from './Menu';
import "./Header.css";

export default function Header(props) {
  return (
    <header className = "site-header">
      <div>Тестовое задание</div>
      <div>Пользователь</div>
      <Menu />
    </header>
  )
}