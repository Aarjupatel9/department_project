import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import achievementService from "../services/achievementService";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables";
import { useAppSelector } from "../reduxStore/hooks";
import eventService from "../services/eventService";
import authService from "../services/authService";
import { achievementValidator } from "../validator/achievementValidator";
import { formatDateToDdMmYyyy } from "../utils/functions";

const AddAchievement = () => {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const navigate = useNavigate();
  const [rowData, setRowData] = useState({
    experts: "",
    report: { title: "", url: "" },
  });
  const [reports, setReports] = useState([]);
  const [reportFormData, setReportFormData] = useState(null);

  const [achievementInit, setAchievementInit] = useState({});

  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) {
      var eventPromise = achievementService.getAchievement(id);
      eventPromise.then((res) => {
        var achievementData = res.achievement;
        console.log("useEffect achievementData : ", achievementData);
        // const temp = resEvent.userId._id;
        achievementData.userId = achievementData.userId._id;
        achievementData.achievedOn = formatDateToDdMmYyyy(
          achievementData.achievedOn.toString()
        );
        console.log("achievement data after odify : ", achievementData);
        setReports(achievementData.certificates);

        setAchievementInit(achievementData);
      });
      toast.promise(
        eventPromise,
        {
          loading: "fetching data",
          success: (data) =>
            data.message ? data.message : "fecthed",
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 1,
            icon: "🔥",
          },
          error: {
            duration: 2000,
            icon: "🔥",
          },
        }
      );
    }
  }, [id]);

  function HandleAddAchievement(values) {
    values.certificates = reports;
    values.userId = authService.getCurrentUserId();
    const { _id, __v, userId, ...data } = values;
    console.log("Values: ", values);

    const { error } = achievementValidator.validate(data);
    if (error) {
      toast.error(error.toString());
      return;
    }
    if (_id) {
      const achievementPromise = achievementService.updateAchievement(
        _id,
        data
      );
      toast.promise(
        achievementPromise,
        {
          loading: "please wait while adding achievement data",
          success: (data) =>
            data.message ? data.message : "achievemnet is updated",
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 3000,
            icon: "🔥",
          },
        }
      );
      achievementPromise
        .then((res) => {
          console.log("res: ", res);
          navigate("/achievement");
        })
        .catch((error) => {});
    } else {
      const achievementPromise = achievementService.addAchievement(data);
      toast.promise(
        achievementPromise,
        {
          loading: "please wait while adding achievement data",
          success: (data) =>
            data.message ? data.message : "achievemnet is added",
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 3000,
            icon: "🔥",
          },
        }
      );
      achievementPromise
        .then((res) => {
          console.log("res: ", res);
          navigate("/achievement");
        })
        .catch((error) => {});
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
          Achievement
        </h1>
        <hr className="mt-2" />
        <Formik
          initialValues={achievementInit}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            HandleAddAchievement(values);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <Form>
                <div className="p-10 m-10 flex flex-col">
                  {/* Event Details */}
                  <div className="flex flex-col">
                    <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          type="text"
                          name="achievementType"
                          id="achievementType"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="achievementType"
                          className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Achievement Type
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          type="date"
                          name="achievedOn"
                          id="achievedOn"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=""
                          required
                        />
                        <label
                          htmlFor="achievedOn"
                          className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Aachievement Date
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
                  </div>

                  {/* certificates */}
                  <div className="flex flex-col">
                    <h3 className="mt-4 mx-auto  text-xl font-bold text-gray-900 dark:text-white">
                      Upload Achievement
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
                              placeholder="Enter Acievement file's Title"
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
                            className="text-medium text-gray-900 dark:text-white"
                          >
                            {index + 1}) title :{" "}
                            <a
                              className=" border-blue-500 hover:border-b-2  "
                              target="_blank"
                              href={report.url}
                            >
                              {" "}
                              {report.title}
                            </a>
                            <button
                              onClick={() => handleRemoveReport(index)}
                              className="ml-10 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
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

export default AddAchievement;
