import React, { ReactNode, useCallback, useEffect, useState } from "react";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Card, CardContent } from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Insight, summary as apiInsightsSummary } from "../../api/insights";
import { formatPercentage } from "../../utils/formatPercentage";
import { toast } from "react-toastify";

type TabPanelProps = {
  children: ReactNode;
  value: number;
  index: number;
};

const TabPanel = ({ children, value, index, ...props }: TabPanelProps) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...props}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
  card: {
    margin: "10px 5px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    marginBottom: 24,
  },
}));

const Insights = ({ userId }: { userId: number }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [insights, setInsights] = useState<Insight[]>([]);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  const fetchInsights = useCallback(async () => {
    try {
      const { insights } = await apiInsightsSummary(userId);
      const filteredInsights = insights.filter(
        (insight) =>
          !!insight.ativo_maior_divida.nome ||
          !!insight.ativo_maior_lucro.nome ||
          !!insight.ativo_maior_receita.nome ||
          !!insight.ativo_maior_ebitda.nome
      );
      setInsights(filteredInsights);
    } catch (e) {
      toast.error("Ocorreu um erro ao buscar os insights.");
    }
  }, [userId]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <Box m={5}>
      <Typography className={classes.margin} variant='h5'>
        Insights
      </Typography>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          {insights.map((insight) => (
            <Tab
              label={`${insight.trimestre.ano}/${insight.trimestre.trimestre}`}
            />
          ))}
        </Tabs>
      </AppBar>

      {insights.map((insight, index) => (
        <TabPanel value={value} index={index}>
          <div className={classes.cards}>
            {!!insight.ativo_maior_divida.nome && (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.bold}
                  >
                    {" "}
                    Ativo com maior aumento de dívida{" "}
                  </Typography>
                  {insight.ativo_maior_divida.nome}{" "}
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      maxValue={1}
                      value={insight.divida_delta}
                      text={formatPercentage(insight.divida_delta)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {!!insight.ativo_maior_lucro.nome && (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.bold}
                  >
                    {" "}
                    Ativo com maior aumento de lucro{" "}
                  </Typography>
                  {insight.ativo_maior_lucro.nome}{" "}
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      maxValue={1}
                      value={insight.lucro_maior_delta}
                      text={formatPercentage(insight.lucro_maior_delta)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {!!insight.ativo_maior_ebitda.nome && (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.bold}
                  >
                    {" "}
                    Ativo com maior aumento de EBITDA{" "}
                  </Typography>
                  {insight.ativo_maior_ebitda.nome}{" "}
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      maxValue={1}
                      value={insight.ebitda_maior_delta}
                      text={formatPercentage(insight.ebitda_maior_delta)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {!!insight.ativo_maior_receita.nome && (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.bold}
                  >
                    {" "}
                    Ativo com maior aumento de receita{" "}
                  </Typography>
                  {insight.ativo_maior_receita.nome}{" "}
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={insight.receita_maior_delta * 100}
                      text={formatPercentage(insight.receita_maior_delta)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabPanel>
      ))}
    </Box>
  );
};

export default Insights;
