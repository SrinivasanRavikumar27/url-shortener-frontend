import React, { useEffect, useRef, useState } from "react";
import "../../styles/user/dashBoard.css";
import { Line, Bar } from "react-chartjs-2";
import {
  LineElement,
  Chart,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ...registerables
);
import urlService from "../../services/urlService.js";

function DashBoard() {
  const [monthData, setMonthData] = useState([]);
  const [defualtMonthData, setDefualtMonthData] = useState(null);
  const [month, setMonth] = useState("");

  // dayWise chart

  // daywise options
  const dayOptions = {
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const [dayData, setDayData] = useState({
    labels: ["today"],
    options: dayOptions,
    datasets: [
      {
        label: "DayWise UrlShortener Clicks",
        data: [0],
        backgroundColor: ["aqua"],
        borderColor: ["aqua"],
      },
    ],
  });

  // to fetch all defualt data
  const fetchData = async () => {
    const currentDate = new Date();

    const monthResponse = await urlService.monthWiseData(
      currentDate.getUTCMonth(),
      currentDate.getUTCFullYear()
    );

    if (monthResponse) {
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: monthResponse,
          },
        ],
      });
    }

    const dayResponse = await urlService.dayWiseData();

    if (dayResponse) {
      setDayData({
        ...dayData,
        datasets: [
          {
            ...dayData.datasets[0],
            data: [dayResponse.clicks[0]],
          },
        ],
      });
    }
  };

  // to get value of chart to analysis
  useEffect(() => {
    fetchData();
  }, []);

  // monthWise Chart
  const getLastDay = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // defualt month chart label data function
  const labelForMonthWise = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const labels = [];
    for (let i = 1; i <= getLastDay(currentMonth, currentYear); i++) {
      const dateStr = `${String(i).padStart(2, "0")}-${String(
        currentMonth
      ).padStart(2, "0")}-${currentYear}`;

      labels.push(dateStr);
    }

    return labels;
  };

  // month chart defualt data
  const [chartData, setChartData] = useState({
    labels: labelForMonthWise(),
    datasets: [
      {
        label: "MonthWise UrlShortener Clicks",
        data: [],
        borderColor: "aqua",
        backgroundColor: "aqua",
        tension: 0.4,
      },
    ],
  });

  // monthwise chart options
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // month calendar function
  const monthChange = async (month1) => {
    const year = month1.substring(0, 4);
    const monthValue = month1.substring(5, 7);

    setMonth(month1);

    const changeMonth = [];
    for (let i = 1; i <= getLastDay(monthValue, year); i++) {
      const dateStr = `${String(i).padStart(2, "0")}-${monthValue}-${year}`;
      changeMonth.push(dateStr);
    }

    const utcDate = new Date(Date.UTC(Number(year), Number(monthValue - 1), 1));

    const utcMonth = utcDate.getUTCMonth();
    const utcYear = utcDate.getUTCFullYear();

    const monthResponse = await urlService.monthWiseData(utcMonth, utcYear);

    if (monthResponse) {
      console.log(monthResponse);
      setMonthData(monthResponse);
    }

    setChartData({
      ...chartData,
      labels: changeMonth,
      datasets: [
        {
          ...chartData.datasets[0],
          data: monthResponse,
        },
      ],
    });
  };

  // reset button function
  const monthWiseReset = () => {
    setChartData({
      ...chartData,
      labels: labelForMonthWise(),
    });
    setMonth("");
  };

  return (
    <div>
      <div className="chart">
        <div className="dayWise">
          <Bar data={dayData} className="doughnut-chart" />
        </div>

        <div className="monthwise">
          <Line data={chartData} options={options} className="line-chart" />
          <input
            className="monthInput"
            type="month"
            value={month}
            onChange={(e) => monthChange(e.target.value)}
          />
          <button className="monthReset" onClick={monthWiseReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
