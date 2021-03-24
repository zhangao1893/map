'use strict';
/**
 * Created by fanweihua on 2021/03/16
 */
import { http } from '@/common/http/http';
export const getName = () => {
  return http(`${httpUrl}getName`, {
    method: 'get'
  });
};
export const modifyName = () => {
  return http(`${httpUrl}modifyName`, {
    method: 'post',
    data: { id: 1 },
    type: 'form'
  });
};
