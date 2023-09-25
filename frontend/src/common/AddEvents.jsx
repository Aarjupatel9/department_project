import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectUserDetails } from "../reduxStore/reducers/userDetailSlice";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables.jsx";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToDdMmYyyy } from "../utils/functions";
import { IEventTemplate } from "../reduxStore/reducers/eventsSlice";
import { IEvent } from "../interfaces/interfaces";
import { eventDetailValidator } from "../validator/eventValidator";
import eventService from "../services/eventService";
import authService from "../services/authService";

export default function AddEvents() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState(IEventTemplate);
  const [rowData, setRowData] = useState({
    contributors: "",
    experts: "",
    report: { title: "", url: "" },
  });
  const [reportFormData, setReportFormData] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) {
      var eventPromise = eventService.getEvent(id);
      eventPromise.then((res) => {
        var resEvent = res.event;
        console.log("getEvent : ", resEvent);
        // const temp = resEvent.userId._id;
        resEvent.userId = resEvent.userId._id;

        setEventDetail(res.event);
      });
      setEventDetail((prevData) => ({ ...prevData, _id: id }));
    }
  }, [id]);
  const handelEventAdd = () => {
    console.log("Form Data:", eventDetail);
    const { _id, ...restEventDetails } = eventDetail;
    const { error } = eventDetailValidator.validate(restEventDetails);
    if (error) {
      toast.error(error.toString());
      return;
    }
    console.log("error : ", error);
    var eventPromise;
    if (id) {
      console.log("update event");
      eventPromise = eventService.updateEvent(eventDetail);
    } else {
      console.log("add event");
      eventPromise = eventService.addEvent(eventDetail);
    }
    eventPromise
      .then((res) => {
        if (!id) {
          setEventDetail(IEventTemplate);
        }
      })
      .catch((error) => {});
    toast.promise(
      eventPromise,
      {
        loading: "please wait while we updating event data",
        success: (data) => data.message,
        error: (err) => err,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
  };
  const handleRowDataInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("report.")) {
      const [parent, child] = name.split(".");
      if (child == "url") {
        const file = event.target.files[0];

        if (!file) {
          toast.error("Please select an image to upload.");
          return;
        }
        const formData = new FormData();
        formData.append("reports", file);
        setReportFormData(formData);
      }
      setRowData((prevData) => ({
        ...prevData,
        report: {
          ...prevData.report,
          [child]: value,
        },
      }));
    } else {
      setRowData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("enter in handle input change");
    // If the input is nested within personalDetails or bankDetails, update accordingly
    if (name.startsWith("address.")) {
      const [parent, child] = name.split(".");
      setEventDetail((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [child]: value,
        },
      }));
    } else if (name.startsWith("eventDate.")) {
      const [parent, child] = name.split(".");
      setEventDetail((prevData) => ({
        ...prevData,
        eventDate: {
          ...prevData.eventDate,
          [child]: value,
        },
      }));
    } else {
      console.log("handleInputChange else change : ", name);
      setEventDetail((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

 
  const handleAddExpert = () => {
    const newExpert = rowData.experts;
    if (newExpert.trim() !== "") {
      setEventDetail((prevData) => ({
        ...prevData,
        experts: [...prevData.experts, newExpert],
      }));
      setRowData((prevData) => ({
        ...prevData,
        experts: "",
      }));
    }
  };
  const handleRemoveExpert = (index) => {
    const updatedExperts = [...eventDetail.experts];
    updatedExperts.splice(index, 1);
    setEventDetail((prevData) => ({
      ...prevData,
      experts: updatedExperts,
    }));
  };
  const handleAddContributors = () => {
    const newContributors = rowData.contributors;
    if (newContributors.trim() !== "") {
      setEventDetail((prevData) => ({
        ...prevData,
        contributors: [...prevData.contributors, newContributors],
      }));
      setRowData((prevData) => ({
        ...prevData,
        contributors: "",
      }));
    }
  };
  const handleAddReport = () => {
    const report = rowData.report;
    if (report.title.trim() !== "") {
      if (!reportFormData) {
        toast.error("please select report file ");
        return;
      }

      console.log("reportFormData : ", reportFormData);
      const reportPromise = eventService.uploadReportOfEvent(reportFormData);
      reportPromise
        .then((res) => {
          console.log("report upload response : ", res.uploadedFiles);
          setEventDetail((prevData) => ({
            ...prevData,
            reports: [
              ...prevData.reports,
              { title: report.title, url: res.uploadedFiles[0] },
            ],
          }));
          setRowData((prevData) => ({
            ...prevData,
            report: { title: "", url: "" },
          }));
          setReportFormData(null);
        })
        .catch((error) => {
          // setReportFormData(null);
        });
    }
  };
  const handleRemoveReport = (index) => {
    const updatedReports = [...eventDetail.reports];
    updatedReports.splice(index, 1);
    setEventDetail((prevData) => ({
      ...prevData,
      reports: updatedReports,
    }));
  };
  const handleRemoveContributors = (index) => {
    const updatedContributors = [...eventDetail.contributors];
    updatedContributors.splice(index, 1);
    setEventDetail((prevData) => ({
      ...prevData,
      contributors: updatedContributors,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventDetail({
      ...eventDetail,
      [name]: checked,
    });
  };

  useEffect(() => {
    setEventDetail((prevData) => ({
      ...prevData,
      userId: authService.getCurrentUserId(),
    }));
  }, []);

  useEffect(() => {
    console.log("eventDetails : ", eventDetail);
  }, [eventDetail]);

  return (
    <div className=" flex flex-col shadow-md sm:rounded-lg">
      <h1 className="text-3xl mx-auto  font-medium text-gray-900 dark:text-white">
        Event Entry{" "}
      </h1>
      <hr className="mt-2" />
      <div className="m-1 p-5 flex flex-col">
        {/* personalDetails */}
        <div className="flex flex-col">
          <h3 className="mt-4 mx-auto text-xl font-medium text-gray-900 dark:text-white">
            Event Details
          </h3>
          <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
          <div className="mt-3 grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={eventDetail.title}
                type="text"
                name="title"
                id="title"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Event Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={eventDetail.organizedUnder}
                type="text"
                name="organizedUnder"
                id="organizedUnder"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
              <label
                htmlFor="organizedUnder"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Organized Under
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={eventDetail.eventType}
                type="text"
                name="eventType"
                id="eventType"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
              <label
                htmlFor="eventType"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Event Type
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={String(eventDetail.totalExpenses)}
                type="text"
                name="totalExpenses"
                id="totalExpenses"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="totalExpenses"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Total Expense (INR)
              </label>
            </div>

          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
          
          <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={String(eventDetail.numberOfParticipants)}
                type="text"
                name="numberOfParticipants"
                id="numberOfParticipants"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="numberOfParticipants"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Event Attendess
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="checkbox"
                name="isOrganizedByBVM"
                id="isOrganizedByBVM"
                checked={eventDetail.isOrganizedByBVM}
                onChange={handleCheckboxChange}
                className="mr-2 text-blue-700 dark:text-blue-500 focus:outline-none"
              />
              <label
                htmlFor="isOrganizedByBVM"
                className="text-sm text-gray-900 dark:text-white cursor-pointer"
              >
                Organized by BVM
              </label>
            </div>
            
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                onChange={handleInputChange}
                value={String(eventDetail.description)}
                name="description"
                id="description"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              ></textarea>
              <label
                htmlFor="description"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>        
          </div>
          

        </div>

        {/* address */}
        <div className="flex flex-col">
          <h3 className="mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white">
            address
          </h3>
          <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={String(eventDetail.address.city)}
                type="text"
                name="address.city"
                id="address.city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="address.city"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={String(eventDetail.address.state)}
                type="text"
                name="address.state"
                id="address.state"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="address.state"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                State{" "}
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={String(eventDetail.address.country)}
                type="text"
                name="address.country"
                id="address.country"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="address.country"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                country
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleInputChange}
                value={String(eventDetail.address.zip)}
                type="tel"
                name="address.zip"
                id="address.zip"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="address.zip"
                className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                zip Code{" "}
              </label>
            </div>
          </div>
        </div>

        {/* contributors */}
        <div className="flex flex-col">
          <h3 className="mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white">
            Contributors
          </h3>
          <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
          <div className="my-6 mx-10">
            <div className="relative z-0 w-full mb-4 group">
              <input
                onChange={handleRowDataInputChange}
                value={rowData.contributors}
                type="text"
                name="contributors"
                id="contributors"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter a Contributor"
              />
              {/* <label htmlFor="contributors" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contributors </label> */}
              <button
                onClick={handleAddContributors}
                name="contributors"
                className="absolute right-2 top-2 px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900  dark:hover:text-blue-700 focus:outline-none"
              >
                Add
              </button>
            </div>
            <div className="w-full flex flex-col ">
              {eventDetail.contributors.map((expert, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-900 dark:text-white"
                >
                  {index + 1}) {expert}
                  <button
                    onClick={() => handleRemoveContributors(index)}
                    className="ml-5 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* experts */}
        <div className="flex flex-col">
          <h3 className="mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white">
            Experts
          </h3>
          <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
          <div className="my-6 mx-10">
            <div className="relative w-full mb-4 group">
              <input
                onChange={handleRowDataInputChange}
                value={rowData.experts}
                type="text"
                name="experts"
                id="experts"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter an expert"
              />
              <button
                onClick={handleAddExpert}
                className="absolute right-2 top-2 px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
              >
                Add
              </button>
            </div>
            <div className="w-full flex flex-col ">
              {eventDetail.experts.map((expert, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-900 dark:text-white"
                >
                  {index + 1}) {expert}
                  <button
                    onClick={() => handleRemoveExpert(index)}
                    className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* reports */}
        <div className="flex flex-col">
          <h3 className="mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white">
            Reports
          </h3>
          <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
          <div className="my-6 mx-10 mb-4 px-10 w-full">
            <div className="flex flex-row  items-center justify-between  ">
              <div className="flex flex-col w-full px-10 ">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={handleRowDataInputChange}
                    value={rowData.report.title}
                    type="text"
                    name="report.title"
                    id="report.title"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Enter Report's Title"
                  />
                </div>
                <div className=" z-0 w-full mb-6 group">
                  <input
                    onChange={handleRowDataInputChange}
                    value={rowData.report.url}
                    type="file"
                    name="report.url"
                    id="report.url"
                    className="block  p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Upload report"
                  />
                </div>
              </div>

              <button
                onClick={handleAddReport}
                className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
              >
                {" "}
                Add{" "}
              </button>
            </div>
            <div className="w-full flex flex-col ">
              {eventDetail.reports.map((report, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-900 dark:text-white"
                >
                  {index + 1}) title : {report.title} fileName : {report.url}
                  <button
                    onClick={() => handleRemoveReport(index)}
                    className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={handleInputChange}
              value={formatDateToDdMmYyyy(
                String(eventDetail.eventDate.startDate)
              )}
              type="date"
              name="eventDate.startDate"
              id="eventDate.startDate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="eventDate.startDate"
              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              startDate
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={handleInputChange}
              value={formatDateToDdMmYyyy(
                String(eventDetail.eventDate.endDate)
              )}
              type="date"
              name="eventDate.endDate"
              id="eventDate.endDate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="eventDate.endDate"
              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              endDate
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handelEventAdd}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}
