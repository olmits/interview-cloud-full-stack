import { useState } from "react";

import { PAGE_SIZES, ORDER_DIRECTION_ASC, ORDER_DIRECTION_DESC } from "../helpers/constants";


const useTable = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(PAGE_SIZES[0]);
    const [orderBy, setOrderBy] = useState(null);
    const [orderDirection, setOrderDirection] = useState(ORDER_DIRECTION_ASC);

    const handleSetPage = (val) => {
        setPage(val);
    }

    const handleSetPerPage = (val) => {
        setPerPage(val);
    }

    const handeleSetOrder = (val) => {
        if (val === orderBy) {
            setOrderDirection(prev => (prev === ORDER_DIRECTION_ASC
                ? ORDER_DIRECTION_DESC
                : ORDER_DIRECTION_ASC));
        } else {
            setOrderBy(val);
            setOrderDirection(ORDER_DIRECTION_ASC);
        }
    }

    return {
        page,
        perPage,
        orderBy,
        orderDirection,
        handleSetPage,
        handleSetPerPage,
        handeleSetOrder,
    }
}

export default useTable;
