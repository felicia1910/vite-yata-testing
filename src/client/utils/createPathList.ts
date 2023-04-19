import { Dispatch, SetStateAction } from 'react';
import { ICategoryList } from '../redux/config/slice';
export const createPathList = (
  categoryList: ICategoryList[],
  pathList: string[],
  setDeptList?: Dispatch<SetStateAction<ICategoryList[]>>,
  setSegmentList?: Dispatch<SetStateAction<ICategoryList[]>>,
  setTypeList?: Dispatch<SetStateAction<ICategoryList[]>>,
) => {
  const catLs = categoryList.filter(
    (cat) => cat.url_key === pathList[0]
  )[0];
  if (setDeptList) setDeptList(catLs?.children ?? []);
  const deptLs = catLs?.children ? catLs.children!.filter(
    (dept) => dept.url_key === pathList[1]
  )[0] : undefined;
  if (setSegmentList) setSegmentList(deptLs?.children ?? []);
  const segLs = deptLs?.children ? deptLs.children!.filter(
    (seg) => seg.url_key === pathList[2]
  )[0] : undefined;
  if (setTypeList) setTypeList(segLs?.children ?? []);
  const type = segLs?.children ? segLs.children.filter(
    (type) => type.url_key === pathList[3]
  )[0] : undefined;

  // console.log("dept list: ", catLs);
  // console.log("seg list: ", deptLs);
  // console.log("type list: ", segLs);

  const catPath = {
    category: { path: pathList[0], name: catLs?.name, id: catLs?.id },
    dept: { path: pathList[1], name: deptLs?.name, id: deptLs?.id },
    segment: { path: pathList[2], name: segLs?.name, id: segLs?.id },
    type: { path: pathList[3], name: type?.name, id: type?.id },
  };

  return catPath
}