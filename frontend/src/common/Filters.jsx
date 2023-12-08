import React, { useEffect, useState } from "react";
import { dataTypes, tableHeadings } from "../services/constants";
const Filters = () => {
  const [category, setCategory] = useState();
  const [dynamicFilters, setDynamicFilters] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [data, setData] = useState([]);

  const updateFilterValue = (field, value) => {
    console.log("updating filter: ", field, value);
    setFilterValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleFilter = async () => {
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
    setDynamicFilters(metadataJson.filters);
  };

  useEffect(() => {
    console.log("Category: ", category);
  }, [category]);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" colSpan="8" className="px-6 py-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <label htmlFor="filterCategory" className="mr-2">
                    Filter by Category:
                  </label>
                  <select
                    id="filterCategory"
                    onChange={getMetadata}
                    className="border rounded px-2 py-1"
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
                <div className="flex items-center">
                  <label htmlFor="sortBy" className="mr-2">
                    Sort By:
                  </label>
                  <select id="sortBy" className="border rounded px-2 py-1">
                    <option value="productName">Product Name</option>
                    <option value="color">Color</option>
                    <option value="category">Category</option>
                    <option value="price">Price</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="startDate" className="mr-2">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="border rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="endDate" className="mr-2">
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="border rounded px-2 py-1"
                  />
                </div>
                {dynamicFilters &&
                  dynamicFilters.map((filter) => (
                    <div
                      key={filter.field}
                      className="filter-item grid grid-cols-2 gap-4"
                    >
                      {filter.type === "Date" ? (
                        <>
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
                            className="border rounded px-2 py-1"
                          />
                        </>
                      ) : filter.type === "text" || filter.type === "String" ? (
                        <>
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
                            className="border rounded px-2 py-1"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={handleFilter}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-black-700"
                >
                  Apply Filters
                </button>
              </div>
            </th>
          </tr>
          <tr className="text-lg bg-gray-200">
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
          <tr className="bg-white border-b dark:bg-gray-800 text-lg dark:border-gray-700">
            {/* {data &&
              data.map((d, dataIndex) => (
                <>
                  {Object.keys(d).map((key, index) =>
                    key === "certificates" ||
                    key === "fileReport" ||
                    key === "_id" ||
                    key === "userId" ? (
                      <React.Fragment key={index}></React.Fragment>
                    ) : (
                      <td key={index}>
                        {typeof d[key] === "object" && Array.isArray(d[key])
                          ? d[key].map((item, itemIndex) => (
                              <div key={itemIndex}>
                                {Object.keys(item).map((subKey, subIndex) =>
                                  subKey === "title" ||
                                  subKey === "url" ||
                                  subKey === "_id" ? (
                                    <React.Fragment
                                      key={subIndex}
                                    ></React.Fragment>
                                  ) : (
                                    <div key={subIndex}>{item[subKey]}</div>
                                  )
                                )}
                              </div>
                            ))
                          : d[key]}
                      </td>
                    )
                  )}
                </>
              ))} */}

            {data &&
              data.map((d, dataIndex) => (
                <>
                  {tableHeadings[category].map((heading, index) => (
                    <td key={index}>
                      {d.hasOwnProperty(heading) &&
                        (typeof d[heading] === "number" ||
                        typeof d[heading] === "string" ||
                        Array.isArray(d[heading]) ||
                        (typeof d[heading] === "object" &&
                          d[heading] instanceof Date)
                          ? d[heading]
                          : null)}
                    </td>
                  ))}
                </>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Filters;
