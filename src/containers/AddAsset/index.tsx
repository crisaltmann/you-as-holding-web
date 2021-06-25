import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Radio,
  Input,
  Select,
  Button,
  MenuItem,
  FormLabel,
  Typography,
  RadioGroup,
  FormControl,
  InputAdornment,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

import { Asset, all as apiAllAssets } from "../../api/assets";
import { OrderData } from "../../api/orders";
import { toast } from "react-toastify";

type AssetType = "C" | "V";

type Props = {
  onSave: (order: OrderData) => void;
};

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    paddingTop: 24,
  },
  formLabelPadding: {
    paddingBottom: 16,
  },
  buttonMargin: {
    marginTop: 24,
  },
}));

const AddAsset: React.FC<Props> = ({ onSave }) => {
  const [assets, setAssets] = useState<Asset[]>();
  const [asset, setAsset] = useState(0);
  const [assetType, setAssetType] = useState<AssetType>("C");
  const [date, setDate] = useState(new Date());
  const [quantity, setQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const classes = useStyles();

  const fetchAssets = useCallback(async () => {
    try {
      const assets = await apiAllAssets();
      setAssets(assets);
      if (assets.length > 0) {
        setAsset(assets[0].id);
      }
    } catch (e) {
      toast.error("Ocorreu um erro ao buscar os ativos.");
    }
  }, []);

  const save = () => {
    onSave({
      data: `${format(date, "yyyy-MM-dd")}T00:00:00Z`,
      id_ativo: asset,
      id_usuario: 1,
      quantidade: quantity,
      tipo: assetType,
      valor: totalValue,
    });
  };

  const toggleAssetType = () => {
    setAssetType(assetType === "C" ? "V" : "C");
  };

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return (
    <Box m={4} display='flex' flexDirection='column'>
      <Typography variant='h6'> Adicione ativo</Typography>
      <FormControl className={classes.formControl}>
        <FormLabel>Tipo de ativo</FormLabel>
        <RadioGroup
          row
          aria-label='tipo de ativo'
          name='assetType'
          value={assetType}
          onChange={toggleAssetType}
        >
          <FormControlLabel
            value='C'
            control={<Radio color='primary' />}
            label='Compra'
          />
          <FormControlLabel
            value='V'
            control={<Radio color='primary' />}
            label='Venda'
          />
        </RadioGroup>
      </FormControl>

      <FormControl className={classes.formControl}>
        <FormLabel>Ativo</FormLabel>
        <Select
          value={asset}
          onChange={(e) => setAsset(e.target.value as number)}
        >
          {assets?.map((asset) => (
            <MenuItem value={asset.id}>{asset.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabelPadding}>Data</FormLabel>
          <DatePicker
            disableToolbar
            variant='inline'
            value={date}
            format='dd/MM/yyyy'
            onChange={(date) => setDate(date as Date)}
          />
        </FormControl>
      </MuiPickersUtilsProvider>

      <FormControl className={classes.formControl}>
        <FormLabel>Quantidade</FormLabel>
        <Input
          value={quantity}
          type='number'
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <FormLabel>Valor total</FormLabel>
        <Input
          value={totalValue}
          type='number'
          onChange={(e) => setTotalValue(parseInt(e.target.value))}
          startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
        />
      </FormControl>
      <Button
        size='medium'
        className={classes.buttonMargin}
        variant='contained'
        color='primary'
        onClick={save}
      >
        Salvar
      </Button>
    </Box>
  );
};

export default AddAsset;
