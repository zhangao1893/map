export const getListApi = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (data.id === 1) {
        resolve({
          code: 200,
          data: [
            { id: 1, text: '一' },
            { id: 2, text: '二' }
          ]
        });
      } else if (data.id === 2) {
        resolve({
          code: 200,
          data: [
            { id: 3, text: '三' },
            { id: 4, text: '四' }
          ]
        });
      } else {
        resolve({ code: 500 });
      }
    }, 2000);
  });
};
