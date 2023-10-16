import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import publicationService from "../services/publicationService";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables";
import { useAppSelector } from "../reduxStore/hooks";
import eventService from "../services/eventService";
import authService from "../services/authService";
import { publicationValidator } from "../validator/publicationValidator";
import { formatDateToDdMmYyyy } from "../utils/functions";

const AddPublication = () => {
  const SystemVariables = useAppSelector(selectSystemVariables);
  // const { setFieldValue } = useFormikContext();
  const [rowData, setRowData] = useState({
    experts: "",
    report: { title: "", url: "" },
  });
  const [reports, setReports] = useState([]);
  const [reportFormData, setReportFormData] = useState(null);

  const [publicationType, setPublicationType] = useState(
    SystemVariables.PUBLICATION_TYPE.JOURNALS
  );

  const [publicationInit, setPublicationInit] = useState({});

  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) {
      setPublicationType("");
      var eventPromise = publicationService.getPublication(id);
      eventPromise.then((res) => {
        var publicationData = res.publication;
        console.log("useEffect publicationData : ", publicationData);
        // const temp = resEvent.userId._id;
        publicationData.userId = publicationData.userId._id;
        publicationData.publicationDate = formatDateToDdMmYyyy(
          publicationData.publicationDate.toString()
        );
        setPublicationType(publicationData.publicationType);
        setReports(publicationData.reports)
        setPublicationInit(publicationData);
        // setFieldValue("title",res.event.title);
        // setEventDetail(res.event);
      });
    }
  }, [id]);

  function HandleAddPublication(values) {
    values.publicationType = publicationType;
    values.reports = reports;
    values.userId = authService.getCurrentUserId();
    const { _id, __v, ...data } = values;
    console.log("Values: ", values);

    const { error } = publicationValidator.validate(data);
    if (error) {
      toast.error(error.toString());
      return;
    }
    if (_id) {
      const publicationPromise = publicationService.updatePublication(
        _id,
        data
      );
      toast.promise(
        publicationPromise,
        {
          loading: "please wait while adding publication data",
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
      publicationPromise
        .then((res) => {
          console.log("res: ", res);
          //   toast.success("publication is added");
        })
        .catch((error) => {
          //   toast.error("publication is not added");
        });
    } else {
      const publicationPromise = publicationService.addPublication(data);
      toast.promise(
        publicationPromise,
        {
          loading: "please wait while adding publication data",
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
      publicationPromise
        .then((res) => {
          console.log("res: ", res);
          //   toast.success("publication is added");
        })
        .catch((error) => {
          //   toast.error("publication is not added");
        });
    }
  }

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
          setReports((prevData) => [
            ...prevData,
            { title: report.title, url: res.uploadedFiles[0] },
          ]);
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
    const updatedReports = [...reports];
    updatedReports.splice(index, 1);
    setReports(updatedReports);
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

  return (
    <>
      <div className="flex flex-col shadow-md sm:rounded-lg">
        <h1 className="text-3xl  mx-auto  text-gray-900 font-bold dark:text-white">
          Add Your Publication
        </h1>
        <hr className="mt-2" />
        <Formik
          initialValues={publicationInit}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            HandleAddPublication(values);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <Form>
                <div className="mt-4 mb-6 flex items-center justify-center">
                  <Field
                    as="select"
                    name="publicationType"
                    className="bg-gray-50 h-8 py-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:font-bold dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setPublicationType(e.target.value);
                    }}
                  >
                    <option value={SystemVariables.PUBLICATION_TYPE.JOURNALS}>
                      {SystemVariables.PUBLICATION_TYPE.JOURNALS}
                    </option>
                    <option value={SystemVariables.PUBLICATION_TYPE.CONFERENCE}>
                      {SystemVariables.PUBLICATION_TYPE.CONFERENCE}
                    </option>
                  </Field>
                </div>
                <div className="mt-10 m-10 flex flex-col">
                  {/* Event Details */}
                  <div className="flex flex-col">
                    <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          name="title"
                          id="title"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="title"
                          className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Title
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          type="date"
                          name="publicationDate"
                          id="publicationDate"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=""
                          required
                        />
                        <label
                          htmlFor="publicationDate"
                          className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Publication Date
                        </label>
                      </div>
                    </div>
                    <div className="mt-2 grid md:grid-cols-1 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          as="textarea"
                          name="description"
                          id="description"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="description"
                          className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Description
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-center ">
                      <div className="relative z-0 w-96 mb-6 group">
                        <FieldArray
                          name="authors"
                          render={(arrayHelpers) => (
                            <div className="flex flex-col justify-center">
                              {values.authors && values.authors.length > 0 ? (
                                values.authors.map((friend, index) => (
                                  <div key={index}>
                                    <Field
                                      name={`authors.${index}`}
                                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none transition-colors duration-300"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 inline-block align-text-top"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M20 12H4"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index, "")
                                      }
                                      className="px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none transition-colors duration-300"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 inline-block align-text-top"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.push("")}
                                  className="my-6 px-2 py-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:bg-gray-700 dark:hover:text-blue-200 focus:outline-none"
                                >
                                  Add an author
                                </button>
                              )}
                            </div>
                          )}
                        />
                        {values.authors && values.authors.length > 0 ? (
                          <label
                            htmlFor="author"
                            className="peer-focus:font-lg absolute text-2xl  text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Author
                          </label>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>

                  {publicationType ===
                  SystemVariables.PUBLICATION_TYPE.JOURNALS ? (
                    <>
                      <div className="flex flex-col">
                        <div className="mt-2 grid md:grid-cols-3 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="text"
                              name="publisher"
                              id="publisher"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              required
                            />
                            <label
                              htmlFor="publisher"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Publisher
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="text"
                              name="volumeNo"
                              id="volumeNo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              required
                            />
                            <label
                              htmlFor="volumeNo"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Volume No.
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="text"
                              name="issueNo"
                              id="issueNo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              required
                            />
                            <label
                              htmlFor="issueNo"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Issue No.
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="number"
                              name="pageNoRange.startPageNo"
                              id="pageNoRange.startPageNo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              required
                            />
                            <label
                              htmlFor="pageNoRange.startPageNo"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Start Page No.
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="number"
                              name="pageNoRange.endPageNo"
                              id="pageNoRange.endPageNo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              required
                            />
                            <label
                              htmlFor="pageNoRange.endPageNo"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              End Page No.
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-1 mx-auto text-xl font-medium text-gray-900 dark:text-white">
                        Details
                      </h3>
                      <hr className="w-20 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
                      <div className="flex mt-3 flex-col">
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="text"
                              name="address.city"
                              id="address.city"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                            <Field
                              type="text"
                              name="address.state"
                              id="address.state"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="address.state"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              State
                            </label>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="text"
                              name="address.country"
                              id="address.country"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="address.country"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Country
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Field
                              type="text"
                              name="address.zip"
                              id="address.zip"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="address.zip"
                              className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Zip Code
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* reports */}
                  <div className="flex flex-col">
                    <h3 className="mt-4 mx-auto  text-xl font-bold text-gray-900 dark:text-white">
                      Upload Publication
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
                          type="button"
                          onClick={handleAddReport}
                          className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                        >
                          Add
                        </button>
                      </div>
                      <div className="w-full flex flex-col ">
                        {reports.map((report, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-900 dark:text-white"
                          >
                            {/* {index + 1}) title : {report.title} fileName :{" "} */}
                            {index + 1}) title :{" "}
                            <a
                              className=" border-blue-500 hover:border-b-2  "
                              target="_blank"
                              href={report.url}
                            >
                            
                              {report.title}
                            </a>
                       
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

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddPublication;
