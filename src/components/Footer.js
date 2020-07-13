import React from "react";
import { useSelector, } from 'react-redux';
import {
  selectCurrentLeaf,
} from '../utils/articleSlice';

import "./Footer.css";

export default function NewsItem(props) {
  const currentLeaf = useSelector(selectCurrentLeaf);
  return (
    <footer className = "site-footer">
      { currentLeaf &&
        <div className = "site-footer-flex">
          <div className = "site-footer-left">
            {currentLeaf.captionTitle}
          </div>
          <div className = "site-footer-right">
            { new Date( +currentLeaf.unixTime ).toLocaleDateString() }
          </div>
        </div>
      }
    </footer>
  )
}