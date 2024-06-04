"use client";
import { saveAs } from "file-saver";
import React, { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
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
    const chartElement = chartRef.current.container.current;
    const canvas = await html2canvas(chartElement);
    const image = canvas.toDataURL("image/png");
    generatePresentation(image);
  };

  const options = {
    title: {
      text: "My Chart",
    },
    series: [
      {
        name: "My Data",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };
  return (
    <div>
      <div style={{ position: "absolute", left: "-9999px" }}>
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
        />
      </div>
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
