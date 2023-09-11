import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { selectUserDetails } from '../reduxStore/reducers/userDetailSlice';
import { selectSystemVariables } from '../reduxStore/reducers/systemVariables';
import { useAppDispatch, useAppSelector } from '../reduxStore/hooks';
import { useNavigate } from 'react-router-dom';
import { profileDetailValidator } from '../validator/profileValidator';
import { IEvent, IEventTemplate } from '../reduxStore/reducers/eventsSlice';
import { eventDetailValidator } from '../validator/eventValidator';

export default function AddEvents() {

    const SystemVariables = useAppSelector(selectSystemVariables);
    const userDetail = useAppSelector(selectUserDetails);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [eventDetail, setEventDetail] = useState<IEvent>(IEventTemplate);
    const [rowData, setRowData] = useState<{
        contributors: string, experts: string, report: { title: string; url: string; }
    }>({ contributors: "", experts: "", report: { title: "", url: "" } });

    const handelProfileUpload = () => {
        console.log('Form Data:', eventDetail);
        const { error } = eventDetailValidator.validate(eventDetail);
        if (error) {
            toast.error(error.toString());
            return;
        }
    };
    const handleRowDataInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name.startsWith("report.")) {
            const [parent, child] = name.split(".");
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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        } else if (name.startsWith("report.")) {
            const [parent, child] = name.split(".");
            setEventDetail((prevData) => ({
                ...prevData,
                report: {
                    ...prevData.report,
                    [child]: value,
                },
            }));
        } else {
            console.log("handleInputChange else change : ", name)
            setEventDetail((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    function formatDateToDdMmYyyy(inputDateString: string) {
        const date = new Date(inputDateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    const handleAddExpert = () => {
        const newExpert = rowData.experts;
        if (newExpert.trim() !== '') {
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
    const handleRemoveExpert = (index: number) => {
        const updatedExperts = [...eventDetail.experts];
        updatedExperts.splice(index, 1);
        setEventDetail((prevData) => ({
            ...prevData,
            experts: updatedExperts,
        }));
    };
    const handleAddContributors = () => {
        const newContributors = rowData.contributors;
        if (newContributors.trim() !== '') {
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
        if (report.title.trim() !== '') {
            setEventDetail((prevData) => ({
                ...prevData,
                report: [...prevData.report, { title: report.title, url: report.url }],
            }));
            setRowData((prevData) => ({
                ...prevData,
                report: { title: "", url: "" },
            }));
        }
    };
    const handleRemoveReport = (index: number) => {
        const updatedReports = [...eventDetail.report];
        updatedReports.splice(index, 1);
        setEventDetail((prevData) => ({
            ...prevData,
            report: updatedReports,
        }));
    };
    const handleRemoveContributors = (index: number) => {
        const updatedContributors = [...eventDetail.contributors];
        updatedContributors.splice(index, 1);
        setEventDetail((prevData) => ({
            ...prevData,
            contributors: updatedContributors,
        }));
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEventDetail({
            ...eventDetail,
            [name]: checked,
        });
    };

    useEffect(() => {
        console.log("event detaitls changed : ", eventDetail);
    }, [eventDetail]);
    return (
        <div className=" flex flex-col shadow-md sm:rounded-lg">
            <h1 className='text-3xl mx-auto  font-medium text-gray-900 dark:text-white'>Event Entry </h1>
            <hr className='mt-2' />
            <div className='m-1 p-5 flex flex-col'>

                {/* personalDetails */}
                <div className='flex flex-col'>
                    <h3 className='mt-4 mx-auto text-xl font-medium text-gray-900 dark:text-white'>personalDetails</h3>
                    <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                    <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={eventDetail.title} type="text" name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="title" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={eventDetail.organizedUnder} type="text" name="organizedUnder" id="organizedUnder" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="organizedUnder" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Organized Under</label>
                        </div>
                    </div>
                    <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <textarea onChange={handleInputChange} value={String(eventDetail.description)} name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ></textarea>
                            <label htmlFor="description" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        </div>
                        <div className="mt-4 mb-6 flex items-center">
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
                </div>

                {/* address */}
                <div className='flex flex-col'>
                    <h3 className='mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white'>address</h3>
                    <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(eventDetail.address.city)} type="text" name="address.city" id="address.city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="address.city" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(eventDetail.address.state)} type="text" name="address.state" id="address.state" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="address.state" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State </label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(eventDetail.address.country)} type="text" name="address.country" id="address.country" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="address.country" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">country</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(eventDetail.address.zip)} type="tel" name="address.zip" id="address.zip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
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
                            <input
                                onChange={handleRowDataInputChange}
                                value={rowData.contributors}
                                type="text"
                                name="contributors"
                                id="contributors"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Enter a Contributor"
                            />
                            <button
                                onClick={handleAddContributors} name='contributors'
                                className="absolute right-2 top-2 px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900  dark:hover:text-blue-700 focus:outline-none"
                            >
                                Add
                            </button>
                        </div>
                        <div className='w-full flex flex-col '>
                            {eventDetail.contributors.map((expert, index) => (
                                <div key={index} className="text-sm text-gray-900 dark:text-white">
                                    {index + 1}) {expert}
                                    <button
                                        onClick={() => handleRemoveContributors(index)}
                                        className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* experts */}
                <div className='flex flex-col'>
                    <h3 className='mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white'>Experts</h3>
                    <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                    <div className='my-6 mx-10'>
                        <div className="relative w-full mb-4 group">
                            <input
                                onChange={handleRowDataInputChange}
                                value={rowData.experts}
                                type="text"
                                name="experts"
                                id="experts"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder="Enter an expert"
                            />
                            <button
                                onClick={handleAddExpert}
                                className="absolute right-2 top-2 px-2 py-1 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                            >
                                Add
                            </button>
                        </div>
                        <div className='w-full flex flex-col '>
                            {eventDetail.experts.map((expert, index) => (
                                <div key={index} className="text-sm text-gray-900 dark:text-white">
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
                <div className='flex flex-col'>
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
                            {eventDetail.report.map((report, index) => (
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
                </div>

                <div className="mt-10 grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={formatDateToDdMmYyyy(String(eventDetail.eventDate.startDate))} type="date" name="eventDate.startDate" id="eventDate.startDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="eventDate.startDate" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">startDate</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={formatDateToDdMmYyyy(String(eventDetail.eventDate.endDate))} type="date" name="eventDate.endDate" id="eventDate.endDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="eventDate.endDate" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">endDate</label>
                    </div>
                </div>

                <button type="button" onClick={handelProfileUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </div>
        </div>
    )
}
