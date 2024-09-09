import React, { useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { LuBoxSelect } from "react-icons/lu";
import { useState } from "react";
import { LineChart } from "@mui/x-charts";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import HeatMap from "react-heatmap-grid";

function Dashbord() {
  const [userName, setuserName] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    CPC: true,
    CR_perc: true,
    ROAS: true,
  });
  const [metrics, setMetrics] = useState([]);
  const { RangePicker } = DatePicker;
  let [startDate, setStartDate] = useState("2024-06-08");
  let [endDate, setEndDate] = useState("2024-07-07");
  const [categories, setCategories] = useState([]);
  const [serios, setSerios] = useState([]);
  const [heatMapResult, setHeatMapResult] = useState([]);
  const [xLabelsDays, setXLabelsDays] = useState([]);

  function dropDown() {
    const data = {
      type: "customizeMetrics",
    };
    fetch(
      "https://coreapi.hectorai.live/api/day-parting/DayPartingFilterList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "X-USER-IDENTITY":
            "U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.result?.length) {
          setMetrics([]);
          setCheckboxes({});
          res.result.map((item) => {
            setCheckboxes((prevCheckboxes) => ({
              ...prevCheckboxes,
              [item.code]: false,
            }));
            setMetrics((prevMetrics) => [...prevMetrics, item]);
          });
        }
      });
  }
  useEffect(() => {
    dropDown();
  }, []);
  // dropDown()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function handleDate() {
    const data = {
      startDate,
      endDate,
      metrics: Object.keys(checkboxes).filter((key) => checkboxes[key]),
    };
    fetch(
      "https://coreapi.hectorai.live/api/day-parting/DayPartingPerformanceGraphList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "X-USER-IDENTITY":
            "U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.result.series) {
          setSerios(res.result.series);
        }
        if (res.result.categories?.length) {
          setCategories(res.result.categories);
        }
      });
  }

  useEffect(() => {
    handleDate();
    console.log("this is a series--->", serios);
    heatMap();
    console.log("this is heatmam result array:", heatMapResult)
    console.log("xLabelsDays--in useEffect--->", xLabelsDays);
  }, [startDate, endDate, metrics]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log("names---:", name);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    setuserName(localStorage.getItem("userName"));
  }, []);

  function userLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  }

  const navigate = useNavigate();
  const items = [
    { label: "Techsavvy", disabled: true },
    { label: "Dashboard", key: "Dashboard", icon: <AiOutlineDashboard /> },
  ];

  const navItems = [
    {
      key: "1",
      style: { color: "white" },
      icon: <FaRegUser />,
      label: <MdOutlineKeyboardArrowDown style={{ display: "inline" }} />,
      children: [
        { key: "1.1", label: userName },
        {
          key: "1.2",
          label: <button onClick={userLogOut}>Logout</button>,
          icon: <IoIosLogOut />,
        },
      ],
    },
    { key: "2", icon: <IoMoonOutline /> },
    { key: "3", icon: <LuBoxSelect /> },
    {
      key: "4", icon: <Space direction="vertical" size={12}>
        <RangePicker
          placeholder={[startDate, endDate]}
          onChange={(dates) => {
            if (dates) {
              const formatDate = (date) => {
                const year = date.$y;
                const month = (date.$M + 1)
                  .toString()
                  .padStart(2, "0");
                const day = date.$D.toString().padStart(2, "0");
                return `${year}-${month}-${day}`;
              };
              setStartDate(formatDate(dates[0]));
              setEndDate(formatDate(dates[1]));
            }
          }}
        />
      </Space>
    },
  ];

  // LineChart datas
  const yLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const [inlineCollapsed, setinlineCollapsed] = useState(false);

  // heatmap


  function heatMap() {
    const data = {
      startDate,
      endDate,
      metrics: [
        "CPC",
        "CR_perc",
        "ROAS"
      ],
    };
    fetch("https://coreapi.hectorai.live/api/day-parting/heatmap-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-USER-IDENTITY":
          "U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.result.series) {
            setXLabelsDays(result.result.series);
          }
          if (result.result.categories?.length) {
            setCategories(result.result.categories);
          }
        }
      )
      .catch((err) => console.log(err));

  }

  return (
    <div className="relative">
      <div className="flex flex-col top-6">
        <Menu
          mode="horizontal"
          items={navItems}
          className="flex flex-row-reverse items-center"
        ></Menu>
      </div>

      <div className="flex flex-row h-[100vh]">
        <Menu
          mode="vertical"
          inlineCollapsed={!inlineCollapsed}
          onMouseOver={() => setinlineCollapsed(true)}
          onMouseLeave={() => setinlineCollapsed(false)}
          defaultSelectedKeys={["Dashboard"]}
          items={items}
        ></Menu>
      </div>

      {/* Card Container with Absolute Positioning */}
      <div className="absolute top-14 w-full flex justify-center mt-4 sm:left-9">
        <div className="bg-white border-4 shadow-lg rounded-lg p-6 w-3/4">
          <div className="text-2xl font-bold mb-4 border-b-2">
            Performence Chart
            <p className="text-sm text-gray-300">
              Key Metrics For Dayparting Schedule Performence Evaluation
            </p>
            <div className="flex justify-end text-sm gap-5">
              <div className="relative inline-block text-left">
                <button
                  id="dropdownCheckboxButton"
                  onClick={toggleDropdown}
                  className="text-black border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  Select Metrics
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    id="dropdownDefaultCheckbox"
                    className="absolute z-10 w-48 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow"
                  >
                    <ul className="p-3 space-y-3 text-sm">
                      {metrics.map((item) => (
                        <li>
                          <div className="flex items-center">
                            <input
                              id="checkbox-item-1"
                              type="checkbox"
                              value="checkbox1"
                              checked={checkboxes[item.code]}
                              name={item.code}
                              className="w-4 h-4"
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="checkbox-item-1"
                              className="ms-2 text-sm font-medium text-black"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <LineChart
              xAxis={[{ scaleType: "point", data: categories }]}
              yAxis={[{ scaleType: "linear", data: yLabels }]}
              series={serios}
              width={900}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Card Container with Absolute Positioning */}
      <div className="absolute top-[35rem] w-full flex justify-center mt-4 sm:left-9">
        <div className="border-4 shadow-lg rounded-lg p-6 w-3/4">
          <p className="text-2xl font-bold mb-4 border-b-2">Heatmap</p>
          <div className="flex justify-center w-fit max-h-96 overflow-y-auto">
            {/* 6s */}
          </div>
        </div>
      </div>

      {/* <datePicker /> */}
    </div>
  );
}

export default Dashbord;
