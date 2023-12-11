import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { selectUserDetails } from "../reduxStore/reducers/userDetailSlice";
import { selectSystemVariables } from "../reduxStore/reducers/systemVariables.jsx";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToDdMmYyyy, generatePreviews } from "../utils/functions";
import { publicationDetailValidator } from "../validator/publicationValidator";
import publicationService from "../services/publicationService";
import authService from "../services/authService";

import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

export default function NormalPublicationView() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [publicationDetail, setPublicationDetail] = useState({ authors: [], address: {} });

  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      var publicationPromise = publicationService.getPublication(id);
      publicationPromise.then((res) => {
        var resPublication = res.publication;
        console.log("getPublication : ", resPublication, SystemVariables.PUBLICATION_TYPE.JOURNALS);
        if (resPublication.userId) {
          resPublication.userId = resPublication.userId._id;          
        } else {
          resPublication.userId = null;
        }


        setPublicationDetail(res.publication);
      });
      setPublicationDetail((prevData) => ({ ...prevData, _id: id }));
    }
  }, [id]);

  useEffect(() => {
    setPublicationDetail((prevData) => ({
      ...prevData,
      userId: authService.getCurrentUserId(),
    }));
  }, []);

  const [previews, setPreviews] = useState([]);
  useEffect(() => {

    generatePreviews(publicationDetail.reports, setPreviews);
  }, [publicationDetail]);
  return (
    <div className="flex flex-col shadow-md sm:rounded-lg">
      <h1 className="text-3xl mx-auto font-bold text-gray-900 dark:text-white">
        Publication
      </h1>
      <hr className="mt-2" />

      <div className="mt-10 m-5 p-5 flex flex-col">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              Publication Title
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {publicationDetail.title}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              description
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {publicationDetail.description}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              publicationDate
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {publicationDetail.publicationDate}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              publicationType
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {publicationDetail.publicationType}
            </div>
          </div>
        </div>





        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6">
            <label className="text-gray-700 dark:text-white font-bold">
              authors
            </label>
            <div className="mt-2 ml-2 text-gray-900 dark:text-white">
              {publicationDetail.authors.map((expert, index) => (
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

        {publicationDetail.publicationType === SystemVariables.PUBLICATION_TYPE.JOURNALS ?
          <div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label className="text-gray-700 dark:text-white font-bold">
                  publisher
                </label>
                <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                  {publicationDetail.publisher}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-gray-700 dark:text-white font-bold">
                  volumeNo
                </label>
                <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                  {publicationDetail.volumeNo}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-gray-700 dark:text-white font-bold">
                  issueNo
                </label>
                <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                  {publicationDetail.issueNo}
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label className="text-gray-700 dark:text-white font-bold">
                  startPageNo
                </label>
                <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                  {publicationDetail.pageNoRange.startPageNo}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-gray-700 dark:text-white font-bold">
                  endPageNo
                </label>
                <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                  {publicationDetail.pageNoRange.endPageNo}
                </div>
              </div>

            </div>
          </div>
          :
          publicationDetail.publicationType === SystemVariables.PUBLICATION_TYPE.CONFERENCE ?
            <div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <label className="text-gray-700 dark:text-white font-bold">
                    city
                  </label>
                  <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                    {publicationDetail.address.city}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-700 dark:text-white font-bold">
                    state
                  </label>
                  <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                    {publicationDetail.address.state}
                  </div>
                </div>

              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <label className="text-gray-700 dark:text-white font-bold">
                    country
                  </label>
                  <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                    {publicationDetail.address.country}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-700 dark:text-white font-bold">
                    zip
                  </label>
                  <div className="mt-2 ml-2 text-gray-900 dark:text-white">
                    {publicationDetail.address.zip}
                  </div>
                </div>
              </div>
            </div> : <></>
        }

        {previews.length > 0 ?
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
