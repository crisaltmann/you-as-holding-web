import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Modal,
  Table,
  Paper,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  makeStyles,
  Typography,
  TableContainer,
} from "@material-ui/core";

import { Portfolio, all as apiAllPortfolio } from "../../api/portfolio";
import { formatCurrency } from "../../utils/formatCurrency";
import { OrderData, save as apiSaveOrder } from "../../api/orders";
import AddAsset from "../AddAsset";
import { toast } from "react-toastify";

type Row = {
  logo: string;
  codigo: string;
  quantidade: number;
  valor: number;
};

const formatRow = ({
  ativo: { codigo, logo },
  quantidade,
  valor,
}: Portfolio): Row => ({
  logo,
  quantidade,
  valor,
  codigo,
});

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
}));

const Wallet = ({ userId }: { userId: number }) => {
  const [rows, setRows] = useState([] as Row[]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  const fetchPortfolio = useCallback(async () => {
    try {
      const portfolio = await apiAllPortfolio(userId);
      const formattedRows = portfolio.map((p) => formatRow(p));
      setRows(formattedRows);
    } catch (e) {
      toast.error("Ocorreu um erro ao buscar o portfolio.");
    }
  }, [userId]);

  const handleSave = async (order: OrderData) => {
    try {
      await apiSaveOrder(order);
      setIsOpen(false);
      fetchPortfolio();
      toast.success("Ativo adicionado com sucesso.");
    } catch (e) {
      toast.error("Ocorreu um erro ao salvar o novo ativo.");
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return (
    <Box m={5}>
      <Typography className={classes.margin} variant='h5'>
        Sua carteira
      </Typography>
      <TableContainer component={Paper} className={classes.margin}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>Ativo</TableCell>
              <TableCell></TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.codigo}>
                <TableCell component='th' scope='row'>
                  <Avatar variant='square' src={row.logo} alt={row.codigo} />
                </TableCell>
                <TableCell>{row.codigo}</TableCell>
                <TableCell>{row.quantidade}</TableCell>
                <TableCell>{formatCurrency(row.valor)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        size='medium'
        variant='contained'
        color='primary'
        onClick={() => setIsOpen(!isOpen)}
      >
        Adicionar movimentação
      </Button>

      <Modal
        open={isOpen}
        className={classes.modal}
        onClose={() => setIsOpen(false)}
      >
        <body className={classes.modalContainer}>
          <AddAsset onSave={handleSave} />
        </body>
      </Modal>
    </Box>
  );
};

export default Wallet;
