import React, { useEffect, useState, useRef, useMemo } from "react";
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

import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

export default function NormalEventView() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState(IEventTemplate);

  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      var eventPromise = eventService.getEvent(id);
      eventPromise.then((res) => {
        var resEvent = res.event;
        console.log("getEvent : ", resEvent);
        resEvent.userId = resEvent.userId._id;

        setEventDetail(res.event);
      });
      setEventDetail((prevData) => ({ ...prevData, _id: id }));
    }
  }, [id]);

  useEffect(() => {
    setEventDetail((prevData) => ({
      ...prevData,
      userId: authService.getCurrentUserId(),
    }));
  }, []);

  const handelEventDelete = () => {
    if (id == undefined) {
      toast.error("can not delete at this time");
      return;
    }
    const _id = id;
    const eventPromise = eventService.deleteEvent(_id);
    eventPromise
      .then((res) => {
        console.log("users : ", res);
        // const tmp = events.filter((event) => {
        //   if (event._id != _id) {
        //     return event;
        //   }
        // });
        // setFilteredEvents(tmp);
        navigate("/event");
      })
      .catch((error) => {
        console.log("error : ", error);
      });

    toast.promise(
      eventPromise,
      {
        loading: "please wait while we deleting event",
        success: (data) => data.message,
        error: (err) => err,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 3000,
          icon: "🔥",
        },
        error: {
          duration: 4000,
          icon: "🔥",
        },
      }
    );
  };

  // const [previews, setPreviews] = useState([]);

  // useEffect(() => {
  //   console.log("eventDetails : ", eventDetail);
  //   handleFilePreview();
  // }, [eventDetail]);
  // const handleFilePreview = () => {
  //   const fileUrls = eventDetail.reports.map((r) => {
  //     return r.url;
  //   });

  //   Promise.all(
  //     fileUrls.map(async (url) => {
  //       return new Promise((resolve) => {
  //         if (url.toLowerCase().endsWith(".pdf")) {
  //           pdfjs.getDocument(url).promise.then((pdf) => {
  //             pdf.getPage(1).then((page) => {
  //               const viewport = page.getViewport({ scale: 0.5 });
  //               const canvas = document.createElement("canvas");
  //               const context = canvas.getContext("2d");
  //               canvas.width = viewport.width;
  //               canvas.height = viewport.height;

  //               const renderContext = {
  //                 canvasContext: context,
  //                 viewport: viewport,
  //               };

  //               page.render(renderContext).promise.then(() => {
  //                 resolve(<div key={url}>{canvas}</div>);
  //               });
  //             });
  //           });
  //         } else if (url.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/)) {
  //           resolve(<img key={url} src={url} alt={url} />);
  //         } else {
  //           // Handle other file types or unsupported URLs as needed
  //           resolve(null);
  //         }
  //       });
  //     })
  //   ).then((previews) => {
  //     console.log("previes : ", previews);
  //     setPreviews(previews.filter((preview) => preview !== null));
  //   });
  // };

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const generatePreviews = async () => {
      const previewElements = await Promise.all(
        eventDetail.reports.map(async (report, index) => {
          if (report.url.toLowerCase().endsWith(".pdf")) {
            const pdf = await pdfjs.getDocument(report.url).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 0.3 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            await page.render(renderContext).promise;
            const dataUrl = canvas.toDataURL(); // Convert canvas to data URL
            return {
              div: (
                <img
                  className="w-48 h-48"
                  key={index}
                  src={dataUrl}
                  alt={`PDF Preview ${index + 1}`}
                  onClick={() => window.open(report.url, "_blank")}
                />
              ),
              type: "pdf",
              title: report.title,
            };
          } else if (report.url.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/)) {
            return {
              div: (
                <img
                  className="w-48 h-48"
                  key={index}
                  src={report.url}
                  alt={report.url}
                  onClick={() => window.open(report.url, "_blank")}
                />
              ),
              type: "image",
              title: report.title,
            };
          } else {
            // Handle other file types or unsupported URLs as needed
            return null;
          }
        })
      );

      setPreviews(previewElements.filter((preview) => preview !== null));
    };

    generatePreviews();
  }, [eventDetail.reports]);

  return (
    <div className="flex flex-col shadow-md sm:rounded-lg">
      <h1 className="text-3xl mx-auto font-bold text-gray-900 dark:text-white">
        Event
      </h1>
      <hr className="mt-2" />

      <div className="mt-10 m-5 p-5 flex flex-col">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Event Name
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.title}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Organized Under
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.organizedUnder}
            </div>
          </div>
          {/* Add more fields here */}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Event eventType
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.eventType}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Total Expense (INR)
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.totalExpenses}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Event Attendess
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.numberOfParticipants}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Organized by BVM
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.isOrganizedByBVM ? "YES" : "NO"}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              description
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.description}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              startDate
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {formatDateToDdMmYyyy(eventDetail.eventDate.startDate)}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              endDate
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {formatDateToDdMmYyyy(eventDetail.eventDate.endDate)}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              contributors
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.contributors.map((expert, index) => (
                <div
                  key={index}
                  className="text-medium text-gray-900 dark:text-white"
                >
                  {index + 1}) {expert}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              experts
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.experts.map((expert, index) => (
                <div
                  key={index}
                  className="text-medium text-gray-900 dark:text-white"
                >
                  {index + 1}) {expert}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Address
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {eventDetail.address.city}, {eventDetail.address.state},{" "}
              {eventDetail.address.country}, {eventDetail.address.zip}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            Reports
          </h3>
          <div className="my-6">
            <div className="w-full flex flex-row  space-x-5 ">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 border-2 border-gray-200 dark:border-white-200 text-sm text-gray-900 dark:text-white"
                >
                  <button className="bg-red-100   border-2 border-gray-200 dark:border-white-200 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none">
                    {preview.title} ( {preview.type} )
                  </button>
                  <div className="cursor-pointer ">{preview.div}</div>
                  <button className="bg-red-100   border-2 border-gray-200 dark:border-white-200 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
