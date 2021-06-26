import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Table,
  Paper,
  Collapse,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  withStyles,
  makeStyles,
  Typography,
  IconButton,
  TableContainer,
} from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

import {
  Consolidated,
  holding as apiHolding,
  Holding as HoldingProps,
} from "../../api/holding";
import { MarginChart } from "../../components/MarginChart";
import { DataChart } from "../../components/DataChart";
import { formatPercentage } from "../../utils/formatPercentage";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  margin: {
    marginBottom: 24,
  },
  modalContainer: {
    position: "absolute",
    width: 800,
    backgroundColor: "white",
    border: "2px solid #000",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  graphics: {
    display: "flex",
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {},
  body: {
    borderBottom: "none",
    fontSize: 14,
  },
}))(TableCell);

const Row = ({ row, holdings }: { row: any; holdings: any }) => {
  const [open, setOpen] = React.useState(false);

  const quarters = holdings.filter(
    (holding: any) => holding.trimestre.ano === row.ano
  );

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.ano}</TableCell>
        <TableCell>{formatCurrency(row.receita_liquida)}</TableCell>
        <TableCell>{formatCurrency(row.ebitda)}</TableCell>
        <TableCell>{formatPercentage(row.margem_ebitda)}</TableCell>
        <TableCell>{formatCurrency(row.lucro_liquido)}</TableCell>
        <TableCell>{formatPercentage(row.margem_liquida)}</TableCell>
        <TableCell>{formatCurrency(row.divida_liquida)}</TableCell>
        <TableCell>{row.div_ebitda}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Trimestre</TableCell>
                  <TableCell>Receita líquida</TableCell>
                  <TableCell>EBITDA</TableCell>
                  <TableCell>Margem EBITDA</TableCell>
                  <TableCell>Lucro líquido</TableCell>
                  <TableCell>Margem líquida</TableCell>
                  <TableCell>Dívida líquida</TableCell>
                  <TableCell>Dívida líquida/EBITDA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quarters.map((row: HoldingProps) => (
                  <TableRow key={row.trimestre.codigo}>
                    <>
                      <StyledTableCell>
                        {row.trimestre.ano}/{row.trimestre.trimestre}
                      </StyledTableCell>
                      <StyledTableCell>{formatCurrency(row.receita_liquida)}</StyledTableCell>
                      <StyledTableCell>{formatCurrency(row.ebitda)}</StyledTableCell>
                      <StyledTableCell>
                        {formatPercentage(row.margem_ebitda)}
                      </StyledTableCell>
                      <StyledTableCell>{formatCurrency(row.lucro_liquido)}</StyledTableCell>
                      <StyledTableCell>
                        {formatPercentage(row.margem_liquida)}
                      </StyledTableCell>
                      <StyledTableCell>{formatCurrency(row.divida_liquida)}</StyledTableCell>
                      <StyledTableCell>{row.div_ebitda}</StyledTableCell>
                    </>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Holding = ({ userId }: { userId: number }) => {
  const [rows, setRows] = useState([] as Consolidated[]);
  const [holdings, setHoldings] = useState([] as HoldingProps[]);

  const classes = useStyles();

  const fetchHoldings = useCallback(async () => {
    try {
      const holding = await apiHolding({ userId });

      setRows(holding.consolidated);
      setHoldings(holding.holdings);
    } catch (e) {
      toast.error("Ocorreu um erro ao buscar o resumo de dados.");
    }
  }, [userId]);

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  return (
    <Box m={5}>
      <Typography className={classes.margin} variant='h5'>
        Holding
      </Typography>
      <TableContainer component={Paper} className={classes.margin}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ano</TableCell>
              <TableCell>Receita líquida</TableCell>
              <TableCell>EBITDA</TableCell>
              <TableCell>Margem EBITDA</TableCell>
              <TableCell>Lucro líquido</TableCell>
              <TableCell>Margem líquida</TableCell>
              <TableCell>Dívida líquida</TableCell>
              <TableCell>Dívida líquida/EBITDA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <Row row={row} key={row.ano} holdings={holdings} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.graphics}>
        <MarginChart data={rows} />
        <DataChart data={rows} />
      </div>
    </Box>
  );
};

export default Holding;
