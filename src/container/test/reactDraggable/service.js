import Anime from 'animejs';

// let zIndex = 1;

/**
 * 动画服务
 */
export const onAnime = (item, callback) => {
  const element = document.getElementById(item.id);
  let initOptions = { targets: element, duration: 300, easing: 'linear' };
  //   zIndex++;
  if (item.show) {
    // element.style.display = 'block';
    // element.style.zIndex = `${zIndex}`;
    initOptions = {
      ...initOptions,
      scaleY: [0, 1]
    };
  } else {
    initOptions = {
      ...initOptions,
      scaleY: [1, 0]
    };
  }
  const animeOptions = {
    ...initOptions,
    complete() {
      typeof callback === 'function' && callback();
      if (!item.show) {
        // element.style.display = 'none';
      }
    }
  };
  Anime(animeOptions);
};
