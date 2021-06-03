import asyncComponent from '@/common/tool/asyncComponent'; // 异步加载
const Router = [
  {
    name: '测试',
    path: '/test',
    component: asyncComponent(() => import('@/container/test/test'))
  },
  {
    name: '测试2',
    path: '/test2',
    component: asyncComponent(() => import('@/container/test2/test2'))
  },
  {
    name: 'epub',
    path: '/epub',
    component: asyncComponent(() => import('@/container/epub/epub'))
  }
];
export default Router;
