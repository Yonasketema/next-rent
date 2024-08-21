import { MRT_ColumnFiltersState } from "material-react-table";
import { useEffect, useState } from "react";
import { createURL } from "./api";

export const useFilterData = (initData, baseURL, categories?: any) => {
  const queryParams = new URLSearchParams();
  const [data, setData] = useState(initData);
  const [isRefetching, setIsRefetching] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      columnFilters.forEach((item) => {
        if (item.id === "bookName") {
          queryParams.append("title", item.value);
        } else if (item.id === "Price") {
          const [minPrice, maxPrice] = item.value;
          queryParams.append("minPrice", minPrice);
          queryParams.append("maxPrice", maxPrice);
        } else if (item.id === "bookNo") {
          queryParams.append("bookNo", item.value);
        } else if (item.id === "bookName") {
          queryParams.append("title", item.value);
        } else if (item.id === "Status") {
          queryParams.append("status", item.value);
        } else if (item.id === "author") {
          queryParams.append("author", item.value);
        } else if (item.id === "location") {
          queryParams.append("location", item.value);
        } else if (item.id === "category") {
          queryParams.append(
            "category",
            categories.find((cat) => cat.name === item.value).id
          );
        } else if (item.id === "owner") {
          queryParams.append("owner", item.value);
        }
      });

      if (!globalFilter && !columnFilters) {
        setData(initData);
      }

      if (globalFilter?.length >= 3) {
        queryParams.append("title", globalFilter);
      }

      console.log(`/api/books?${queryParams.toString()}`);
      console.log(columnFilters);

      try {
        setIsRefetching(true);
        const filteredData = await fetch(
          createURL(`${baseURL}?${queryParams.toString()}`)
        );
        const res = await filteredData.json();

        setData(res?.data?.books || res?.data?.owners);
        setIsRefetching(false);
      } catch (error) {}
    };
    fetchData();
  }, [globalFilter, JSON.stringify(columnFilters)]);

  return {
    data,
    isRefetching,
    setGlobalFilter,
    setColumnFilters,
    globalFilter,
    columnFilters,
  };
};
