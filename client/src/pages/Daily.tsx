import { ResponsiveLine } from '@nivo/line';
import { FC, useMemo, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import ReactDatePicker from 'react-datepicker';

import PageHeader from '../components/PageHeader';
import { useGetSalesStatsQuery } from '../state/apis/sales';

import 'react-datepicker/dist/react-datepicker.css';

interface Line {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}

interface DailyProps {}

const Daily: FC<DailyProps> = ({}) => {
  const [startDate, setStartDate] = useState<Date>(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2021-02-01'));

  const { data } = useGetSalesStatsQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) {
      return [];
    }

    const { dailyData } = data;

    let totalSalesLine: Line = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [],
    };
    let totalUnitsLine: Line = {
      id: 'totalUnits',
      color: (theme.palette.secondary as any)[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf('-') + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader title='DAILY SALES' subTitle='Chart of daily sales' />

      <Box height='75vh'>
        <Box display='flex' justifyContent='flex-end'>
          <Box>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => !!date && setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => !!date && setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        {data ? (
          <ResponsiveLine
            data={formattedData || []}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: (theme.palette.secondary as any)[200],
                  },
                },
                legend: {
                  text: {
                    fill: (theme.palette.secondary as any)[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: (theme.palette.secondary as any)[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: (theme.palette.secondary as any)[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: (theme.palette.secondary as any)[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: 'color' }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            yFormat=' >-.2f'
            curve='catmullRom'
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Month',
              legendOffset: 60,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading... </>
        )}
      </Box>
    </Box>
  );
};

export default Daily;
