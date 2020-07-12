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
        <React.Fragment>
          <div>
            {currentLeaf.captionTitle}
          </div>
          <div>
            { new Date( +currentLeaf.unixTime ).toLocaleDateString() }
          </div>
        </React.Fragment>
      }
    </footer>
  )
}