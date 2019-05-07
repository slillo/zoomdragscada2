import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Circle } from "react-konva";
import Konva from "konva";
import { Image } from "react-konva";
import useImage from "use-image";

const PiantaEdificio = () => {
  const [image, status] = useImage(
    "https://qz52qzyq49.codesandbox.io/stringio.jpg"
  );

  console.log(image, status);
  return <Image image={image} />;
};

const ColoredRect = () => {
  const [color, setColor] = useState("green");
  const changeColor = () => setColor(Konva.Util.getRandomColor());

  return (
    <Rect
      x={40}
      y={40}
      width={500}
      height={500}
      fill={color}
      shadowBlur={5}
      onClick={changeColor}
    />
  );
};

const ColoredCircle = ({ lightState }) => {
  //const [color, setColor] = useState("Purple");
  //console.log("ok coloredrect");
  //const changeColor = () => setColor(Konva.Util.getRandomColor());
  const color = lightState ? "yellow" : "black";

  return <Circle x={160} y={160} fill={color} shadowBlur={5} radius={40} />;
};

const App = () => {
  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [lightState, setLightState] = useState(false);

  const handleWheel = e => {
    e.evt.preventDefault();

    const scaleBy = 1.01;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const s = stage.getPointerPosition();
    const m = mousePointTo;

    setStageScale(newScale);
    setStageX(-(m.x - s.x / newScale) * newScale);
    setStageY(-(m.y - s.y / newScale) * newScale);
  };

  const toggleLight = () => {
    setLightState(!lightState);
  };

  return (
    <div>
      <button onClick={toggleLight}>
        {lightState ? "Spegni " : "Accendi "} la luce
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        onWheel={handleWheel}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stageX}
        y={stageY}
      >
        <Layer>
          <PiantaEdificio />
        </Layer>

        <Layer>
          <ColoredCircle lightState={lightState} />
        </Layer>
      </Stage>
    </div>
  );
};

render(<App />, document.getElementById("root"));
