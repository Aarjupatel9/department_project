import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { publicationValidator } from '../validator/publicationValidator';
import { selectSystemVariables } from '../reduxStore/reducers/systemVariables';
import { useAppDispatch, useAppSelector } from '../reduxStore/hooks';
import { useNavigate } from 'react-router-dom';

const AddPaper = () => {


    const SystemVariables = useAppSelector(selectSystemVariables);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [authorCount, setAuthorCount] = useState(0);
    const [paperValue, setPaperValue] = useState(SystemVariables.PUBLICATION_TYPE.JOURNALS);
    const handleSelectChange = (e) => {
        console.log("Value: ", e.target.value);
        setPaperValue(e.target.value);
    }

    function handlePaperAdd(values) {
        values.publicationType = paperValue;
        const { error } = publicationValidator.validate(values);
        console.log(error);
        if (error) {
            toast.error(error.toSting());
            return;
        }
        toast.success("paper addded ");
    }

    return (
        <>
            <div className="flex flex-col shadow-md sm:rounded-lg">
                <h1 className="text-3xl mx-auto font-medium text-gray-900 dark:text-white">Add Paper</h1>
                <hr className="mt-2" />
                <Formik
                    initialValues={{}}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("Values: ", values);
                        handlePaperAdd(values);
                    }}
                >
                    {({ values }) => (
                        <>
                            <Form>
                                <div className="mt-4 mb-6 flex items-center justify-center">
                                    <Field
                                        as="select"
                                        name="paperType"
                                        className="bg-gray-50 h-8 py-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleSelectChange}
                                    >
                                        <option value={SystemVariables.PUBLICATION_TYPE.JOURNALS} >{SystemVariables.PUBLICATION_TYPE.JOURNALS}</option>
                                        <option value={SystemVariables.PUBLICATION_TYPE.CONFERENCE}>{SystemVariables.PUBLICATION_TYPE.CONFERENCE} </option>
                                    </Field>
                                </div>
                                <div className="m-1 p-1 flex flex-col">
                                    {/* Event Details */}
                                    <div className="flex flex-col">
                                        <h3 className="mt-1 mx-auto text-xl font-medium text-gray-900 dark:text-white">Details</h3>
                                        <hr className="w-20 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
                                        <div className="mt-2 grid md:grid-cols-1 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <Field
                                                    name="title"
                                                    id="title"
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                    placeholder=" "
                                                    required
                                                />
                                                <label
                                                    htmlFor="title"
                                                    className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    Title
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-2 grid md:grid-cols-1 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    id="description"
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                    placeholder=" "
                                                    required
                                                />
                                                <label
                                                    htmlFor="description"
                                                    className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    Description
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <FieldArray
                                                        name="authors"
                                                        className=""
                                                        render={arrayHelpers => (
                                                            <div>
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
                                                                                onClick={() => arrayHelpers.insert(index, '')}
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
                                                                        onClick={() => arrayHelpers.push('')}
                                                                        className="absolute right-2 top-2 px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900  dark:hover:text-blue-700 focus:outline-none"
                                                                    >
                                                                        Add an author
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    />

                                                    <label
                                                        htmlFor="author"
                                                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Author
                                                    </label>
                                                </div>
                                                <div className='w-full flex flex-col '>
                                                    {/* {eventDetail.contributors.map((expert, index) => (
                                                <div key={index} className="text-sm text-gray-900 dark:text-white">
                                                    {index + 1}) {expert}
                                                    <button
                                                        onClick={() => { }}
                                                        className="ml-5 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))} */}
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <Field
                                                        type="date"
                                                        name="publicationDate"
                                                        id="publicationDate"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=""
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="publicationDate"
                                                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Publication Date
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        paperValue == SystemVariables.PUBLICATION_TYPE.JOURNALS ? (
                                            <>
                                                <div className="flex flex-col">
                                                    <div className="mt-2 grid md:grid-cols-3 md:gap-6">
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="text"
                                                                name="publisher"
                                                                id="publisher"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=""
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="publisher"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                Publisher
                                                            </label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="text"
                                                                name="volumeNo"
                                                                id="volumeNo"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=""
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="volumeNo"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                Volume No.
                                                            </label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="text"
                                                                name="issueNo"
                                                                id="issueNo"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=""
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="issueNo"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=""
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="pageNoRange.startPageNo"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                Start Page No.
                                                            </label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="number"
                                                                name="pageNoRange.endPageNo"
                                                                id="pageNoRange.endPageNo"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=""
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="pageNoRange.endPageNo"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                End Page No.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="mt-1 mx-auto text-xl font-medium text-gray-900 dark:text-white">Details</h3>
                                                <hr className="w-20 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
                                                <div className="flex mt-3 flex-col">
                                                    <div className="grid md:grid-cols-2 md:gap-6">
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="text"
                                                                name="address.city"
                                                                id="address.city"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=" "
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="address.city"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                address.city
                                                            </label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="text"
                                                                name="address.state"
                                                                id="address.state"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=" "
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="address.state"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=" "
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="address.country"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                Country
                                                            </label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <Field
                                                                type="text"
                                                                name="address.zip"
                                                                id="address.zip"
                                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                                placeholder=" "
                                                                required
                                                            />
                                                            <label
                                                                htmlFor="address.zip"
                                                                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                            >
                                                                Zip Code
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    <button
                                        type="submit"
                                        onClick={() => { }}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Save
                                    </button>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik >
            </div >
        </>
    );
};

export default AddPaper;
