import React from 'react';

export default function Modal({ open, title, children, onClose, actions }){
  if (!open) return null;
  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal' onClick={(e)=>e.stopPropagation()}>
        <div className='modal-header'>
          <h3>{title}</h3>
          <button className='icon-btn' onClick={onClose}>×</button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
        <div className='modal-footer'>
          {actions}
        </div>
      </div>
    </div>
  );
}


