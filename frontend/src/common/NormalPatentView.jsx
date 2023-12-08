import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { selectUserDetails } from "../reduxStore/reducers/userDetailSlice";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables.jsx";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToDdMmYyyy, generatePreviews } from "../utils/functions";
import { patentDetailValidator } from "../validator/patentValidator";
import patentService from "../services/patentService";
import authService from "../services/authService";

import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

export default function NormalPatentView() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [patentDetail, setPatentDetail] = useState({ inventors :[], });

  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      var patentPromise = patentService.getPatent(id);
      patentPromise.then((res) => {
        var resPatent = res.patent;
        console.log("getPatent : ", resPatent);
        resPatent.userId = resPatent.userId._id;

        setPatentDetail(res.patent);
      });
      setPatentDetail((prevData) => ({ ...prevData, _id: id }));
    }
  }, [id]);

  useEffect(() => {
    setPatentDetail((prevData) => ({
      ...prevData,
      userId: authService.getCurrentUserId(),
    }));
  }, []);

  const [previews, setPreviews] = useState([]);
  useEffect(() => {

    generatePreviews(patentDetail.reports, setPreviews);
  }, [patentDetail]);
  return (
    <div className="flex flex-col shadow-md sm:rounded-lg">
      <h1 className="text-3xl mx-auto font-bold text-gray-900 dark:text-white">
        Patent
      </h1>
      <hr className="mt-2" />

      <div className="mt-10 m-5 p-5 flex flex-col">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Patent Title
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.title}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              summary
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.summary}
            </div>
          </div>
        
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              patentNumber
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.patentNumber}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              applicationNumber
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.applicationNumber}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              patentDate
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {formatDateToDdMmYyyy(patentDetail.patentDate)}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              filingDate
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.filingDate}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              grantDate
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.grantDate}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              description
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.description}
            </div>
          </div>
        </div>

       

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              inventors
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {patentDetail.inventors.map((expert, index) => (
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

      {previews.length>0?
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
                    {preview.title} ( {preview.doc_type} )
                  </button>
                  <div className="cursor-pointer ">{preview.element}</div>
                </div>
              ))}
            </div>
          </div>
        </div>:
        
        <div className="flex flex-col justify-center items-center">
          <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            There is no reports
          </h3>
        </div>
        }
      </div>
    </div>
  );
}
