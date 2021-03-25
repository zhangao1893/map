import React, { useEffect, useState, useRef, Fragment } from 'react';
export default function scroll(props) {
  const { children, containerID, scrollID } = props;
  const [shoundScroll, setShoundScroll] = useState(true);
  const ref = useRef();
  ref.current = shoundScroll;

  useEffect(() => {
    move();
  }, []);

  const move = () => {
    const box = document.getElementById(containerID);
    const inner = document.getElementById(scrollID);
    box.addEventListener('mouseover', () => {
      setShoundScroll(false);
    });
    box.addEventListener('mouseout', () => {
      setShoundScroll(true);
    });
    setInterval(() => {
      if (ref.current) {
        if (box.scrollTop <= inner.offsetHeight - box.offsetHeight) {
          box.scrollTop += 1;
        } else {
          box.scrollTop = 0;
        }
      }
    }, 50);
  };

  return <Fragment>{children}</Fragment>;
}
