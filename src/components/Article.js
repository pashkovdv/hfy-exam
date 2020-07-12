import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentLeaf,
  selectIsCurrentLeafOpen,
  selectShouldSave,
  saveCaption,
} from '../utils/articleSlice';

import "./Article.css";

export default function Article(props) {
  const currentLeaf = useSelector(selectCurrentLeaf);
  const shouldSave = useSelector(selectShouldSave);
  const isCurrentLeafOpen = useSelector(selectIsCurrentLeafOpen);
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const [isTextChanged, setTextChanged] = React.useState(false);

  React.useEffect( () => {
    if ( shouldSave ) {
      dispatch(saveCaption({
        ob: currentLeaf,
        newCaption: isTextChanged ? text : currentLeaf.caption,
      }));
      setText("");
      setTextChanged(false);
    }
  });

  return (
    <article className = "site-article">
      { isCurrentLeafOpen ?
        <textarea
          value = { isTextChanged ? text : currentLeaf.caption }
          onChange = { (e) => {
            setTextChanged(true);
            setText(e.target.value);
          }}
        />
      :
        <div>
          Выберите и откройте документ или письмо
        </div>
      }
    </article>
  )
}