import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { selectUserDetails } from "../reduxStore/reducers/userDetailSlice";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables.jsx";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToDdMmYyyy, generatePreviews } from "../utils/functions";
import { IGuide } from "../interfaces/interfaces";
import { guideDetailValidator } from "../validator/guideValidator";
import guideService from "../services/guideService";
import authService from "../services/authService";

import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

export default function NormalGuideView() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [guideDetail, setGuideDetail] = useState({ studentDetails: {} });

  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      var guidePromise = guideService.getGuide(id);
      guidePromise.then((res) => {
        var resGuide = res.guide;
        console.log("getGuide : ", resGuide);
        resGuide.userId = resGuide.userId._id;

        setGuideDetail(res.guide);
      });
      setGuideDetail((prevData) => ({ ...prevData, _id: id }));
    }
  }, [id]);

  useEffect(() => {
    setGuideDetail((prevData) => ({
      ...prevData,
      userId: authService.getCurrentUserId(),
    }));
  }, []);

 


  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    
    generatePreviews(guideDetail.reports, setPreviews);
  }, [guideDetail]);

  return (
    <div className="flex flex-col shadow-md sm:rounded-lg">
      <h1 className="text-3xl mx-auto font-bold text-gray-900 dark:text-white">
        Guide
      </h1>
      <hr className="mt-2" />

      <div className="mt-10 m-5 p-5 flex flex-col">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              guideType
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {guideDetail.guideType}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              guidedYear
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {guideDetail.guidedYear}
            </div>
          </div>
          {/* Add more fields here */}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">

          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              dissertationTitle
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {guideDetail.dissertationTitle}
            </div>
          </div>

        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Student Name
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {guideDetail.studentDetails.name}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Student Id Number
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {guideDetail.studentDetails.idNumber}
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
          </div>
          :
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
