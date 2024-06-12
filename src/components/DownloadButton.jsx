"use client";
import { saveAs } from "file-saver";
import React, { useRef, useState } from "react";
import Chart from "./Chart";
import html2canvas from "html2canvas";
import {
  Presentation,
  Slide,
  Text,
  Shape,
  Line,
  Image,
  Table,
  render,
} from "react-pptx";

function DownloadButton() {
  const chartRef = useRef(null);
  const [downloadState, setDownloadState] = useState(false);

  function generatePresentation(image) {
    const pptx = (
      <Presentation>
        <Slide>
          <Text style={{ x: 0, y: 0, w: "50%", h: "10%", fontSize: 32 }}>
            Wiley Journal Insights
          </Text>
          <Image
            src={{ kind: "data", data: image }}
            style={{ x: "10%", y: "20%", w: "50%", h: "50%" }}
          />
        </Slide>
      </Presentation>
    );

    render(pptx).then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
      saveAs(blob, "presentation.pptx");
    });
  }
  const captureChart = async () => {
    setDownloadState(true);
    const chartElement = chartRef.current;
    const canvas = await html2canvas(chartElement);
    const image = canvas.toDataURL("image/png");
    generatePresentation(image);
  };

  return (
    <div>
      {downloadState && (
        <div ref={chartRef} style={{ position: "absolute", left: "-9999px" }}>
          <Chart />
        </div>
      )}
      <button
        onClick={captureChart}
        className="border-2 cursor-crosshair border-solid"
      >
        DownloadButton
      </button>
    </div>
  );
}

export default DownloadButton;
