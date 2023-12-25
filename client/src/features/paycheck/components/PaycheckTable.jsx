import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import fetchAxios from "../../../lib/fetchAxios";
import formatMoney from "../../../utils/moneyFormatter";

const PaycheckTable = ({ paychecks, updatePaychecks, session }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPaychecks, setFilteredPaychecks] = useState(paychecks);

  useEffect(() => {
    setFilteredPaychecks(
      paychecks.filter((paycheck) => {
        return (
          paycheck.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paycheck.income_source.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }),
    );
  }, [paychecks, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredPaychecks.length)
      : 0;

  const handleDelete = (id) => {
    fetchAxios(
      {
        method: "DELETE",
        url: `/api/paychecks/${id}`,
      },
      session,
    ).then(() => {
      updatePaychecks();
    });
  };

  return (
    <div className="w-full max-w-7xl">
      <TableContainer>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="rounded px-2 py-2"
        />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <h1 className="font-bold">Date</h1>
              </TableCell>
              <TableCell>
                <h1 className="font-bold">Source</h1>
              </TableCell>
              <TableCell align="right">
                <h1 className="font-bold">Amount</h1>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPaychecks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((paycheck) => (
                <TableRow key={paycheck.id}>
                  <TableCell>{paycheck.date}</TableCell>
                  <TableCell>{paycheck.income_source.name}</TableCell>
                  <TableCell align="right">
                    ${formatMoney(paycheck.amount)}
                  </TableCell>
                  <TableCell align="right">
                    <div className="cursor-pointer hover:text-red-400">
                      <DeleteIcon
                        fontSize="small"
                        onClick={() => handleDelete(paycheck.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={paychecks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};
export default PaycheckTable;
