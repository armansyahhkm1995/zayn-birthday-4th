import { useEffect, useRef, useState, type RefObject } from "react";

export type BoardRect = {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const defaultBoardRect: BoardRect = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
};

export function useBoardRect<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
): BoardRect {
  const [boardRect, setBoardRect] = useState<BoardRect>(defaultBoardRect);
  const previousSizeRef = useRef<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateBoardRect = () => {
      const element = elementRef.current;
      if (!element) {
        setBoardRect(defaultBoardRect);
        return;
      }

      const nextRect = element.getBoundingClientRect();
      const nextSize = {
        width: nextRect.width,
        height: nextRect.height,
      };

      if (
        previousSizeRef.current &&
        previousSizeRef.current.width === nextSize.width &&
        previousSizeRef.current.height === nextSize.height
      ) {
        return;
      }

      previousSizeRef.current = nextSize;
      setBoardRect({
        width: nextRect.width,
        height: nextRect.height,
        left: nextRect.left,
        top: nextRect.top,
        right: nextRect.right,
        bottom: nextRect.bottom,
      });
    };

    updateBoardRect();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateBoardRect())
        : null;

    const element = elementRef.current;
    if (element) {
      resizeObserver?.observe(element);
    }

    const handleResize = () => updateBoardRect();
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [elementRef]);

  return boardRect;
}
