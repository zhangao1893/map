import React, { useState } from 'react';
import { CompactPicker } from 'react-color';
export default function reactColor() {
  const [color, setColor] = useState('#FFFFFF');
  const handleColorChange = e => {
    console.log(e);
    setColor(e.hex);
  };
  return (
    <div>
      <CompactPicker color={color} onChange={handleColorChange} />
    </div>
  );
}
