import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Abhay Bisht',
    Products : 3,
    Categories: 14,
    Items: 4
  },
  {
    name: 'Aniket Kumar',
    Products : 12,
    Categories: 19,
    Items: 13
  },
  {
    name: 'Ankit Punder',
    Products : 14,
    Categories: 20,
    Items: 11
  },
  {
    name: 'Lakshay Karkarana',
    Products : 4,
    Categories: 3,
    Items: 12
  },
  {
    name: 'Ritesh Jha2',
    Products : 6,
    Categories: 15,
    Items: 13
  },
  {
    name: 'Rahul Kumar',
    Products : 9,
    Categories: 25,
    Items: 29
  },
  {
    name: 'Pradeep Kumar',
    Products : 11,
    Categories: 42,
    Items: 31
  },
];

export default class LineChartComp extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data} margin={{
            top: 1,
            right: 30,
            left: 8,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Products" stroke="#e85b45" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Categories" stroke="#8884d8" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Items" stroke="#82ca9d" activeDot={{ r: 6 }}/>
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
