import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddPaper = () => {
    const [paperValue, setPaperValue] = useState('journal');
    const handleSelectChange = (e) => {
        console.log("Value: ", e.target.value);
        setPaperValue(e.target.value);
    }
    return (
        <>
            <div className="flex flex-col shadow-md sm:rounded-lg">
                <h1 className="text-3xl mx-auto font-medium text-gray-900 dark:text-white">Add Paper</h1>
                <hr className="mt-2" />
                <Formik
                    initialValues={{}}
                    onSubmit={(values, { setSubmitting }) => {
                        alert("The form is submitted");
                        console.log("Values: ", values);
                    }}
                >
                    <Form>
                        <div className="mt-4 mb-6 flex items-center justify-center">
                            <Field
                                as="select"
                                name="paperType"
                                className="bg-gray-50 h-8 py-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleSelectChange}
                            >
                                <option value="journal" >Journal</option>
                                <option value="conference">Conference</option>
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
                            </div>
                            {/* Add authors field */}
                            <div className="flex flex-col">
                                <div className="mt-2 grid md:grid-cols-2 md:gap-6">
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
                            {
                                paperValue == "journal" ? (
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
                                                        name="volumeno"
                                                        id="volumeno"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=""
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="volumeno"
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
                                                        name="startPageNo"
                                                        id="startPageNo"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=""
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="startPageNo"
                                                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Start Page No.
                                                    </label>
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <Field
                                                        type="number"
                                                        name="endPageNo"
                                                        id="endPageNo"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=""
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="endPageNo"
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
                                                        as="text"
                                                        name="city"
                                                        id="city"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder="city "
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="city"
                                                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        City
                                                    </label>
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <Field
                                                        as="text"
                                                        name="state"
                                                        id="state"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="state"
                                                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        State
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 md:gap-6">
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <Field
                                                        as="text"
                                                        name="country"
                                                        id="country"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="country"
                                                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Country
                                                    </label>
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <Field
                                                        as="text"
                                                        name="zip"
                                                        id="zip"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="zip"
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
                </Formik>
            </div>
        </>
    );
};

export default AddPaper;
