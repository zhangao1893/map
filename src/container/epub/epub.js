import React, { useEffect, useRef, useState } from 'react';
import Epub from 'epubjs';
import './epub.less';
const url = `${publicPath}/static/other/123.epub`;

export default function epub() {
  const rendition = useRef(null);
  const bookLocation = useRef(null);
  const bookNavigation = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [guide, setGuide] = useState([]);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const book = new Epub(url);
    rendition.current = book.renderTo('box', {
      with: '100%',
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
    setTimeout(() => {
      const currentLocation = rendition.current.currentLocation();
      const progress = currentLocation.end.percentage;
      const location = currentLocation.end.cfi;
      console.log(progress);
      console.log(location);
    }, 50);
  };

  const prev = () => {
    rendition.current.prev();
  };

  const setFont = flag => {
    if (flag === 'reduce') {
      const newFont = fontSize === 12 ? 12 : fontSize - 2;
      setFontSize(newFont);
      rendition.current.themes.fontSize(`${newFont}px`);
    } else {
      const newFont = fontSize === 40 ? 40 : fontSize + 2;
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
    setShowNav(false);
  };
  const aa = () => {
    rendition.current.display('epubcfi(/6/14[A468350_1_En_3_Chapter]!/4/10/10[Sec11]/6[Sec13]/4[Par47]/7:802)');
  };
  const onchange = e => {
    progressChange(e.target.value);
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
        }}>
        是打发点
      </div>
      <input type="range" onChange={onchange} />
    </div>
  );
}
