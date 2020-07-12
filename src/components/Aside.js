import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleNode,
  selectDB,
  selectOpenNodesId,
  selectIsCurrentLeafOpen,
  selectCurrentLeaf,
} from '../utils/articleSlice';

import "./Aside.css";

export default function Aside(props) {
  const db = useSelector(selectDB);
  const openNodesId = useSelector(selectOpenNodesId);
  const isCurrentLeafOpen = useSelector(selectIsCurrentLeafOpen);
  const currentLeaf = useSelector(selectCurrentLeaf);
  const dispatch = useDispatch();

  function buildMenu(node){

    let isOpen = !!openNodesId.find( v => v === node.id )
    let _children = isOpen && node.children && node.children.map( childNode =>
      buildMenu( db.filter( nodeVal => nodeVal.id === childNode )[0] )
    );
    
    return (
      <div
        className = { isCurrentLeafOpen && node.id !== currentLeaf.id ? 'menu-disabled' : 'menu-enabled' }
        key = {node.id}
        onClick = { (e) => {
          e.stopPropagation();
          dispatch(toggleNode( node ));
        }}
      >
        {node.title}
        <div className = 'children'>
          {_children}
        </div>
      </div>
    );
  }

  const menu = db.filter( v => v.parent === 'root' ).map( v => buildMenu(v) );

  return (
    <aside className = "site-aside">
      {menu}
    </aside>
  )
}