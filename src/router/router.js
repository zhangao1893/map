import asyncComponent from '@/common/tool/asyncComponent'; // 异步加载
const Router = [
  {
    name: '测试',
    path: '/test',
    component: asyncComponent(() => import('@/container/test/test'))
  }
];
export default Router;
