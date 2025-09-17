import React, { useState } from 'react';

export default function NotificationDropdown(){
  const [open, setOpen] = useState(false);
  const notifications = [];
  return (
    <div className='notif-dropdown'>
      <button className='btn' onClick={()=>setOpen(v=>!v)}>Notifications</button>
      {open && (
        <div className='menu'>
          {notifications.length === 0 && <div className='empty'>No notifications</div>}
        </div>
      )}
    </div>
  );
}


