import { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
const useTimeAndDateFormat = () => {
  const [isValdTime, setIsValdTime] = useState(false);
  const [isValdTime1, setIsValdTime1] = useState(false);
  const [totalTimes, setTotalTimes] = useState();
  const shortDateFormat = (mydate) => {
    const date = new Date(mydate);
    const formattedDate =
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      date.getFullYear();
    return formattedDate;
  };
  const timeFormatFromDate = (mytime) => {
    const d = new Date(mytime);
    const datetext = d.toTimeString();
    const datetime = datetext.split(" ")[0];
    return datetime;
  };
  const totalTime = (startTime, stopTime) => {
    const dstopTime = new Date(stopTime);
    const dstartTime = new Date(startTime);
    const diff = (dstopTime.getTime() - dstartTime.getTime()) / 1000;

    if (!diff) {
      return "Not finished";
    } else {
      const secNum = parseInt(diff, 10);
      const hours = Math.floor(secNum / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((secNum - hours * 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds =
        secNum - hours * 3600 - (minutes * 60).toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
  };
  const convertToTime = (time) => {
    const diff = time;
    const secNum = parseInt(diff, 10);
    const hours = Math.floor(secNum / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((secNum - hours * 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds =
      secNum - hours * 3600 - (minutes * 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const CheckArrival = (time) => {
    let patt = new RegExp(
      "^(?:(?:00:[0-5][0-9]:[0-5][0-9] (?:am|AM)|(?:0[1-9]|1[01]):[0-5][0-9]:[0-5][0-9] (?:[ap]m|[AP]M)|12:[0-5][0-9]:[0-5][0-9] (?:pm|PM))|(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$"
    );
    let res = patt.test(time);
    setIsValdTime(res);
    return time;
  };
  const CheckArrival1 = (time) => {
    let patt = new RegExp(
      "^(?:(?:00:[0-5][0-9]:[0-5][0-9] (?:am|AM)|(?:0[1-9]|1[01]):[0-5][0-9]:[0-5][0-9] (?:[ap]m|[AP]M)|12:[0-5][0-9]:[0-5][0-9] (?:pm|PM))|(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$"
    );
    let res = patt.test(time);
    setIsValdTime1(res);
    return time;
  };
  const handleSaveToExcel = () => {
    const table = document.getElementById("tableSheet");
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.sheet_add_aoa(ws, [["Total time:"]], { origin: "J1" });
    XLSX.utils.sheet_add_aoa(ws, [[totalTimes]], { origin: "J2" });
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "MyReport.xlsx");
  };

  return {
    shortDateFormat,
    timeFormatFromDate,
    totalTime,
    convertToTime,
    CheckArrival,
    CheckArrival1,
    isValdTime1,
    isValdTime,
    handleSaveToExcel,
    setTotalTimes,
    totalTimes,
  };
};

export default useTimeAndDateFormat;
