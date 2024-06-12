import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Chart() {
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
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}

export default Chart;
