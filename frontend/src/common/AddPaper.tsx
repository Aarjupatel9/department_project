import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

interface Publication {
    title: string;
    description: string;
    authors: string[];
    publicationType: string;
    publicationDate: Date;
    publisher?: string;
    volumeNo?: string;
    issueNo?: string;
    pageNoRange?: {
        startPageNo: number;
        endPageNo: number;
    };
    address?: {
        city: string;
        state: string;
        country: string;
        zip: string;
    };
}

const AddPaper: React.FC = () => {
    const initialValues: Publication = {
        title: '',
        description: '',
        authors: [],
        publicationType: '',
        publicationDate: new Date(),
        // Attributes for journals
        publisher: '',
        volumeNo: '',
        issueNo: '',
        pageNoRange: {
            startPageNo: 0,
            endPageNo: 0,
        },
        // Attributes for conferences
        address: {
            city: '',
            state: '',
            country: '',
            zip: '',
        }
    }
    const [paperValue, setPaperValue] = useState<string>("journal");
    return (
        <>
            <div className=" flex flex-col shadow-md sm:rounded-lg">
                <h1 className='text-3xl mx-auto  font-medium text-gray-900 dark:text-white'>Add Paper</h1>
                <hr className='mt-2' />
                <Formik
                    initialValues={initialValues}
                    onSubmit={(
                        values: Publication,
                        { setSubmitting }: FormikHelpers<Publication>
                    ) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    <Form>
                        <div className="mt-4 mb-6 flex items-center justify-center">
                            <Field as="select" name="paperType" className="bg-gray-50 h-8 py-0  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="journal">Journal</option>
                                <option value="conference">Conference</option>
                            </Field>
                        </div>
                        <div className='m-1 p-1 flex flex-col'>
                            {/* Event Details */}
                            <div className='flex flex-col'>
                                <h3 className='mt-1 mx-auto text-xl font-medium text-gray-900 dark:text-white'>Details</h3>
                                <hr className='w-20 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                                <div className="mt-2 grid md:grid-cols-1 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="title" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                                    </div>
                                </div>
                                <div className="mt-2 grid md:grid-cols-1 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field as="textarea" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="description" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                                    </div>
                                </div>
                            </div>
                            Add authors field
                            <div className="flex flex-col">
                                <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field as="textarea" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="description" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                                    </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <Field as="textarea" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="description" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                                </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field as="text" name="address.city" id="address.city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="address.city" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field as="text" name="address.state" id="address.state" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="address.state" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State </label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field as="text" name="address.country" id="address.country" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="address.country" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">country</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <Field as="text" name="address.zip" id="address.zip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="address.zip" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">zip Code </label>
                                    </div>
                                </div>
                            </div>

                            {/* contributors */}
                            <div className='flex flex-col'>
                                <h3 className='mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white'>Contributors</h3>
                                <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                                <div className='my-6 mx-10'>
                                    <div className="relative w-full mb-4 group">
                                        <Field
                                            as="text"
                                            name="contributors"
                                            id="contributors"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Enter an author"
                                        />
                                        {/* <button
                                    onClick={handleAddContributors} name='contributors'
                                    className="absolute right-2 top-2 px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900  dark:hover:text-blue-700 focus:outline-none"
                                >
                                    Add
                                </button> */}
                                    </div>
                                    <div className='w-full flex flex-col '>
                                        {/* {formik.values.authors.map((expert, index) => (
                                            <div key={index} className="text-sm text-gray-900 dark:text-white">
                                                {index + 1}) {expert}
                                                <button
                                            onClick={() => handleRemoveContributors(index)}
                                            className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                                        >
                                            Remove
                                        </button>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            </div>

                            {/* reports */}
                            {/* <div className='flex flex-col'>
                        <h3 className='mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white'>Reports</h3>
                        <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                        <div className='my-6 mx-10 mb-4 px-10 w-full'>
                            <div className="flex flex-row  items-center justify-between  ">
                                <div className="flex flex-col w-full px-10 ">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleRowDataInputChange}
                                            value={rowData.report.title}
                                            type="text"
                                            name="report.title"
                                            id="report.title"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Enter an Title"
                                        />
                                    </div>
                                    <div className=" z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleRowDataInputChange}
                                            value={rowData.report.url}
                                            type="file"
                                            name="report.url"
                                            id="report.url"
                                            className="block  p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Upload report"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddReport}
                                    className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                                > Add </button>
                            </div>
                            <div className='w-full flex flex-col '>
                                {formik.values.report.map((report, index) => (
                                    <div key={index} className="text-sm text-gray-900 dark:text-white">
                                        {index + 1}) title : {report.title}  fileName : {report.url}
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
                    </div> */}

                            {/* <div className="mt-10 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formik.values.publicationDate} type="date" name="eventDate.startDate" id="eventDate.startDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="eventDate.startDate" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publication Date</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={formik.handleChange} value={formatDateToDdMmYyyy(String(formik.values.eventDate.endDate))} type="date" name="eventDate.endDate" id="eventDate.endDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="eventDate.endDate" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">endDate</label>
                        </div>
                    </div> */}

                            <button type="button" onClick={() => { }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        </div>
                    </Form >
                </Formik>
            </div >
        </>
    );
}

export default AddPaper;