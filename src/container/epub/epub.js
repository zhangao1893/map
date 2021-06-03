import React, { useEffect, useRef, useState } from 'react';
import Epub from 'epubjs';
import './epub.less';
import { Slider } from 'antd';
const url = `${publicPath}/static/other/book.epub`;

export default function epub() {
  const rendition = useRef(null);
  const bookLocation = useRef(null);
  const bookNavigation = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [guide, setGuide] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const book = new Epub(url);
    rendition.current = book.renderTo('box', {
      width: '100%',
      height: '100%'
    });
    rendition.current.display();
    rendition.current.themes.fontSize('16px');
    rendition.current.themes.register('default', { body: { color: '#000', background: '#fff' } });
    rendition.current.themes.register('night', { body: { color: '#fff', background: '#000' } });
    rendition.current.themes.register('other', { body: { color: 'red', background: 'green' } });
    book.ready
      .then(() => {
        bookNavigation.current = book.navigation;
        setGuide(book.navigation.toc);
        return book.locations.generate();
      })
      .then(res => {
        bookLocation.current = book.locations;
      });
  }, []);

  const next = () => {
    rendition.current.next();
    getPosizition();
  };

  const prev = () => {
    rendition.current.prev();
    getPosizition();
  };

  const setFont = flag => {
    if (flag === 'reduce') {
      const newFont = fontSize === 12 ? 12 : fontSize - 1;
      setFontSize(newFont);
      rendition.current.themes.fontSize(`${newFont}px`);
    } else {
      const newFont = fontSize === 40 ? 40 : fontSize + 1;
      setFontSize(newFont);
      rendition.current.themes.fontSize(`${newFont}px`);
    }
  };
  const changeColor = index => {
    if (index === 1) {
      rendition.current.themes.select('default');
    } else if (index === 2) {
      rendition.current.themes.select('night');
    } else {
      rendition.current.themes.select('other');
    }
  };
  const progressChange = progress => {
    const percentage = progress / 100;
    const location = percentage > 0 ? bookLocation.current.cfiFromPercentage(percentage) : 0;
    rendition.current.display(location);
  };
  const jumpTo = href => {
    rendition.current.display(href);
    getPosizition();
    setShowNav(false);
  };
  const aa = () => {
    rendition.current.display('epubcfi(/6/10[A468350_1_En_2_Chapter]!/4/12/4[Sec2]/6[Par10]/1:151)');
  };
  const onChange = e => {
    setProgress(e);
    progressChange(e);
  };
  const getPosizition = () => {
    setTimeout(() => {
      const currentLocation = rendition.current.currentLocation();
      const progress = currentLocation.end.percentage;
      const location = currentLocation.end.cfi;
      setProgress(progress);
      setProgress(progress * 100);
      console.log(location);
      // localStorage.bookIn;
    }, 500);
  };

  return (
    <div className="epub">
      <div id="box"></div>
      <div className="handleBox">
        <div
          className="left"
          onClick={() => {
            prev();
          }}></div>
        <div
          className="center"
          onClick={() => {
            setShowNav(!showNav);
          }}></div>
        <div
          className="right"
          onClick={() => {
            next();
          }}></div>
      </div>
      <div className="navigation" style={{ display: showNav ? 'block' : 'none' }}>
        {guide.map(item => {
          return (
            <div
              className="one"
              key={item.id}
              onClick={() => {
                jumpTo(item.href);
              }}>
              {item.label}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            prev();
          }}>
          上一页
        </span>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            next();
          }}>
          下一页
        </span>
      </div>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Slider step={0.1} value={progress} onChange={onChange} />
      </div>
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setFont('reduce');
          }}>
          -字体
        </span>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setFont('add');
          }}>
          +字体
        </span>
      </div>
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            changeColor(1);
          }}>
          颜色1
        </span>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            changeColor(2);
          }}>
          颜色2
        </span>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            changeColor(3);
          }}>
          颜色3
        </span>
      </div>
      <div
        onClick={() => {
          aa();
        }}
        style={{ textAlign: 'center' }}>
        跳吧
      </div>
    </div>
  );
}
