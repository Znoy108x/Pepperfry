import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Shoes',
    orders : 10,
  },
  {
    subject: 'T-Shirts',
    orders: 4,
  },
  {
    subject: 'Shorts',
    orders: 6,
  },
  {
    subject: 'Accessories',
    orders: 9,
  },
  {
    subject: 'Pants',
    orders: 3,
  },
  {
    subject: 'Shirts',
    orders: 5,
  },
];

export default class OrdersGraphComp extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-radar-chart-rjoc6';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="orders" stroke="#6ebcb6" fill="#6ebcb6" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}