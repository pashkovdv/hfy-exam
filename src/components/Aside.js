import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

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
    
    let classes = isCurrentLeafOpen && node.id !== currentLeaf.id ? 'menu-disabled ' : 'menu-enabled ';
    return (
      <li
        key = {node.id}
        onClick = { (e) => {
          e.stopPropagation();
          dispatch(toggleNode( node ));
        }}
      >
        <div className = {'menu-item ' + classes} >
          <div className = 'menu-item-icon'>
            { node.children ?
                isOpen ? <IndeterminateCheckBoxOutlinedIcon fontSize="small" /> : <AddBoxOutlinedIcon fontSize="small" />
              :
                <EmailOutlinedIcon fontSize="small" />
            }
          </div>
          <div className = 'menu-item-caption'>
            {node.title}
          </div>
        </div>
        <ul>
          {_children}
        </ul>
      </li>
    );
  }

  const menu = db.filter( v => v.parent === 'root' ).map( v => buildMenu(v) );

  return (
    <aside className = "site-aside">
      <ul>
        {menu}
      </ul>
    </aside>
  )
}