import { RefObject, useEffect, useState } from "react"
import { useWindowDimensions } from './useWindowDimensions';
import { useRouter } from 'next/router';

export const useGridCols = (
  boxRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
  paddingX: number
) => {
  const [gridCols, setGridCols] = useState<string>()
  const windowDimensions = useWindowDimensions()
  const router = useRouter()

  useEffect(() => {
    if (boxRef.current && containerRef.current) {
      // console.log('box width: ', boxRef.current.scrollWidth)
      // console.log('container width: ', containerRef.current.scrollWidth)
      let cols = containerRef.current.scrollWidth / boxRef.current.scrollWidth
      switch (true) {
        case (cols > 6 && cols <= 7):
          setGridCols('repeat(5, minmax(0, 1fr))')
          break
        case (cols > 5 && cols <= 6):
          setGridCols('repeat(4, minmax(0, 1fr))')
          break
        case (cols > 4 && cols <= 5):
          setGridCols('repeat(3, minmax(0, 1fr))')
          break
        case (cols > 2 && cols <= 4):
          setGridCols('repeat(2, minmax(0, 1fr))')
          break
        case (cols <= 2):
          setGridCols('repeat(1, minmax(0, 1fr))')
          break
        default:
          setGridCols(`repeat(2, minmax(0, 1fr))`)
          break
      }
      // console.log(cols)
      // console.log(containerRef.current.scrollWidth % boxRef.current.scrollWidth)
    }
  }, [containerRef, boxRef, windowDimensions, router.asPath])
  return gridCols
}