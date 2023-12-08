import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTable, useRowSelect } from "react-table";
import "./Styles/TransactionTable.css";
import UserContext from "../../Services/UserContext";

export const TransactionTable = ({
  id,
  refresh,
  numberOfTransactions,
  className,
  innerClassName,
  selectable,
  onSelect,
  filterType = "all",
  filterRecurring = "all",
  filterCategory = "all",
}) => {
  const { user, walletId } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/getTransactions/${user}/${walletId}`,
        );
        const data = response.data.transactions;

        let transformedData = data
          .map((transaction) => ({
            id: transaction.id,
            ...transaction.data,
            date: new Date(transaction.data.date._seconds * 1000),
          }))
          .sort((a, b) => b.date - a.date)
          .map((t) => ({ ...t, date: t.date.toLocaleDateString() }));

        if (numberOfTransactions) {
          transformedData = transformedData.slice(0, numberOfTransactions);
        }

        if (filterType !== "all") {
          transformedData = transformedData.filter(
            (t) => t.type === filterType,
          );
        }

        if (filterCategory !== "all") {
          transformedData = transformedData.filter(
            (t) => t.category === filterCategory,
          );
        }

        if (filterRecurring !== "all") {
          transformedData = transformedData.filter(
            (t) => t.recurring === filterRecurring,
          );
        }

        setTransactions(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    refresh,
    numberOfTransactions,
    user,
    walletId,
    filterType,
    filterCategory,
    filterRecurring,
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Recurring",
        accessor: "recurring",
        Cell: ({ value }) => (value === "true" ? "Yes" : "No"),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: transactions,
        initialState: {
          selectedRowIds: {},
        },
      },
      useRowSelect,
      (hooks) => {
        if (selectable) {
          hooks.visibleColumns.push((columns) => [
            {
              id: "selection",
              Header: "",
              Cell: ({ row }) => (
                <div>
                  <input
                    type="radio"
                    name="rowSelector"
                    id="row-select-box"
                    checked={
                      selectedTransaction &&
                      selectedTransaction.id === row.original.id
                    }
                    onChange={() => {
                      row.toggleRowSelected(true);
                      setSelectedTransaction({
                        id: row.original.id,
                        data: row.original,
                      });
                    }}
                  />
                </div>
              ),
            },
            ...columns,
          ]);
        }
      },
    );

  useEffect(() => {
    if (typeof onSelect === "function") {
      onSelect(selectedTransaction);
    }
  }, [selectedTransaction, onSelect]);

  return (
    <div id={id} className={innerClassName}>
      <table {...getTableProps()} className={className}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>
                No transactions were found in this wallet. Please add one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
