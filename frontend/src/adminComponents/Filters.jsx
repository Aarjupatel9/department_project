import React, { useEffect, useRef, useState } from "react";
import { FieldToRemoveInXl, dataTypes, dataTypesMapper, dateTypeVar, fileFieldByName, fileFieldByNameInField, fileFieldByType, tableHeadings } from "../services/constants";
import { formatDateToDdMmYyyy } from "../utils/functions";
import { useNavigate } from "react-router-dom";
// import { JsonToExcel } from "react-json-to-excel";
// import exportFromJSON from "export-from-json";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
const Filters = () => {
  const [category, setCategory] = useState(null);
  const [CategoryDetails, setCategoryDetails] = useState(null);
  const [dynamicFilters, setDynamicFilters] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("A");
  const [sortColumn, setSortColumn] = useState();


  const tablref = useRef();
  const navigate = useNavigate();

  const updateFilterValue = (field, value) => {
    console.log("updating filter: ", field, value);
    setFilterValues((prevValues) => ({ ...prevValues, [field]: value }));
  };
  const removeFilterValue = (field, value) => {
    console.log("removing filter: ", field, value);

    const updatedState = { ...filterValues };
    delete updatedState[field];
    setFilterValues(updatedState);
    // setFilterValues((prevValues) => ({ ...prevValues, [field]: value }));
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
      // console.log("finalurl: ", url);
      const filteredData = await fetch(url);
      const filteredDataJson = await filteredData.json();
      setData(filteredDataJson.data);
      console.log("json data filtered: ", filteredDataJson);
      console.log("category: ", category);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  // const shortChange = (e) => {
  //   // const [data, setData] = useState([]);
  //   var value = e.target.value;
  //   console.log("short run index : ", value)
  //   shortMain(value);
  // }

  useEffect(() => {
    shortMain(sortColumn);
  }, [sortColumn, sortOrder])

  function shortMain(fl) {
    if (!sortColumn) {
      return;
    }
    var dynamicFilter;
    for (let index = 0; index < dynamicFilters.length; index++) {
      const element = dynamicFilters[index];
      if (element.field == fl) {
        dynamicFilter = element;
        break;
      }
    }
    if (!dynamicFilter) {
      return
    }
    var field = dynamicFilter.field;
    var type = dynamicFilter.type;

    if (type == undefined || type == "ObjectId" || type == "Boolean") {
      return;
    }
    let sortedArray;
    if (type == "String") {
      sortedArray = [...data].sort((a, b) => {
        console.log("sorting", a[field]);
        if (sortOrder == "A") {
          return a[field].localeCompare(b[field])
        } else {
          return b[field].localeCompare(a[field])
        }
      });
    } else {
      sortedArray = [...data].sort((a, b) => {
        console.log("sorting", a[field]);
        if (sortOrder == "A") {
          return a[field] - (b[field])
        } else {
          return b[field] - (a[field])
        }
      });
    }


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

    const sampleEmptyObject = createEmptyObject(metadataJson.filters); // Replace 'yourData' with your actual array of fields
    console.log(sampleEmptyObject);
    setSampleData(sampleEmptyObject);

    if (metadataJson.filters && metadataJson.filters.length > 0) {
      const x = metadataJson.filters.map((filter) => {
        // if (filter.field.indexOf('.') != -1) {
        // }
        if (Object.keys(sampleEmptyObject).includes(filter.field)) {
          console.log("field : ", filter.field);
          filter.isFilterable = true;
        } else {
          filter.isFilterable = false;
        }
        return filter;
      })
      console.log(x);
      setDynamicFilters(x);
    }

  };

  const printReport = useReactToPrint({
    content: () => {
      return tablref.current;
    }
  })

  const exportData = async () => {
    const xlData = await Promise.all(data.map(async (item) => {
      const newItem = { ...item };
      FieldToRemoveInXl.forEach((field) => {
        delete newItem[field];
      });
      // console.log("reach before array : ", item);
      await Object.keys(newItem).map((fl) => {
        console.log("for property : ", fl);
        if (newItem.hasOwnProperty(fl) &&
          Array.isArray(newItem[fl])) {
          console.log("ius array : ", fl);
          if (newItem[fl].length == 0) {
            newItem[fl] = "-"
          } else {
            newItem[fl] = newItem[fl].join(', ');
          }
        }
      })
      return newItem;
    }));
    const fileName = 'download'
    const exportType = 'csv'

    console.log("xldata", xlData)

    window.exportFromJSON({ data: xlData, fileName, exportType })
  }

  useEffect(() => {
    console.log("Category: ", category);
    setData([])
  }, [category]);

  const createEmptyObject = (fields) => {
    const result = {};

    fields.forEach((field) => {
      const fieldParts = field.field.split('.');
      let currentObj = result;

      fieldParts.forEach((part, index) => {
        if (!currentObj[part]) {
          if (index === fieldParts.length - 1) {
            // If it's the last part, set the value based on the type
            currentObj[part] = field.type || '';
          } else {
            // If it's not the last part, create an empty object for nesting
            currentObj[part] = {};
          }
        }

        currentObj = currentObj[part];
      });
    });

    return result;
  };

  return (
    <div className="relative filter-main-div">
      <div className="px-4  w-full text-sm text-left bg-gray-50 dark:bg-gray-700 rtl:text-right text-gray-500 dark:text-white">
        <div className="text-xs  uppercase ">
          <div>
            <div scope="col" colSpan="8" className="px-1 py-3">
              <div className="flex flex-wrap justify-between gap-y-2" >
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
                  <select onMouseUp={(e) => { setSortColumn(e.target.value) }} id="sortBy" className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1">
                    {sampleData && Object.keys(sampleData).map((filter, index) => {
                      if (sampleData[filter] == "" || fileFieldByName.includes(filter) || fileFieldByType.includes(typeof sampleData[filter])) {
                        return null
                      }
                      return (<option value={filter}>{filter}</option>
                      )
                    })}
                  </select>
                  <select onChange={(e) => { setSortOrder(e.target.value); }} id="sortBy" className="bg-gray-50 dark:bg-gray-600 border rounded ml-2 px-2 py-1">
                    <option value="A">A</option>
                    <option value="D">D</option>
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

                      !filter.isFilterable || fileFieldByNameInField.includes(filter.field) ? null
                        :

                        filter.enumValues ?
                          <div className="w-1  md:w-1/2 lg:w-1/3   p-0  flex items-center">
                            <label htmlFor="sortBy" className="">
                              {filter.field}:
                            </label>
                            <select onChange={(e) => {
                              if (e.target.value == '-') {
                                removeFilterValue(filter.field, e.target.value)
                              } else {
                                updateFilterValue(filter.field, e.target.value)
                              }
                            }} id="sortBy" className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1 ml-3">
                              <option value="-">-</option>
                              {filter && filter.enumValues && filter.enumValues.map((enumVal, index) => {
                                return (<option value={enumVal}>{enumVal}</option>)
                              })}

                            </select>
                          </div>
                          :
                          filter.type === "Boolean" ? (
                            <div className="w-1  md:w-1/2 lg:w-1/3   p-0  flex items-center">
                              <label htmlFor="sortBy" className="">
                                {filter.field}:
                              </label>
                              <select
                                onChange={(e) =>
                                  updateFilterValue(filter.field, e.target.value)
                                }
                                className="bg-gray-50 dark:bg-gray-600 border rounded px-2 py-1 ml-3">
                                <option value="-">-</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                              </select>
                            </div>
                          ) : filter.type === "Date" ? (
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
            </div>
          </div>
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
            <button
              type="button"
              onClick={printReport}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-black-700"
            >
              Print Report
            </button>
            <button
              type="button"
              onClick={exportData}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-black-700"
            >
              export csv
            </button>
            {/* <JsonToExcel
              title="Download as Excel"
              data={data}
              fileName="sample-file"
            /> */}
          </div>

        </div>
      </div>

      {data.length > 0 ?
        <div className="flex flex-col pt-4 ">
          <h1 className="mx-auto  text-2xl font-medium text-gray-900 dark:text-white">
            Patent Details
          </h1>
          {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"> */}
          <div id="printable_report_data" ref={tablref} className=" print:block mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">

            <table id="" className="w-full px-2  text-sm text-left rtl:text-right bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase ">
                <tr className="text-base text-center">
                  {tableHeadings[category] && (
                    <>
                      {tableHeadings[category].map((heading, index) => {
                        var fls = null;
                        if (heading == "eventDate") {
                          var fls = Object.keys(sampleData[heading]).join(", ");
                          console.log("fls : ", fls);
                        }
                        return (
                          <th key={index}>{fls ? <>{heading}  ({fls})</> : <>{heading} </>}</th>
                        )
                      })}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>

                {data.map((d, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-center text-xm border-b border-gray-200 dark:border-gray-600"
                    >
                      {tableHeadings[category].map((heading, tindex) => {
                        var cl_special = "text-center px-6 py-4 font-bold  whitespace-nowrap text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800"

                        var cl_odd = "text-center px-6 py-4 bg-gray-100 dark:bg-gray-800"
                        var cl_even = "text-center px-6 py-4 dark:text-white dark:bg-gray-700"

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
                              className={cl_main}
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
                              // <td className={cl_main}>
                              //   {d[heading] && d[heading].length > 0 ? (
                              //     <ul>
                              //       {d[heading].map((report, childIndex) => {
                              //         return (
                              //           <li className="list-disc">
                              //             <div
                              //               key={childIndex}
                              //               className="cursor-pointer text-sm  text-gray-900 dark:text-white relative"
                              //             // onMouseEnter={() => {
                              //             //   setPreviewIndex(index * 100 + childIndex);
                              //             //   getDocumentImagePreview(
                              //             //     report.url,
                              //             //     setHoveredPreview
                              //             //   );
                              //             // }}
                              //             // onMouseLeave={() => {
                              //             //   setPreviewIndex(-1);
                              //             //   setHoveredPreview(null);
                              //             // }}
                              //             >
                              //               {/* {previewIndex == index * 100 + childIndex ? (
                              //                 <div className="myImageHover zindex100 w-48 h-48 absolute top-[-100px] left-[-300px]  border-2 border-gray-900 ">
                              //                   {hoveredPreview}
                              //                 </div>
                              //               ) : (
                              //                 <></>
                              //               )} */}
                              //               <a
                              //                 className=" border-blue-500 hover:border-b-2  "
                              //                 target="_blank"
                              //                 href={report.url}
                              //               >
                              //                 {report.title}
                              //               </a>
                              //             </div>
                              //           </li>
                              //         );
                              //       })}
                              //     </ul>
                              //   ) : (
                              //     <div>no file uploaded</div>
                              //   )}

                              // </td>

                              null
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
                                    <td className={cl_main} key={index}>
                                      {d[heading] ? "yes" : "no"}
                                    </td>
                                    : d.hasOwnProperty(heading) &&
                                      (typeof d[heading] === "object") ?
                                      <ul>
                                        {
                                          Object.keys(d[heading]).map((item, index) => {
                                            if (dateTypeVar.includes(item)) {

                                              return (
                                                <li>
                                                  {index + 1}) {formatDateToDdMmYyyy(d[heading][item])}
                                                </li>
                                              )
                                            } else {
                                              return (
                                                <li>
                                                  {index + 1}) {d[heading][item]}
                                                </li>
                                              )
                                            }
                                          })}
                                      </ul>

                                      : <>
                                        {console.log("not accepteble : ", typeof d[heading])}
                                      </>)

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
