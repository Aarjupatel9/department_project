import React, { useEffect, useState } from "react";
import { dataTypes, dataTypesMapper, dateTypeVar, fileTypeField, tableHeadings } from "../services/constants";
import { formatDateToDdMmYyyy } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Filters = () => {
  const [category, setCategory] = useState(null);
  const [CategoryDetails, setCategoryDetails] = useState(null);
  const [dynamicFilters, setDynamicFilters] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const updateFilterValue = (field, value) => {
    console.log("updating filter: ", field, value);
    setFilterValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const clearFilter = async () => {
    setCategory(null);
    setCategoryDetails(null);
    setDynamicFilters(null);
    setFilterValues({});
    // setData([]);
  }
  const handleFilter = async () => {
    if (category === undefined || category == null) {
      toast.error("select at least one category ")
      return;

    }
    try {
      let url =
        process.env.REACT_APP_API_SERVER +
        "/api/data/data-filter?dataType=" +
        category +
        "&&";
      for (let filter in filterValues) {
        url = url + `${filter}=${filterValues[filter]}&&`;
      }
      console.log("finalurl: ", url);
      const filteredData = await fetch(url);
      const filteredDataJson = await filteredData.json();
      setData(filteredDataJson.data);
      console.log("json data filtered: ", filteredDataJson);
      console.log("category: ", category);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const shortChange = (e) => {
    // const [data, setData] = useState([]);

    var index = e.target.value;
    console.log("short run index : ", index)
    shortMain(dynamicFilters[index]);
  }
  function shortMain(dynamicFilter) {

    var field = dynamicFilter.field;
    var type = dynamicFilter.type;
    
    if (type == undefined || type == "ObjectId" || type == "Boolean"  ) {
      return;
    }

    const sortedArray = [...data].sort((a, b) => {
      console.log("sorting", a[field]);
      return a[field].localeCompare(b[field])
    });
    setData(sortedArray);
    console.log(field, sortedArray);
  }

  

  const getMetadata = async (e) => {
    const metadata = await fetch(
      process.env.REACT_APP_API_SERVER +
      "/api/data/metadata?dataType=" +
      e.target.value
    );
    const metadataJson = await metadata.json();
    console.log("metadata: ", metadataJson);
    setFilterValues({});
    setCategory(e.target.value);
    setCategoryDetails(dataTypesMapper[e.target.value]);
    console.log("category details ", dataTypesMapper[e.target.value]);
    setDynamicFilters(metadataJson.filters);
  };



  useEffect(() => {
    console.log("Category: ", category);
    setData([])
  }, [category]);
  return (
    <div className="relative filter-main-div">
      <table className=" w-full text-sm text-left bg-gray-50 dark:bg-gray-700 rtl:text-right text-gray-500 dark:text-white">
        <thead className="text-xs  uppercase  ">
          <tr>
            <th scope="col" colSpan="8" className="px-1 py-3">
              <div className="flex flex-wrap justify-between gap-y-0" >
                <div className="w-1  md:w-1/2 lg:w-1/3    p-0  flex items-center">
                  <label htmlFor="filterCategory" className="mr-2">
                    Filter by Category:
                  </label>
                  <select
                    id="filterCategory"
                    onChange={getMetadata}
                    className="border bg-gray-50 dark:bg-gray-600 rounded px-2 py-1"
                  >
                    <option value="">Select a category</option>
                    {dataTypes.map((dataType) => {
                      return (
                        <>
                          <option value={dataType}>
                            {dataType[0].toUpperCase() + dataType.slice(1)}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="w-1  md:w-1/2 lg:w-1/3   p-0  flex items-center">
                  <label htmlFor="sortBy" className="mr-2">
                    Sort By:
                  </label>
                  <select onMouseUp={shortChange} id="sortBy" className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1">
                    {dynamicFilters && dynamicFilters.map((filter, index) => {
                      if (filter.field.toUpperCase() == "USERID" || fileTypeField.includes(filter.field)) {
                        return null
                      }
                      return (<option  value={index}>{filter.field}</option>
                      )
                    })}

                  </select>
                </div>
                <div className="w-1  md:w-1/2 lg:w-1/3   p-0 flex items-center">
                  <label htmlFor="startDate" className="mr-2">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1"
                  />
                </div>
                <div className="w-1  md:w-1/2 lg:w-1/3   p-0 flex items-center">
                  <label htmlFor="endDate" className="mr-2">
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1"
                  />
                </div>
                {dynamicFilters &&
                  dynamicFilters.map((filter) => {
                    return (

                      filter.type === "Date" ? (
                        <div
                          key={filter.field} className="w-1  md:w-1/2 lg:w-1/3   p-0 flex flex-row items-center"
                        >
                          <label htmlFor={filter.field} className="text-sm">
                            {filter.field}:
                          </label>
                          <input
                            type="date"
                            id={filter.field}
                            value={filterValues[filter.field] || ""}
                            onChange={(e) =>
                              updateFilterValue(filter.field, e.target.value)
                            }
                            className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1 ml-3"
                          />
                        </div>
                      ) : filter.type === "text" || filter.type === "String" ? (
                        <div
                          key={filter.field} className="w-1  md:w-1/2 lg:w-1/3   p-0 flex flex-row items-center"
                        >
                          <label htmlFor={filter.field} className="text-sm">
                            {filter.field}:
                          </label>
                          <input
                            type="text"
                            id={filter.field}
                            value={filterValues[filter.field] || ""}
                            onChange={(e) =>
                              updateFilterValue(filter.field, e.target.value)
                            }
                            className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1 ml-3"
                          />
                        </div>
                      ) : (
                        null
                      )
                    )
                  })}
              </div>
            </th>
          </tr>
          <div className="text-center">
            <button
              type="button"
              onClick={handleFilter}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-black-700"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={clearFilter}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-black-700"
            >
              Clear Filters
            </button>
          </div>

        </thead>
      </table>

      {data.length > 0 ?

        <div className="flex flex-col pt-4 ">
          <h1 className="mx-auto  text-2xl font-medium text-gray-900 dark:text-white">
            Patent Details
          </h1>
          {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"> */}
          <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">

            <table className="w-full px-2  text-sm text-left rtl:text-right bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase ">
                <tr className="text-lg text-center">
                  {tableHeadings[category] && (
                    <>
                      {tableHeadings[category].map((heading, index) => (
                        <th key={index}>{heading}</th>
                      ))}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>


                {data.map((d, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-lg border-b border-gray-200 dark:border-gray-600"
                    >
                      {tableHeadings[category].map((heading, tindex) => {
                        var cl_special = "px-6 py-4 font-bold  whitespace-nowrap text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800"

                        var cl_odd = "px-6 py-4 bg-gray-100 dark:bg-gray-800"
                        var cl_even = "px-6 py-4 dark:text-white dark:bg-gray-700"

                        var cl_main;

                        if (tindex % 2 == 0) {
                          cl_main = cl_odd;
                        } else {
                          cl_main = cl_even;
                        }


                        if (tindex == 0) {
                          cl_main = cl_special

                          return (
                            <th
                              scope="row"
                              className="px-6 py-4 font-bold text-lg text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                            >
                              <div
                                className=" cursor-pointer  hover:underline"
                                onClick={() => {
                                  navigate("/" + CategoryDetails.route + "/" + d._id);
                                }}
                              >
                                {d[heading]}
                              </div>
                            </th>
                          )
                        }

                        return (

                          d.hasOwnProperty(heading) &&
                            dateTypeVar.includes(heading) ?
                            <td className={cl_main}>
                              {formatDateToDdMmYyyy(d[heading])}
                            </td>
                            : d.hasOwnProperty(heading) && Array.isArray(d[heading]) && (heading == "certificates" || heading == "reports") ?
                              <td className={cl_main}>
                                {d[heading] && d[heading].length > 0 ? (
                                  <ul>
                                    {d[heading].map((report, childIndex) => {
                                      return (
                                        <li className="list-disc">
                                          <div
                                            key={childIndex}
                                            className="cursor-pointer text-sm  text-gray-900 dark:text-white relative"
                                          // onMouseEnter={() => {
                                          //   setPreviewIndex(index * 100 + childIndex);
                                          //   getDocumentImagePreview(
                                          //     report.url,
                                          //     setHoveredPreview
                                          //   );
                                          // }}
                                          // onMouseLeave={() => {
                                          //   setPreviewIndex(-1);
                                          //   setHoveredPreview(null);
                                          // }}
                                          >
                                            {/* {previewIndex == index * 100 + childIndex ? (
                                              <div className="myImageHover zindex100 w-48 h-48 absolute top-[-100px] left-[-300px]  border-2 border-gray-900 ">
                                                {hoveredPreview}
                                              </div>
                                            ) : (
                                              <></>
                                            )} */}
                                            <a
                                              className=" border-blue-500 hover:border-b-2  "
                                              target="_blank"
                                              href={report.url}
                                            >
                                              {report.title}
                                            </a>
                                          </div>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  <div>no file uploaded</div>
                                )}

                              </td>
                              : d.hasOwnProperty(heading) &&
                                Array.isArray(d[heading]) ?
                                <td className={cl_main}>
                                  {d[heading] && d[heading].length > 0 ?
                                    <ul>
                                      {d[heading].map((it, index) => {
                                        return (
                                          <li>
                                            {index + 1}) {it}
                                          </li>
                                        )
                                      })}

                                    </ul>
                                    : <div>-</div>}
                                </td> :
                                d.hasOwnProperty(heading) &&
                                (typeof d[heading] === "number" ||
                                  typeof d[heading] === "string"
                                  ?
                                  <td className={cl_main}>
                                    {d[heading]}
                                  </td>
                                  : d.hasOwnProperty(heading) &&
                                    (typeof d[heading] === "boolean") ?
                                    <td key={index}>
                                      {d[heading] ? "yes" : "no"}
                                    </td>

                                    : null)

                        )
                      }
                      )}
                    </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>

        : <></>}
    </div>
  );
};

export default Filters;
