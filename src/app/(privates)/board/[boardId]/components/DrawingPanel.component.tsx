"use client";

import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEvent,
  TouchEvent,
} from "react";
import styles from "../styles/drawing-panel.style.module.css";
import {
  ActionMode,
  DrawingPanelProps,
  HorizontalLineAttributes,
  NormalLineAttributes,
  RectangleAttributes,
  ShapeEntity,
  ShapeTypes,
  VerticalLineAttributes,
} from "../types.type";
import VerticalLine from "./VerticalLine.component";
import HorizontalLine from "./HorizontalLine.component";
import NormalLine from "./NormalLine.component";
import Rectangle from "./Rectangle.component";

export default function DrawingPanel({
  paintable,
  shapes,
  selectedShape,
  setSelectedShape,
  actionMode,
  hoveredShape,
  setDrawingPanelSize,
}: DrawingPanelProps) {
  const drawingPanelRef = useRef<HTMLDivElement>(null);
  const mousePanelRef = useRef<HTMLDivElement>(null);

  const [panelActive, setPanelActive] = useState(false);
  const [lastPaint, setLastPaint] = useState(0);

  useEffect(() => {
    if (panelActive) {
      const windowCurrentScroll = {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
      };
      window.onscroll = () =>
        window.scrollTo(windowCurrentScroll.x, windowCurrentScroll.y);
      return;
    }

    window.onscroll = () => {};
  }, [panelActive]);

  useEffect(() => {
    if (
      actionMode === ActionMode.Disable ||
      actionMode === ActionMode.Select ||
      !selectedShape ||
      panelActive
    ) {
      return;
    }

    const currentShape = shapes.find((shape) => shape.name === selectedShape);
    //onFinishPainting(currentShape);
  }, [panelActive]);

  useEffect(() => {
    onResize();
  }, []);

  useEffect(() => {
    if (!mousePanelRef.current) {
      return;
    }

    actionMode === ActionMode.Disable || actionMode === ActionMode.Select
      ? (mousePanelRef.current.style.zIndex = "0")
      : (mousePanelRef.current.style.zIndex = "2");
  }, [actionMode]);

  const onResize = () => {
    if (!drawingPanelRef.current) {
      return;
    }

    const { width, height } = drawingPanelRef.current!.getBoundingClientRect();
    setDrawingPanelSize({ width, height });
  };

  const cancelSelections = () =>
    (actionMode === ActionMode.Disable || actionMode === ActionMode.Select) &&
    setSelectedShape &&
    setSelectedShape("");

  const rescaleShape = (
    shape: ShapeEntity,
    mousePostition: { x: number; y: number },
  ): ShapeEntity => {
    let newCordinates = {};

    switch (shape.type) {
      case ShapeTypes.NormalLine: {
        const { attributes } = shape as ShapeEntity<NormalLineAttributes>;
        newCordinates = {
          x1: attributes.x1,
          y1: attributes.y1,
          x2: mousePostition.x,
          y2: mousePostition.y,
        };
        break;
      }

      case ShapeTypes.HorizontalLine: {
        const { attributes } = shape as ShapeEntity<HorizontalLineAttributes>;
        newCordinates = {
          length: mousePostition.x - attributes.x,
        };
        break;
      }

      case ShapeTypes.VerticalLine: {
        const { attributes } = shape as ShapeEntity<VerticalLineAttributes>;
        newCordinates = {
          length: mousePostition.y - attributes.y,
        };
        break;
      }

      case ShapeTypes.Rectangle: {
        const { attributes } = shape as ShapeEntity<RectangleAttributes>;
        newCordinates = {
          height: mousePostition.y - attributes.y,
          width: mousePostition.x - attributes.x,
        };
        break;
      }
    }

    const { attributes, ...rest } = shape;
    return { ...rest, attributes: { ...attributes, ...newCordinates } };
  };

  const moveShape = (
    shape: ShapeEntity,
    mousePostition: { x: number; y: number },
  ): ShapeEntity => {
    let newCordinates = {};

    switch (shape.type) {
      case ShapeTypes.NormalLine:
        const { attributes } = shape as ShapeEntity<NormalLineAttributes>;
        newCordinates = {
          x1: mousePostition.x,
          y1: mousePostition.y,
          x2: attributes.x2 + mousePostition.x - attributes.x1,
          y2: attributes.y2 + mousePostition.y - attributes.y1,
        };
        break;

      case ShapeTypes.HorizontalLine:
        newCordinates = {
          x: mousePostition.x,
          y: mousePostition.y,
        };
        break;

      case ShapeTypes.VerticalLine:
        newCordinates = {
          x: mousePostition.x,
          y: mousePostition.y,
        };
        break;

      case ShapeTypes.Rectangle:
        newCordinates = {
          x: mousePostition.x,
          y: mousePostition.y,
        };
        break;
    }
    const { attributes, ...rest } = shape;
    return { ...rest, attributes: { ...attributes, ...newCordinates } };
  };

  const updateShapeAttribute = (
    shape: ShapeEntity,
    mousePostition: { x: number; y: number },
  ): ShapeEntity =>
    actionMode === ActionMode.Move
      ? moveShape(shape, mousePostition)
      : rescaleShape(shape, mousePostition);

  const paint = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => {
    if (
      actionMode === ActionMode.Disable ||
      actionMode === ActionMode.Select ||
      !selectedShape ||
      !panelActive
    ) {
      return;
    }

    const target = e.target as HTMLDivElement;
    const panelPosition = target.getBoundingClientRect();
    let mousePostition: { x: number; y: number };
    if ((e as TouchEvent).touches) {
      mousePostition = {
        x: (e as TouchEvent).touches[0].clientX - panelPosition.x,
        y: (e as TouchEvent).touches[0].clientY - panelPosition.y,
      };
    } else {
      mousePostition = {
        x: (e as MouseEvent).clientX - panelPosition.x,
        y: (e as MouseEvent).clientY - panelPosition.y,
      };
    }

    const now = new Date();
    const timeFromLastPaint = now.getTime() - lastPaint;
    if (timeFromLastPaint < 50) {
      return;
    } else {
      setLastPaint(now.getTime());
    }

    const currentShape = shapes.find((shape) => shape.name === selectedShape)!;
    const updatedShape = updateShapeAttribute(currentShape, mousePostition);

    //    onAShapeUpdated(updatedShape);
    //
  };

  const getShapes = (): ReactNode[] => {
    return shapes.map((shape, index) => {
      const { attributes, name, type } = shape;

      switch (type) {
        case ShapeTypes.VerticalLine:
          return (
            <VerticalLine
              attributes={attributes as VerticalLineAttributes}
              id={name}
              key={index}
              selected={paintable && selectedShape === name}
              setSelectedShape={setSelectedShape}
              hovered={hoveredShape === name}
            />
          );

        case ShapeTypes.HorizontalLine:
          return (
            <HorizontalLine
              attributes={attributes as HorizontalLineAttributes}
              id={name}
              key={index}
              selected={selectedShape === name}
              setSelectedShape={setSelectedShape}
              hovered={hoveredShape === name}
            />
          );

        case ShapeTypes.NormalLine:
          return (
            <NormalLine
              attributes={attributes as NormalLineAttributes}
              id={name}
              key={index}
              selected={selectedShape === name}
              setSelectedShape={setSelectedShape}
              hovered={hoveredShape === name}
            />
          );

        case ShapeTypes.Rectangle:
          return (
            <Rectangle
              attributes={attributes as RectangleAttributes}
              id={name}
              key={index}
              selected={selectedShape === name}
              setSelectedShape={setSelectedShape}
              hovered={hoveredShape === name}
            />
          );
      }
    });
  };

  return (
    <div
      ref={drawingPanelRef}
      className={styles.drawingPanel}
      id="drawingPanel"
    >
      {paintable && (
        <div
          ref={mousePanelRef}
          className={styles.drawingPanelMousePanel}
          onMouseDown={() => setPanelActive(true)}
          onMouseUp={() => setPanelActive(false)}
          onMouseMove={paint}
          onTouchMove={paint}
          onTouchStart={() => setPanelActive(true)}
          onTouchEnd={() => setPanelActive(false)}
          onClick={cancelSelections}
        ></div>
      )}
      {getShapes()}
    </div>
  );
}
